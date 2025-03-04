import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import api from '@/services/api';
import AlbumPage from '@/app/artist/[id]/album/[albumId]/page';

jest.mock('@/services/api');

describe('AlbumPage', () => {
  const mockedApi = api as jest.Mocked<typeof api>;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display "Album not found." when albumData is null', async () => {
    mockedApi.get.mockImplementationOnce(() =>
      Promise.reject(new Error('Error fetching album'))
    );
    mockedApi.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { track: [] } })
    );

    const params = { id: 'artist1', albumId: '1' };

    const pageElement = await AlbumPage({ params });

    render(pageElement);

    await waitFor(() => {
      expect(screen.getByText('Album not found.')).toBeInTheDocument();
    });
  });

  it('should display the album information and tracks when data is successfully loaded', async () => {
    const albumData = {
      strAlbum: 'Test Album',
      strArtist: 'Test Artist',
      intYearReleased: '2020',
      strGenre: 'Rock',
      strStyle: 'Alternative',
      strLabel: 'Test Label',
      strReleaseFormat: 'CD',
      strAlbumThumb: 'http://example.com/album.jpg',
      strDescriptionEN: 'Album description',
      intScore: '4.5',
      intScoreVotes: '100',
      strMood: 'Happy',
      strSpeed: 'Medium',
    };

    const tracks = [
      {
        idTrack: '1',
        strTrack: 'Track 1',
        strDuration: '3:45',
      },
      {
        idTrack: '2',
        strTrack: 'Track 2',
        strDuration: '4:00',
      },
    ];

    mockedApi.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { album: [albumData] } })
    );

    mockedApi.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { track: tracks } })
    );

    const params = { id: 'artist1', albumId: '1' };

    const pageElement = await AlbumPage({ params });

    render(pageElement);

    await waitFor(() => {
      expect(screen.getByText('Test Album')).toBeInTheDocument();
      expect(screen.getByText('Test Artist')).toBeInTheDocument();
      expect(screen.getByText(/Year:/)).toBeInTheDocument();
      expect(screen.getByText(/Genre:/)).toBeInTheDocument();
      expect(screen.getByText(/Style:/)).toBeInTheDocument();
      expect(screen.getByText(/Record Label:/)).toBeInTheDocument();
      expect(screen.getByText(/Format:/)).toBeInTheDocument();
      expect(screen.getByText('Album description')).toBeInTheDocument();
      expect(screen.getByText('Track 1')).toBeInTheDocument();
      expect(screen.getByText('Track 2')).toBeInTheDocument();
    });
  });
});
