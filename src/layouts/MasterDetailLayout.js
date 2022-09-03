import PT from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import styles from './MasterDetailLayout.module.css';

function MasterDetailLayout({ master, detail, detailEmptyState, detailUrlPath }) {
  return (
    <div className={styles['master-detail-layout']}>
      <div className={styles['master-box']}>
    {/* TODO: explain reason for routes here (i.e. optional parameters)
        - Refer to this github conversation:
          https://github.com/remix-run/react-router/issues/7285
      */}
        <Routes>
            <Route index element={master} /> 
            <Route path={detailUrlPath}element={master} />
        </Routes>
      </div> 

      <Routes>
        <Route path={detailUrlPath} element={
          <div className={styles['detail-box']}>
            {detail} 
          </div>
        } />
        <Route index element={detailEmptyState} />
      </Routes>
    </div>
  );
}

MasterDetailLayout.propTypes = {
  master: PT.element.isRequired,
  detail: PT.element.isRequired,
  detailEmptyState: PT.element.isRequired,
  detailUrlPath: PT.string.isRequired,
};

export default MasterDetailLayout;
