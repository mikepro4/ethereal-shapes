import React, { PropTypes } from "react";
import classnames from "classnames";
import AsyncSelect  from 'react-select/async';
import * as _ from 'lodash'

const ReactSelect = ({
	input,
	label,
	placeholder,
	large,
	type,
	minDate,
	loadOptions,
	meta: { touched, error }
}) => {
	let containerClassName = classnames({
		"input-group": true,
		"pt-large": large,
		"input-valid": touched && !error,
		"input-invalid": touched && error
	});

	let inputClassName = classnames({
		"pt-input": true,
		"pt-intent-success": touched && !error,
		"pt-intent-danger": touched && error
	});

	return (
		<div className={containerClassName}>
            {label ? <div className="form-label">{label}</div> : ""}
            <AsyncSelect
                {...input}
                onChange={data =>  {
                    input.onChange(data)
                }}
                onBlur= { event => event.preventDefault()}
                loadOptions={_.throttle(loadOptions, 500)}
                defaultOptions={true}
                placeholder={placeholder}
                simpleValue
                isClearable
                searchable
                className="react-select"
                classNamePrefix="react-select"
                formatOptionLabel={option => <div className="option-label"> {option.label}</div>}
            />

            {touched && error ? (
                <div className="input-error">
                    {touched && error && <span>{error}</span>}
                </div>
            ) : (
                ""
            )}
		</div>
	);
};

export default ReactSelect;
