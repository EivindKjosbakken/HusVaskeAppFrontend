import {createContext} from 'react';

const AppContext = createContext({
  snackbarState: {},
  setSnackbarState: () => {},
  userState: {},
  setUserState: () => {},
});

export default AppContext;
