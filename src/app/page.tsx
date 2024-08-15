import Image from "next/image";
import styles from "./page.module.css";

import NotesPanel from '@/components/NotesPanel';

export default function Home() {
  return (
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image src="/logo.svg" alt="SNApp logo" fill/>
          </div>
          <span>SNApp</span>
        </header>
        <aside className={styles.notes}>
          <NotesPanel />
        </aside>
        <div className={styles.editor}>
          <textarea></textarea>
        </div>
        <aside className={styles.filter}>
        </aside>
        <footer className={styles.footer}>
          <p>Copyright (c) 2024 Jakub T. Jankiewicz</p>
        </footer>
      </main>
  );
}
