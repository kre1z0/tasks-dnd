import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import itemTypes from './item-types';
import styles from './column.scss';

const columnTarget = {
    drop(props, monitor, component) {
        const hasDroppedOnChild = monitor.didDrop();
        if (hasDroppedOnChild && !props.greedy) {
            return;
        }
        component.setState({
            hasDropped: true,
        });
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
    };
}

class Column extends Component {
    state = {
        hasDropped: false,
    };
    render() {
        const {
            children,
            connectDropTarget,
            isOverCurrent,
            isOver,
            greedy,
            dragItem,
            value,
        } = this.props;
        const { hasDropped } = this.state;
        const notCurrentCol = dragItem && !(dragItem.status === value);

        return connectDropTarget(
            <div
                style={{
                    backgroundColor:
                        (isOverCurrent && notCurrentCol) ||
                        (isOver && greedy && notCurrentCol)
                            ? 'red'
                            : '',
                }}
                className={styles.columnWrapper}
            >
                <div className={styles.column}>{children}</div>
            </div>,
        );
    }
}

export default DropTarget(itemTypes.item, columnTarget, collect)(Column);
