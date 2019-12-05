// Import packages
import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
    render() {
        const { props } = this;
        const {
            type,
            isSmall,
            isBlock,
            isActive,
            children,
            onClick,
            className
        } = props || {};

        return (
            <button
                className={
                    `wmnds-btn wmnds-btn--secondary wmnds-btn__${type}
                    ${className} ${isSmall ? `wmnds-btn-small` : ''}
                    ${isActive ? 'wmnds-is-active' : ''}
                    ${isBlock ? 'wmnds-is-block' : ''}`
                }
                tabIndex="0"
                onClick={(e) => onClick(e)}
            >
                <div>{children}</div>
            </button>
        )
    }
}

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
    type: PropTypes.string,
    isSmall: PropTypes.bool,
    isBlock: PropTypes.bool,
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
    className: PropTypes.string,
}

Button.defaultProps = {
    children: '',
    type: 'primary',
    isSmall: false,
    isBlock: false,
    onClick: () => {},
    isActive: false,
    className: '',
};

export default Button;