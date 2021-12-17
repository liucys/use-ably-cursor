import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.App}>
      <Head>
        <title>Cursor Chat</title>
        <meta name="description" content="Cursor Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.section}>
      </section>
    </div>
  );
}
