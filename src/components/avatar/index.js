import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './avatar.scss';

class Avatar extends Component {
    static propTypes = {
        className: PropTypes.string,
        src: PropTypes.string,
        alt: PropTypes.string,
    };

    render() {
        const { alt, src, className } = this.props;
        return (
            <img
                {...this.props}
                alt={alt}
                src={src}
                className={cn(styles.avatar, className)}
            />
        );
    }
}

export default Avatar;
