import P from 'prop-types';

export const PostCard = ({ title, cover, body, id }) => {
  return (
    <div className={'post-card'} key={id}>
      <img src={cover} alt={title} />
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
};
PostCard.defaultProps = {
  posts: [],
};
PostCard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.number.isRequired,
};
