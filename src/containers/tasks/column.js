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
const bgColorSwitcher = value => {
    switch (value) {
        case 1:
            return 'rgba(157, 163, 170, .1)';
        case 2:
            return 'rgba(247, 193, 52, .4)';
        case 3:
            return 'rgba(100, 199, 108, .4)';
        default:
            return 'rgba(157, 163, 170, .1)';
    }
};

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
                            ? bgColorSwitcher(value)
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
