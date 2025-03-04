export interface ArtistPageProps {
  params: {
    id: string;
  };
}

export interface Album {
  idAlbum: string;
  strAlbum: string;
  strAlbumThumb: string;
  intYearReleased: string;
  strGenre: string;
  strDescriptionEN: string;
  idArtist: string;
}
