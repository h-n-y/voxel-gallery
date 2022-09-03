import PT from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import styles from './MasterDetailLayout.module.css';

/**
 * A container view for enforcing a traditional "master-detail" page layout.
 *
 * On mobile viewports, the detail view is displayed modally above the master view.
 */
function MasterDetailLayout({ master, detail, detailEmptyState, detailUrlPath }) {
  return (
    <div className={styles['master-detail-layout']}>
      <div className={styles['master-box']}>
        <Routes>
            <Route index element={master} /> 

            {/*
              Why render the `master` element on the child `detailUrlPath`?

              It's possible the `master` element will need access to the `detailUrlPath`
              to update its state correctly.

              (For example, the <Gallery> component
              needs access to the path parameter to identify which of its gallery
              items is currently selected.)

              Therefore, we're rendering master on both the 'index' path and
              the 'detailUrlPath` path.

              See the following discussion on optional route parameters:
              https://github.com/remix-run/react-router/issues/7285
            */}
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
  // Master section content
  master: PT.element.isRequired,

  // Detail section content
  detail: PT.element.isRequired,

  // Detail section empty state content.
  // Useful when no url is selected that would otherwise present
  // the detail view.
  detailEmptyState: PT.element.isRequired,

  // Url path required to expose the detail view.
  detailUrlPath: PT.string.isRequired,
};

export default MasterDetailLayout;
