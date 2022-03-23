import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

import { Layout } from "../../components/Layout";
import { POST } from "../../types/types";
import { getAllPostIds, getPostData } from "../../lib/posts";

const PostDetail: NextPage<POST> = (props) => {
  const router = useRouter();
  const { id, title, created_at, content } = props;

  if (!props || router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={title}>
      <p className="m-4">
        {"ID : "}
        {id}
      </p>
      <p className="mb-4 text-xl font-bold">{title}</p>
      <p className="mb-12">{created_at}</p>
      <p className="px-10">{content}</p>

      <Link href="/BlogPage" passHref>
        <div className="flex cursor-pointer mt-12 hover:opacity-50">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            ></path>
          </svg>
          <span>Back to blog page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default PostDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPostData(ctx.params.id as string);
  return {
    props: {
      ...post,
    },
    revalidate: 3,
  };
};
