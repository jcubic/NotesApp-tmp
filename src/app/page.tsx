import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image src="/logo.svg" alt="SNApp logo" fill/>
    </main>
  );
}
