import {createContext} from 'react';

const AppContext = createContext({
  snackbarState: {},
  setSnackbarState: () => {},
});

export default AppContext;
