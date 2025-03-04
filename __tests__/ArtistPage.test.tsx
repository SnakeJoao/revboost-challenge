import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import api from '@/services/api';
import '@testing-library/jest-dom';
import ArtistPage from '@/app/artist/[id]/page';

jest.mock('@/services/api', () => ({
  get: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '123' }),
}));

jest.mock('../components/AlbumCard', () => {
  return function DummyAlbumCard({ album }: { album: any }) {
    return <div data-testid="album-card">Album: {album.idAlbum}</div>;
  };
});

jest.mock('../components/Loading', () => {
  return function DummyLoading() {
    return <div data-testid="loading">Loading...</div>;
  };
});

const sampleAlbums = [
  { idAlbum: '1', strAlbum: 'Album One' },
  { idAlbum: '2', strAlbum: 'Album Two' },
];

describe('ArtistPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test('should display the loading state initially', () => {
    (api.get as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<ArtistPage />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('should render the discography after a successful request', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { album: sampleAlbums } });
    render(<ArtistPage />);

    await waitFor(() =>
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    );

    expect(screen.getByText('Discography')).toBeInTheDocument();

    const albumCards = screen.getAllByTestId('album-card');
    expect(albumCards).toHaveLength(sampleAlbums.length);
    expect(albumCards[0]).toHaveTextContent('Album: 1');
    expect(albumCards[1]).toHaveTextContent('Album: 2');
  });

  test('should gracefully handle a request error', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('API error'));
    render(<ArtistPage />);

    await waitFor(() =>
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    );

    expect(screen.getByText('Discography')).toBeInTheDocument();

    expect(screen.queryAllByTestId('album-card')).toHaveLength(0);
  });
});
