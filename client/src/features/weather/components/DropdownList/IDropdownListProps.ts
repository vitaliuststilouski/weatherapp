export interface IDropdownListProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  onSelect: (cityName: string) => void;
  searchQuery: string;
}

interface Suggestion {
  name: string;
  country: string;
}
