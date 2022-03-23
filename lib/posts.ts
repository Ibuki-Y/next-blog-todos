import fetch from "node-fetch";
import { POST } from "../types/types";

type POSTS = POST[];

export const getAllPostsData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post`);
  const posts = (await res.json()) as POSTS;
  // 日付けソート
  // const filteredPosts=posts.sort(
  //   (a, b)=>new Date(b.created_at)-new Date(a.created_at)
  // )
  return posts;
};

export const getAllPostIds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post`);
  const posts = (await res.json()) as POSTS;
  return posts.map((post: POST) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
};

export const getPostData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`);
  const post = (await res.json()) as POSTS;
  return post;
};
