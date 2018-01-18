import React, { Component } from 'react';
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
    render() {
        const {
            id,
            imgSrc,
            full_name,
            description,
            connectDragSource,
            dragItem,
        } = this.props;
        console.log('--> Item UP');
        return connectDragSource(
            <div
                className={cn(styles.item, {
                    [styles.dragged]: dragItem && dragItem.id === id,
                })}
            >
                <Avatar src={imgSrc} />
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
