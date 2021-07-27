export const PostCard = (props) => {
  const { ...post } = props;
  return (
    <div className={"post-card"} key={post.id}>
      <img src={post.photo} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};
