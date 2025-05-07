'use client';

import { useStore } from '@/store';

export default function Note() {
  const { note } = useStore();
  return (
    <textarea value={note} />
  );
}
