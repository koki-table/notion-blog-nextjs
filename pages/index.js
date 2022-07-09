import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <svg
              height="80"
              width="120"
              viewBox="0 0 372.67 95.36" xmlns="http://www.w3.org/2000/svg">
              <text display="none" opacity="0" visibility="hidden" font-family="Audiowide-Regular, Audiowide" font-size="84" transform="translate(0 71.41)">Lobbing</text>
            </svg>
          </div>
          <h1>Portfolio</h1>
          <p>
            NextjsでnotionAPIを取得し簡易的な自身のポートフォリオを作成しました。<br/>
            こちらのポートフォリオにて、実務案件と個人開発の成果物を紹介いたします。<br/>
            {/* 各ページにて制作の際に、工夫した点なども紹介させていただきますが、こちらに
            <a target="_blank" href="https://github.com/koki-table">
              Github
            </a>
            アカウントも記載させていただきます。 */}
          </p>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>

                <Link href={`/${post.id}`}>
                  <a> Read post →</a>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
