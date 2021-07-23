export const PostCard = (props) => {
  const { ...post } = props;
  return (
    <div id="post-card" key={post.id}>
      <img src={post.photo} alt={post.title} />
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};
