import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import itemTypes from './item-types';
import styles from './column.scss';

const columnTarget = {
    hover(props, monitor, component) {
        // You can disallow drop based on props or item
        const item = monitor.getItem();
        if (props.value !== item.status) {
            component.setState({
                hovered: true,
            });
        }
    },
    drop(props, monitor, component) {
        const { onEndDrag, value } = props;
        const item = monitor.getItem();
        if (props.value !== item.status) {
            onEndDrag && onEndDrag(value, item.id);
        }
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
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
    static propTypes = {
        children: PropTypes.array,
        connectDropTarget: PropTypes.func,
        value: PropTypes.number,
        isOver: PropTypes.bool,
    };

    state = {
        hovered: false,
    };

    render() {
        const { children, connectDropTarget, isOver, value } = this.props;
        const { hovered } = this.state;

        return connectDropTarget(
            <div
                style={{
                    backgroundColor:
                        hovered && isOver ? bgColorSwitcher(value) : '',
                }}
                className={styles.columnWrapper}
            >
                <div className={styles.column}>{children}</div>
            </div>,
        );
    }
}

export default DropTarget(itemTypes.item, columnTarget, collect)(Column);
