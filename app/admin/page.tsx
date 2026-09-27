'use client';

import React from 'react';
import { AdminPanel } from '../../src/components/admin/AdminPanel';

export default function AdminPage() {
  return (
    <AdminPanel
      onBackToPublic={() => {
        if (typeof window !== 'undefined') window.location.href = '/';
      }}
    />
  );
}
