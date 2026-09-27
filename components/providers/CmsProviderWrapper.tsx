'use client';

import React from 'react';
import { CmsProvider } from '../../src/lib/store';

export function CmsProviderWrapper({ children }: { children: React.ReactNode }) {
  return <CmsProvider>{children}</CmsProvider>;
}
