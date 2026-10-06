'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCms } from '../../src/lib/store';

const AdminPanel = dynamic(
  () => import('../../src/components/admin/AdminPanel').then((mod) => mod.AdminPanel),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-500">Loading Veritas Admin Suite...</p>
        </div>
      </div>
    ),
  }
);

export default function AdminPage() {
  const router = useRouter();
  const { setViewMode } = useCms();

  useEffect(() => {
    setViewMode('admin');
  }, [setViewMode]);

  return (
    <AdminPanel 
      onBackToPublic={() => {
        setViewMode('public');
        router.push('/');
      }}
    />
  );
}
