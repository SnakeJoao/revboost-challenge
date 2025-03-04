'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';
import Loading from './Loading';
import type { Artist } from '@/types/components/search';

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setArtists([]);
    try {
      const response = await api.get<{ artists: Artist[] }>(
        `search.php?s=${searchTerm.toLowerCase()}`
      );
      setArtists(response.data.artists || []);
    } catch (error) {
      console.error('Error searching for artist:', error);
    } finally {
      setLoading(false);
      setSearchTerm('');
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-[584px] p-4">
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search artist..."
            className="border border-gray-300 text-gray-300 rounded-full p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-gray-300 rounded-full p-3 flex items-center justify-center hover:bg-blue-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.15-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
        {loading && <Loading />}
        {!loading && artists.length === 0 && (
          <p className="text-center text-gray-300 mt-4">No artists found.</p>
        )}
        <ul className="space-y-2">
          {artists.map((artist) => (
            <li
              key={artist.idArtist}
              onClick={() => router.push(`/artist/${artist.idArtist}`)}
              className="border rounded-full p-3 border-gray-300 text-gray-300 hover:bg-gray-100 hover:text-black hover:cursor-pointer"
            >
              {artist.strArtist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
