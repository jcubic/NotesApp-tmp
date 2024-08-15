'use client';
import { useState } from 'react';
import { IconFilePlus, IconFolderPlus } from '@tabler/icons-react';

import Tree from './Tree';
import ToolbarIcon from './ToolbarIcon';
import styles from './NotesPanel.module.css';

const data = [
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

export default function NotesPanel() {
  const [tree, setTree] = useState(data);
  return (
    <div>
      <nav className={styles.toolbar}>
        <ul>
          <li><ToolbarIcon icon={<IconFilePlus size={14}/>}/></li>
          <li><ToolbarIcon icon={<IconFolderPlus size={14}/>}/></li>
        </ul>
      </nav>
      <div className={styles.tree}>
        <Tree data={tree}/>
      </div>
    </div>
  );
};

