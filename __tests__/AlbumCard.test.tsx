import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlbumCard from '@/components/AlbumCard';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AlbumCard Component', () => {
  const pushMock = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  const dummyAlbum = {
    idArtist: '1',
    idAlbum: '101',
    strAlbum: 'Test Album',
    intYearReleased: '2022',
    strGenre: 'Pop',
    strAlbumThumb: '/test-album.jpg',
    strDescriptionEN: 'Test album description',
  };

  it('renders album details correctly', () => {
    render(<AlbumCard album={dummyAlbum} />);
    
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText(/Year:/)).toBeInTheDocument();
    expect(screen.getByText(/2022/)).toBeInTheDocument();
    expect(screen.getByText(/Genre:/)).toBeInTheDocument();
    expect(screen.getByText(/Pop/)).toBeInTheDocument();
    
    const imgElement = screen.getByAltText('Test Album') as HTMLImageElement;
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toContain('/test-album.jpg');
  });

  it('navigates to album page on click', () => {
    render(<AlbumCard album={dummyAlbum} />);
    
    const cardElement = screen.getByText('Test Album').closest('div');
    if (cardElement) {
      fireEvent.click(cardElement);
    }
    
    expect(pushMock).toHaveBeenCalledWith('/artist/1/album/101');
  });
});
