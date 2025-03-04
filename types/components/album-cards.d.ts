export interface AlbumCardProps {
  album: {
    idAlbum: string;
    strAlbum: string;
    strAlbumThumb: string;
    intYearReleased: string;
    strGenre: string;
    strDescriptionEN: string;
    idArtist: string;
  };
}

export interface Track {
  idTrack: string;
  strTrack: string;
  strDuration: string;
}

export interface AlbumPageProps {
  params: {
    id: string;
    albumId: string;
  };
}