import Head from "next/head";
import CursorPosition from "../components/CursorPosition";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.App}>
      <Head>
        <title>Ably cursor</title>
        <meta name="description" content="Cursor Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Ably multiplayer cursor</h1>
      </div>
      <CursorPosition />
    </div>
  );
}
