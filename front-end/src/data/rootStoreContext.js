import React, { useContext } from 'react';

export const RootStoreContext = React.createContext({
    initialized: false,
    categories: [],
    listItems: [],
    defaultCategory: null,
    addItem: null
});

export function useRootStoreContext() {
    return useContext(RootStoreContext);
}