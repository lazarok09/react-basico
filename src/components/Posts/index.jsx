import { PostCard } from "../PostCard/index";
import "./styles.css";

export const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          photo={post.cover}
          body={post.body}
          id={post.id}
        />
      ))}
    </div>
  );
};
