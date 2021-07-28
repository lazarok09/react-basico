import './button-style.css';

import P from 'prop-types';

export const Button = ({ text, onClick, disabled = false }) => {
  return (
    <div id="button-container">
      <button disabled={disabled} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  disabled: false,
};
Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool.isRequired,
};
