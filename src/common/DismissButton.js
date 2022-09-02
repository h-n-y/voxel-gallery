import PT from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './DismissButton.module.css';

function DismissButton({ path }) {
  return (
    <Link to={path} className={styles['dismiss-button']}>
      <div className={styles['dismiss-icon']}></div> 
    </Link>

  );
}

DismissButton.defaultProps = {
  path: '/',
};

DismissButton.propTypes = {
  path: PT.string.isRequired,
};

export default DismissButton;
