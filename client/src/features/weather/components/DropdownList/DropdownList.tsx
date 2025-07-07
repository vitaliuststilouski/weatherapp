import { IDropdownListProps } from './IDropdownListProps';
import styles from "./DropdownList.module.css";

export const DropdownList = ({
  suggestions,
  isLoading,
  onSelect,
  searchQuery,
}: IDropdownListProps) => {
  const highlightMatch = (text: string, query: string) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <strong>{text.substring(index, index + query.length)}</strong>
        {text.substring(index + query.length)}
      </>
    );
  };

  return (
    <ul className={styles.suggestions}>
      {isLoading && <li className={styles.loading}>Loading...</li>}
      {!isLoading && suggestions.length === 0 ? (
        <li className={styles.noResults}>
          No cities found for "{searchQuery}"
        </li>
      ) : (
        suggestions.map(({ name, country }, index) => (
          <li
            key={`${name}-${country}-${index}`}
            className={styles.suggestionItem}
            onMouseDown={() => onSelect(name)}
          >
            {highlightMatch(name, searchQuery)}
            {country && `, ${country}`}
          </li>
        ))
      )}
    </ul>
  );
};
