import React, { useState } from 'react'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import cityList from '../city-list';
import { useHistory } from 'react-router-dom';


const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 10,
});

function Search() {
    const history = useHistory();

    const [clearInput, setClearInput] = useState(false);

    return (
        <Autocomplete
            key={clearInput}
            id="combo-box"
            options={cityList}
            getOptionLabel={(option) => option.label}
            onChange={(event, option) => {
                if (option !== null) {
                    history.push(`/weather/${option.country}/${option.city}`)
                    setClearInput(!clearInput);
                }
            }}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Enter your city" variant="outlined" />}
            filterOptions={filterOptions}
        />
    )
};

export default Search;