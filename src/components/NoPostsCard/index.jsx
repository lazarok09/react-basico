import "./styles.css";

export const NoPostsCard = (prop) => {
  const { ...props } = prop;
  return (
    <div id="card-container">
      <p>Opa, parece que não encontramos um post com este título :(</p>
    </div>
  );
};
