import React from 'react';
import Dashboard from 'components/Dashboard';

export const RequesterLayout = ({ children }) => (
  <Dashboard>
    {children}
  </Dashboard>
);

RequesterLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default RequesterLayout;
