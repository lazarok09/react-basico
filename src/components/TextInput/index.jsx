import P from 'prop-types';
import './styles.css';

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <>
      <label id="label-search-container" htmlFor="search">
        <p>
          Search{' : '}
          {!!searchValue && <span>{searchValue}</span>}
        </p>
        <input id="search" type="search" onChange={handleChange} value={searchValue} placeholder="Type your search" />
      </label>
    </>
  );
};

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
