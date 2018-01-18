import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './avatar.scss';

class Avatar extends Component {
    static propTypes = {
        className: PropTypes.string,
        src: PropTypes.string,
        alt: PropTypes.string,
        title: PropTypes.string,
    };

    render() {
        const { alt, src, className, title } = this.props;
        return (
            <img
                {...this.props}
                title={title}
                alt={alt}
                src={src}
                className={cn(styles.avatar, className)}
            />
        );
    }
}

export default Avatar;
