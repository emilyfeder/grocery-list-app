import React from 'react';
import styled from '@emotion/styled';
import { Toolbar } from '@mui/material';
import { Header, GroceryListItems, NewItemForm } from './components';
import ThemeProvider from './ThemeProvider';
import { useRootStore, RootStoreContext } from './data';

function App() {
  const store = useRootStore();
  return (
    <ThemeProvider>
      <RootStoreContext.Provider value={{...store}}>
        <Header/>
        <Toolbar/>
        <StyledNewItemForm/>
        <GroceryListItems/>
      </RootStoreContext.Provider>
    </ThemeProvider>
   
  );
}

export default App;

const StyledNewItemForm = styled(NewItemForm)`
  margin-top: 10px;
`;
