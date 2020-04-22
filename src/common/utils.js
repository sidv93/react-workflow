import React from 'react';

export const withLoader = Component => {
    const loader = ({size}) => <i style={{fontSize: '36px'}} className="fa fa-spinner fa-spin" />;
    return props => <Component Loader={loader} {...props} />;
}

export default { withLoader };
