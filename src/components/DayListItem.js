import React from 'react';
import classNames from 'classnames';
import "components/DayListItem.scss";

const DayListItem = props => {
    const {name, spots, setDay, selected} = props;
    const dayClass = classNames('day-list__item', {
        'day-list__item--selected': selected,
        'day-list__item--full': !spots
    });


    return (
        <li data-testid='day' className={dayClass} onClick={() => setDay(name)}>
            <h2 className='text--regular'>{name}</h2>
            <h3 className='text--light'>{formatSpots(spots)}</h3>
        </li>
    )
}

const formatSpots = (spots) => {
    const message = spots > 1 ?  `${spots} spots remaining` : spots === 0 ? 'no spots remaining' : `${spots} spot remaining`;
    return message;
}

export default DayListItem;