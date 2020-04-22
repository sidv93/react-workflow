import React from 'react';

export const withLoader = Component => {
    const sizes = {
        small: '24px',
        medium: '48px',
        large: '72px'
    };
    const loader = ({size}) => <i style={{fontSize: sizes[size]}} className="fa fa-spinner fa-spin" />;
    return props => <Component Loader={loader} {...props} />;
}

export default { withLoader };
