import React from 'react';
import moment from 'moment';

import styles from './date-block.scss';

const DateBlock = ({ date, children }) => (
    <div>
        <div className={styles.date}>{moment(date).format('L')}</div>
        {children}
    </div>
);

export default DateBlock;
