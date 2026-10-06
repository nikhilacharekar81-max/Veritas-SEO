'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HeroSection } from '../../src/components/public/HeroSection';
import { useCms } from '../../src/lib/store';

export const AppClientHome: React.FC = () => {
  const router = useRouter();
  const { setViewMode } = useCms();
  return (
    <HeroSection 
      onOpenAdmin={() => {
        setViewMode('admin');
        router.push('/admin');
      }}
    />
  );
};
