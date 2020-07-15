import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const {days, day, setDay} = props
  const dayListItem = days.map(({id, name, spots}) => {
    return (
      <DayListItem
        key={id}
        name={name}
        spots={spots}
        selected={name === day}
        setDay={setDay}
      />
    );
  });
  return <ul>{dayListItem}</ul>;
};

export default DayList;
