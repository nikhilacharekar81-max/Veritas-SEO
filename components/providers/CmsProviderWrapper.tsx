'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CmsProvider, useCms } from '../../src/lib/store';
import { Edit3, Sparkles, X, Eye, EyeOff } from 'lucide-react';

const ContentManager = dynamic(
  () => import('../../src/components/admin/ContentManager').then((mod) => mod.ContentManager),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 text-center text-slate-500 font-mono text-xs">
        Loading Content Manager...
      </div>
    ),
  }
);

const FrontendEditorFloatingBar: React.FC = () => {
  const { isFrontendEditMode, setIsFrontendEditMode } = useCms();
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  return (
    <>
      {/* Floating Bottom-Right Content Studio Bar */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-slate-900/95 backdrop-blur-md text-white p-2 rounded-2xl border border-slate-700 shadow-2xl">
        <button
          type="button"
          onClick={() => setIsFrontendEditMode(!isFrontendEditMode)}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            isFrontendEditMode
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Show or hide inline Edit buttons on all page content"
        >
          {isFrontendEditMode ? (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Edit Buttons: ON</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Edit Buttons: OFF</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsContentModalOpen(true)}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-emerald-50 flex items-center gap-1.5 transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Content Manager</span>
        </button>
      </div>

      {/* Full Content Manager Modal Overlay (Lazy Loaded) */}
      {isContentModalOpen && (
        <div
          onClick={() => setIsContentModalOpen(false)}
          className="fixed inset-0 z-[9990] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8FAFC] rounded-3xl border border-slate-200 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm">
                  Live Front-End Content Manager Studio
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsContentModalOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Close Studio
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <ContentManager
                onLaunchFrontendEditor={() => {
                  setIsFrontendEditMode(true);
                  setIsContentModalOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export function CmsProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CmsProvider>
      {children}
      <FrontendEditorFloatingBar />
    </CmsProvider>
  );
}
