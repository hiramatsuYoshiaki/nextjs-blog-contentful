import Layout from "../../components/layout";
import Head from "next/head";
import { getContentfulAll } from "../../lib/contentful";
import Link from "next/link";

// 事前レンダリング
export async function getStaticProps() {
  const allPostsData = await getContentfulAll();
  //   console.log("contentful/posts");
  //   console.log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Posts({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Contentful Posts</title>
      </Head>
      <article>
        <h1>Contentful Posts List</h1>
        {allPostsData.map((item) => (
          <div key={item.sys.id}>
            <Link href={`/contentful/${item.sys.id}`}>
              <a>
                <h3>{item.fields.title}</h3>
              </a>
            </Link>

            <p>{item.sys.id}</p>
            <p>{item.fields.publishData}</p>
            <p>{item.fields.stage}</p>
          </div>
        ))}
      </article>
    </Layout>
  );
}
