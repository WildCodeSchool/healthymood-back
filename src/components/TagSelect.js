import React from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
//import MultiSelect from "react-multi-select-component";

const animatedComponents = makeAnimated();

const NoOptionsMessage = props => {
    return (
        <div>{props.noMoreText ? props.noMoreText : "pas d'autre option"}</div>
    );
};

export default function TagSelect(props) {
    return (
        <Select
            {...props}
            isMulti
            closeMenuOnSelect={false}
            components={{ ...animatedComponents, NoOptionsMessage }}
            labelledBy={"Select"}
        />
    );
}