import React from 'react';
import api from '@/services/api';
import type { AlbumPageProps, Track } from '@/types/components/album-cards';

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = await Promise.resolve(params);

  let albumData = null;
  let tracks: Track[] = [];

  try {
    const albumResponse = await api.get(`album.php?m=${albumId}`);
    albumData = albumResponse.data.album?.[0] || null;
  } catch (error) {
    console.error('Error fetching album information:', error);
    albumData = null;
  }

  try {
    const trackResponse = await api.get(`track.php?m=${albumId}`);
    tracks = trackResponse.data.track || [];
  } catch (error) {
    console.error('Error fetching album tracks:', error);
    tracks = [];
  }

  if (!albumData) {
    return <div className="min-h-screen text-white p-6">Album not found.</div>;
  }

  const {
    strAlbum,
    strArtist,
    intYearReleased,
    strGenre,
    strStyle,
    strLabel,
    strReleaseFormat,
    strAlbumThumb,
    strDescriptionEN,
    intScore,
    intScoreVotes,
    strMood,
    strSpeed,
  } = albumData;

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{strAlbum}</h1>
            <p className="text-xl text-gray-400">{strArtist}</p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-400">
                <strong>Year:</strong> {intYearReleased}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Genre:</strong> {strGenre}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Style:</strong> {strStyle}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Record Label:</strong> {strLabel}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Format:</strong> {strReleaseFormat}
              </p>
            </div>
          </div>
          <img
            src={strAlbumThumb || '/default-album.jpg'}
            alt={strAlbum}
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>

        {strDescriptionEN && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-400 leading-relaxed">{strDescriptionEN}</p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Rating</h2>
          <div className="space-y-2">
            <p className="text-gray-400">
              <strong>Score:</strong> {intScore} ({intScoreVotes} votes)
            </p>
            <p className="text-gray-400">
              <strong>Mood:</strong> {strMood}
            </p>
            <p className="text-gray-400">
              <strong>Speed:</strong> {strSpeed}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Tracks</h2>
          <ul className="space-y-2">
            {tracks.map((track: Track) => (
              <li
                key={track.idTrack}
                className="group bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">{track.strTrack}</p>
                    <p className="text-sm text-gray-400">{track.strDuration}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
