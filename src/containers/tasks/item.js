import React, { Component } from 'react';
import cn from 'classnames';
import { DragSource } from 'react-dnd';

import itemTypes from './item-types';
import Avatar from '../../components/avatar';

import styles from './item.scss';

const itemSource = {
    beginDrag(props, monitor, component) {
        const { onChangeTask } = props;
        onChangeTask && onChangeTask(props);
        return {};
    },
    endDrag(props, monitor, component) {
        const { onChangeTask } = props;
        onChangeTask && onChangeTask();
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
    render() {
        const {
            id,
            imgSrc,
            full_name,
            description,
            connectDragSource,
            dragItem,
        } = this.props;

        return connectDragSource(
            <div
                className={cn(styles.item, {
                    [styles.dragged]: dragItem && dragItem.id === id,
                })}
            >
                <Avatar src={imgSrc} />
                <div className={styles.content}>
                    <div className={styles.fullName}>{full_name}</div>
                    <div className={styles.description}>{description}</div>
                </div>
            </div>,
        );
    }
}

export default DragSource(itemTypes.item, itemSource, collect)(Item);
