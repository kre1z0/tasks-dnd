import React, { Component } from 'react';
import sortBy from 'lodash/sortBy';

import Column from './column';
import { coolGreyTwo, macaroniAndCheese, softGreen } from '../../assets/theme';
import DateBlock from './date-block';
import Item from './item';
import testData from '../../assets/test-data/tasks';

import styles from './tasks.scss';

const Title = ({ color, title }) => (
    <div
        className={styles.title}
        style={{
            color: color,
        }}
    >
        {title}
    </div>
);

const STATUS = [
    { title: 'Назначенные', color: coolGreyTwo, value: 1 },
    { title: 'В работе', color: macaroniAndCheese, value: 2 },
    { title: 'Выполненные', color: softGreen, value: 3 },
];

class Tasks extends Component {
    state = {
        scrollWidth: 0,
        scrollLeft: 0,
        data: testData,
    };

    componentDidMount() {
        if (this.container.clientWidth !== this.container.offsetWidth) {
            this.setState({
                scrollWidth:
                    this.container.offsetWidth - this.container.clientWidth,
            });
        }
    }

    onBodyScroll = ({ target }) => {
        const scrollLeft = target.scrollLeft;
        if (scrollLeft !== this.state.scrollLeft) {
            this.setState(state => ({
                scrollLeft,
            }));
        }
    };

    onEndDrag = (value, id) => {
        const { data } = this.state;
        const copyData = data.slice();
        const changeTaskStatus = copyData.map(task => {
            if (task.id === id) {
                task.status = value;
            }
            return task;
        });
        this.setState({
            data: changeTaskStatus,
        });
    };

    render() {
        const { scrollWidth, scrollLeft, data } = this.state;

        return (
            <div className={styles.container}>
                <div
                    style={{
                        marginRight: scrollWidth,
                        transform: `translateX(-${scrollLeft}px)`,
                    }}
                    className={styles.header}
                >
                    {STATUS.map(({ title, color, value }) => (
                        <Title color={color} title={title} key={value} />
                    ))}
                </div>
                <div
                    className={styles.bodyScroll}
                    onScroll={this.onBodyScroll}
                    ref={elem => {
                        this.container = elem;
                    }}
                >
                    <div className={styles.main}>
                        {STATUS.map(({ value }) => {
                            const dateGroup = [];
                            data
                                .filter(item => item.status === value)
                                .forEach(item => {
                                    if (dateGroup.hasOwnProperty(item.date)) {
                                        dateGroup[item.date].push(item);
                                    } else {
                                        dateGroup[item.date] = [item];
                                    }
                                });
                            const dates = sortBy(
                                Object.keys(dateGroup),
                            ).reverse();
                            return (
                                <Column
                                    value={value}
                                    key={value + '-block'}
                                    onEndDrag={this.onEndDrag}
                                >
                                    {dates.map((date, i) => {
                                        const tasks = dateGroup[date];
                                        return (
                                            <DateBlock
                                                key={`${date}-${i}`}
                                                date={date}
                                            >
                                                {tasks.map((item, i) => (
                                                    <Item
                                                        value={value}
                                                        key={`${item.id}-${i}`}
                                                        {...item}
                                                    />
                                                ))}
                                            </DateBlock>
                                        );
                                    })}
                                </Column>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tasks;
