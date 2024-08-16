'use client';
import { useState } from 'react';
import { IconFilePlus, IconFolderPlus } from '@tabler/icons-react';
import { produce, original, Draft } from 'immer';

import Tree, { Node, TreeData } from './Tree';
import ToolbarIcon from './ToolbarIcon';
import styles from './NotesPanel.module.css';

const data: TreeData = [
  {
    value: 'Programming',
    label: 'Programming',
    children: [
      { value: 'Programming/JavaScript', label: 'JavaScript' },
      { value: 'Programming/TypeScript', label: 'TypeScript' },
      { value: 'Programming/Next.js', label: 'Next.js' },
      { value: 'Programming/React.js', label: 'React.js' }
    ]
  }
];

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function newNode(nodes: TreeData, parent: Node, label: string): boolean {
  for (const tree of nodes) {
    if (original(tree) === parent) {
      if (!tree.children) {
        throw new Error(`${parent.value} is wrong category`);
      }
      let value = `${parent.value}/${label}`;
      const re = new RegExp(`^${escapeRegExp(value)}(?:<[0-9]+>)?$`);
      const duplicates = tree.children.filter(node => {
        return !!node.value.match(re);
      });
      if (duplicates.length > 0) {
        const uniq = `<${duplicates.length}>`;
        value += uniq;
        label += uniq;
      }
      const node = {
        value,
        label
      };
      tree.children.push(node);
      return true;
    }
    if (tree.value.startsWith(parent.value) && tree.children) {
      if (newNode(tree.children, parent, label)) {
        return true;
      }
    }
  }
  return false;
}

export default function NotesPanel() {
  const [tree, setTree] = useState<TreeData>(data);

  function newNote(parent: Node) {
    setTree(produce((draft: Draft<TreeData>) => {
       newNode(draft, parent, 'new note');
    }));
  }

  return (
    <div>
      <nav className={styles.toolbar}>
        <ul>
          <li><ToolbarIcon icon={<IconFilePlus size={14}/>}/></li>
          <li><ToolbarIcon icon={<IconFolderPlus size={14}/>}/></li>
        </ul>
      </nav>
      <div className={styles.tree}>
        <Tree data={tree} onNewNote={newNote}/>
      </div>
    </div>
  );
};
