import { ButtonStyle } from './Button.style';
import PropTypes from 'prop-types';

export const Button = ({ isLoading, loadMore }) => {
  const onButtonClick = () => {
    loadMore();
  };
  return (
    <ButtonStyle disabled={isLoading} onClick={onButtonClick}>
      {isLoading ? 'Loading...' : 'Load more'}
    </ButtonStyle>
  );
};

Button.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
};
