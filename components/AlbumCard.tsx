'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { AlbumCardProps } from '@/types/components/album-cards';

export default function AlbumCard({ album }: AlbumCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/artist/${album.idArtist}/album/${album.idAlbum}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      data-testid="album-card"
      onClick={handleClick}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      <div className="flex justify-center items-center">
        {album.strAlbumThumb && (
          <Image
            src={album.strAlbumThumb}
            alt={album.strAlbum}
            width={400} 
            height={256}
            className="object-cover rounded-lg"
          />
        )}
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold">{album.strAlbum}</h3>
          <p className="text-sm text-gray-600">
            <strong>Year:</strong> {album.intYearReleased}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Genre:</strong> {album.strGenre}
          </p>
        </div>
      </div>
    </div>
  );
}
