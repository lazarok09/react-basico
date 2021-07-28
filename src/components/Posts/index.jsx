import P from 'prop-types';
import { PostCard } from '../PostCard/index';
import './styles.css';

export const Posts = ({ posts = [] }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} title={post.title} cover={post.cover} body={post.body} id={post.id} />
      ))}
    </div>
  );
};
Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.arrayOf(
    P.shape({
      title: P.string.isRequired,
      cover: P.string.isRequired,
      body: P.string.isRequired,
      id: P.number.isRequired,
    }),
  ),
};
