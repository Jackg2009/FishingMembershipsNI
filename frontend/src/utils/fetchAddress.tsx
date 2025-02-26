import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";

export const fetchAddresses = async (query: string) => {
    if (!query) return [];

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`
        );
        const data = await response.json();

        return data.map((item: any) => ({
            label: item.display_name, // Full formatted address
            value: item,
        }));
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return [];
    }
};

const AddressAutocomplete = ({ onSelect }: { onSelect: (address: any) => void }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<{ label: string; value: any }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (inputValue.length < 3) {
            setOptions([]); // Only search if input is at least 3 characters
            return;
        }

        setLoading(true);
        const delayDebounce = setTimeout(async () => {
            const results = await fetchAddresses(inputValue);
            setOptions(results);
            setLoading(false);
        }, 500); // Debounce input to prevent excessive API calls

        return () => clearTimeout(delayDebounce);
    }, [inputValue]);

    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            filterOptions={(x) => x} // Prevents default filtering (we rely on API results)
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            onChange={(event, selectedOption) => {
                if (selectedOption) {
                    onSelect(selectedOption.value); // Pass selected address back to parent
                }
            }}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
            label="Street Address"
            fullWidth
            InputProps={{
            ...params.InputProps,
                    endAdornment: (
                    <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
                </>
            ),
            }}
            />
        )}
            />
    );
};

export default AddressAutocomplete;
