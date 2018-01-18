import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { DragSource } from 'react-dnd';

import itemTypes from './item-types';
import Avatar from '../../components/avatar';

import styles from './item.scss';

const itemSource = {
    beginDrag(props, monitor, component) {
        return props;
    },
};

function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging(),
    };
}

class Item extends Component {
    static propTypes = {
        imgSrc: PropTypes.string,
        full_name: PropTypes.string,
        description: PropTypes.string,
        connectDragSource: PropTypes.func,
        alt: PropTypes.string,
        isDragging: PropTypes.bool,
    };

    shouldComponentUpdate(nextProps, nextState) {
        const { isDragging } = this.props;
        return isDragging !== nextProps.isDragging;
    }

    render() {
        const {
            imgSrc,
            full_name,
            description,
            connectDragSource,
            alt,
            isDragging,
        } = this.props;

        return connectDragSource(
            <div
                className={cn(styles.item, {
                    [styles.dragged]: isDragging,
                })}
            >
                <Avatar
                    title={alt}
                    className={styles.avatar}
                    alt={alt}
                    src={imgSrc}
                />
                <div className={styles.content}>
                    <div className={styles.fullName}>{full_name}</div>
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    />
                </div>
            </div>,
        );
    }
}

export default DragSource(itemTypes.item, itemSource, collect)(Item);
