import React from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

const animatedComponents = makeAnimated();

const NoOptionsMessage = props => {
  return (
    <div>{props.noMoreText ? props.noMoreText : "pas d'autre option"}</div>
  );
};

export default function SingleSelect(props) {
  return (
    <Select
      {...props}
      closeMenuOnSelect={true}
      components={{ ...animatedComponents, NoOptionsMessage }}
      labelledBy='Select'
    />
  );
}
