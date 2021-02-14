import { createContext } from 'react';

interface SearchContextValue {
    search: string | string[];
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextValue>({
    search: '',
    setSearch: () => undefined,
});
