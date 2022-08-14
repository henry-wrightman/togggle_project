import React from 'react';
import Select from 'react-select';

const SelectDropdown = ({ className, options, placeholder, onChange }) => {
	return <Select 
		className={className}
		options={options} 
        placeholder={placeholder} 
        onChange={onChange} />
}

export { SelectDropdown };