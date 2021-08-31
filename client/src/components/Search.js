import React from 'react'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import cityList from '../city-list';


const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 10,
  });

function Search() {
    const history = useHistory();
    
    return (
        <Autocomplete
            id="combo-box"
            options={cityList}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) => { if(option.id === value.id) { history.push(`/weather/${option.country}/${option.city}`) }} }
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Enter your city" variant="outlined" />}
            filterOptions={filterOptions}
        />
    )
};

export default Search;