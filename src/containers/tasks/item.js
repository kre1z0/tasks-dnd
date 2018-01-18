import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { DragSource } from 'react-dnd';

import itemTypes from './item-types';
import Avatar from '../../components/avatar';

import styles from './item.scss';

const itemSource = {
    beginDrag(props, monitor, component) {
        const { onBeginDrag } = props;
        onBeginDrag && onBeginDrag(props);
        return {};
    },
    endDrag(props, monitor, component) {
        const { onBeginDrag } = props;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            onBeginDrag && onBeginDrag();
        }
        return {};
    },
};

function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging(),
        didDrop: monitor.didDrop(),
    };
}

class Item extends Component {
    static propTypes = {
        id: PropTypes.number,
        imgSrc: PropTypes.string,
        full_name: PropTypes.string,
        description: PropTypes.string,
        connectDragSource: PropTypes.func,
        dragItem: PropTypes.object,
        alt: PropTypes.string,
    };

    render() {
        const {
            id,
            imgSrc,
            full_name,
            description,
            connectDragSource,
            dragItem,
            alt,
        } = this.props;
        return connectDragSource(
            <div
                className={cn(styles.item, {
                    [styles.dragged]: dragItem && dragItem.id === id,
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
