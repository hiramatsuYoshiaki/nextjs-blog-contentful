import Layout from "../../components/layout";
import Head from "next/head";
import {
  getContentfulAllPostsIds,
  getContentfulAllPostsData,
} from "../../lib/contentful";
// サーバーサイドで実行,最初に実行される。事前ビルドするパスを配列でreturnする。
export async function getStaticPaths() {
  const paths = await getContentfulAllPostsIds();
  return {
    paths,
    //pathsは[{params:{id: 'ssg-ssr'},params: {id: 'pre-rendering'}}]のオブジェクトを持っている
    fallback: false,
    //指定パス以外なら４０４を返す
  };
}
// 事前レンダリング
export async function getStaticProps({ params }) {
  const allPostsData = await getContentfulAllPostsData(params.id);
  return {
    props: {
      allPostsData,
    },
  };
}
export default function CfPost({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Contentful Post </title>
      </Head>
      <article>
        <h1>Contentful Post Detaile</h1>
        <h3>{allPostsData.post.fields.title}</h3>
        <p>{allPostsData.post.sys.id}</p>
      </article>
    </Layout>
  );
}
