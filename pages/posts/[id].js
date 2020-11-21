import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

// 最初に実行される。事前ビルドするパスを配列でreturnする。
//サーバーサイドで実行
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    //pathsは[{params:{id: 'ssg-ssr'},params: {id: 'pre-rendering'}}]のオブジェクトを持っている
    fallback: false,
    //指定パス以外なら４０４を返す
  };
}
// ビルド時に実行される
// ルーティングの情報が入ったparamsを受け取る
//サーバーサイドで実行
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
    //必ずキーpropsが必要
  };
}
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      {/* <br />
      {postData.title}
      <br />
      {postData.id}
      <br />
      {/* {postData.date} */}
      {/* <Date dateString={postData.date} /> */}
      {/* <br /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />  */}
    </Layout>
  );
}
