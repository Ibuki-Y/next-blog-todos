import { VFC } from "react";
import Link from "next/link";

type TAG = {
  id: number;
  name: string;
};
type POST = {
  post: {
    id: number;
    title: string;
    content: string;
    username: string;
    tags: TAG[];
    created_at: string;
  };
};

export const Post: VFC<POST> = (props) => {
  const { post } = props;

  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <Link href={`/posts/${post.id}`} passHref>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {post.title}
        </span>
      </Link>
    </div>
  );
};
