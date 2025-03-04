import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '@/components/Search';
import api from '@/services/api';
import { useRouter } from 'next/navigation';

jest.mock('@/services/api');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockedApi = api as jest.Mocked<typeof api>;
const mockedUseRouter = useRouter as jest.Mock;

describe('Search Component', () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    mockedUseRouter.mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search form with input and button', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('Search artist...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not call API when search term is empty', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search artist...');
    const form = input.closest('form');
    expect(form).toBeTruthy();

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockedApi.get).not.toHaveBeenCalled();
    });
  });

  it('calls API and displays artists on successful search', async () => {
    const artistsData = [
      { idArtist: '1', strArtist: 'Artist 1' },
      { idArtist: '2', strArtist: 'Artist 2' },
    ];
    mockedApi.get.mockResolvedValueOnce({ data: { artists: artistsData } });

    render(<Search />);
    const input = screen.getByPlaceholderText('Search artist...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(button);

    await waitFor(() => {
      artistsData.forEach((artist) => {
        expect(screen.getByText(artist.strArtist)).toBeInTheDocument();
      });
    });
  });

  it('displays "No artists found." if API returns empty array', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: { artists: [] } });

    render(<Search />);
    const input = screen.getByPlaceholderText('Search artist...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('No artists found.')).toBeInTheDocument();
    });
  });

  it('redirects to artist page when clicking on an artist list item', async () => {
    const artistsData = [{ idArtist: '1', strArtist: 'Artist 1' }];
    mockedApi.get.mockResolvedValueOnce({ data: { artists: artistsData } });

    render(<Search />);
    const input = screen.getByPlaceholderText('Search artist...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Artist 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Artist 1'));

    expect(pushMock).toHaveBeenCalledWith('/artist/1');
  });
});
