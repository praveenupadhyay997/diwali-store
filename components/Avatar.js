'use client';

import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { useEffect, useState } from 'react';

export default function Avatar({ name, size = 40, className = '' }) {
  const [avatarSvg, setAvatarSvg] = useState('');

  useEffect(() => {
    const generateAvatar = async () => {
      try {
        // Create a new avatar with the person's initials
        const avatar = createAvatar(initials, {
          seed: name || 'User', // Use the provided name or fallback to 'User'
          radius: 50, // Makes the avatar circular
          size: size,
          // Customize colors if needed
          // background: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'],
          // textColor: '000000',
        });

        const svg = await avatar.toDataUri();
        setAvatarSvg(svg);
      } catch (error) {
        console.error('Error generating avatar:', error);
      }
    };

    generateAvatar();
  }, [name, size]);

  return (
    <div 
      className={`inline-block rounded-full overflow-hidden bg-gray-200 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {avatarSvg && (
        <img 
          src={avatarSvg} 
          alt={name || 'User'} 
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
