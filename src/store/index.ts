import { create } from 'zustand';
import { TreeNodeData } from '@mantine/core';

import type { RenderTreeNodePayload } from '@mantine/core';

export type Node = RenderTreeNodePayload['node'];
export type TreeData = TreeNodeData[];

export type State = {
  tree: TreeData;
  note: string;
  error: Error | null;
  loading: boolean;
  updateNote: (note: string) => void;
  saveNote: (node: Node, note: string) => void;
  loadNote: (node: Node) => void;
};

export const useStore = create<State>(set => {
  return {
    tree: [],
    note: '',
    error: null,
    loading: false,
    updateNote: (note) => {
      set({ note });
    },
    saveNote: (node: Node, note: string) => {
      // TODO
    },
    loadNote: async (node) => {
      set({ loading: true, error: null });
      try {
        const params = new URLSearchParams({ name: node.value })
        const res = await fetch(`/api/note?${params}`);
        if (!res.ok) {
          throw new Error('Network error');
        }
        const { note } = await res.json();
        set({ note, loading: false });
      } catch (err) {
        set({ error: err as Error, loading: false });
      }
    }
  };
});
