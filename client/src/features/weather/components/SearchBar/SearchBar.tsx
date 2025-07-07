import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCity, setCoordinates } from "../../../../store/weatherSlice";
import { useGetCitySuggestionsQuery } from "@/services/weatherApi";
import { useDebouncedValue } from "@/common/hooks/useDebouncedValue";
import { SuggestionsDropdown } from "../SuggestionsDropdown/SuggestionsDropdown";

import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useAppDispatch();

  const debouncedInput = useDebouncedValue(input.trim(), 300);

  const minSearchLength = 3;

  const citySearchHelperText = "Please enter at least 3 letters or coordinates";
  const citySearchPlaceholder = "Enter city or coordinates lat, lon";

  const isCoordinates = (text: string) => {
    const match = text.match(/^\s*(-?\d+(\.\d+)?)[,\s]+(-?\d+(\.\d+)?)\s*$/);
    if (!match) return null;
    return { lat: parseFloat(match[1]), lon: parseFloat(match[3]) };
  };

  const { data: suggestions = [], isFetching } = useGetCitySuggestionsQuery(
    debouncedInput,
    {
      skip:
        debouncedInput.length < minSearchLength ||
        isCoordinates(debouncedInput) !== null ||
        !showSuggestions,
    }
  );

  const handleSearch = () => {
    const coords = isCoordinates(input.trim());

    if (coords) {
      dispatch(setCoordinates(coords));
      setError("");
      setShowSuggestions(false);
      return;
    }

    if (input.trim().length < minSearchLength) {
      setError(citySearchHelperText);
      return;
    }

    dispatch(setCity(input.trim()));
    setError("");
    setShowSuggestions(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (error) setError("");
    setShowSuggestions(true);
  };

  const handleSelect = (cityName: string) => {
    setInput(cityName);
    dispatch(setCity(cityName));
    setShowSuggestions(false);
    setError("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder={citySearchPlaceholder}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onFocus={() => {
            if (
              input.trim().length >= minSearchLength &&
              !isCoordinates(input)
            ) {
              setShowSuggestions(true);
            }
          }}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {showSuggestions &&
        !isCoordinates(input) &&
        debouncedInput.length >= 3 && (
          <SuggestionsDropdown
            suggestions={suggestions}
            isLoading={isFetching}
            onSelect={handleSelect}
            searchQuery={debouncedInput}
          />
        )}
    </div>
  );
};
