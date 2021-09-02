import React from 'react'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import cityList from '../city-list';


const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 10,
  });

function Search() {

    return (
        <Autocomplete
            id="combo-box"
            options={cityList}
            getOptionLabel={(option) => option.label}
            onChange={(event, option) => {
                window.location.href = `/weather/${option.country}/${option.city}`
            }}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Enter your city" variant="outlined" />}
            filterOptions={filterOptions}
        />
    )
};

export default Search;