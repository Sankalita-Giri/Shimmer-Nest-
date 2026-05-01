import React from 'react';

export default function SkeletonCard({ dark }) {
  return (
    <div className={`p-4 rounded-[3rem] shadow-xl border-4 animate-pulse ${dark ? 'bg-gray-900 border-purple-900/40' : 'bg-white border-white'}`}>
      <div className={`relative aspect-square rounded-[2.2rem] mb-6 ${dark ? 'bg-gray-800' : 'bg-gray-100'}`} />
      <div className="text-center px-4">
        <div className={`h-4 w-3/4 mx-auto rounded-full mb-3 ${dark ? 'bg-gray-800' : 'bg-gray-200'}`} />
        <div className={`h-3 w-1/2 mx-auto rounded-full mb-4 ${dark ? 'bg-gray-800' : 'bg-gray-100'}`} />
        <div className={`h-8 w-full rounded-2xl ${dark ? 'bg-gray-800' : 'bg-gray-50'}`} />
      </div>
    </div>
  );
}
