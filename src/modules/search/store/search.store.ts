import { create } from "zustand";

interface SearchStore {
    query: string;
    isSearching: boolean;
    setQuery: (query: string) => void;
    setIsSearching: (isSearching: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    query: '',
    isSearching: false,
    setQuery: (query) => set({ query }),
    setIsSearching: (isSearching) => set({ isSearching }),
}))