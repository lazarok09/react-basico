import "./styles.css";

export const TextInput = ({ searchValue, handleInput }) => {
  return (
    <>
      <label for="search">
        <input
          id="search"
          type="search"
          onChange={handleInput}
          value={searchValue}
          placeholder="Type your search"
        />
      </label>
    </>
  );
};
