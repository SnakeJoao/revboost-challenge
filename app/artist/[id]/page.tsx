'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AlbumCard from '../../../components/AlbumCard';
import Loading from '../../../components/Loading';
import api from '@/services/api';
import type { Album } from '@/types/pages/artist';

export default function ArtistPage() {
  const { id } = useParams();
  const [discography, setDiscography] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscography() {
      try {
        const response = await api.get(`album.php?i=${id}`);
        setDiscography(response.data.album || []);
      } catch (error) {
        console.error('Error fetching discography:', error);
        setDiscography([]);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchDiscography();
    }
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Discography
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {discography.map((album: Album) => (
          <AlbumCard key={album.idAlbum} album={album} />
        ))}
      </div>
    </div>
  );
}
