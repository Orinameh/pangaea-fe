import { createContext } from 'react';

const AppContext = createContext(undefined);

export const AppProvider = AppContext.Provider;

export default AppContext;
