import "./styles.css";

export const TextInput = ({ searchValue, handleInput }) => {
  return (
    <>
      <label id="label-search-container" for="search">
        <p>
          Search{" : "}
          {!!searchValue && <span>{searchValue}</span>}
        </p>
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
