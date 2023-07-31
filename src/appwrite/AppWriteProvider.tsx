import React, {FC, PropsWithChildren, useState} from 'react';

import AppWriteService from './service';

type AppWriteContextType = {
  appwrite: AppWriteService;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
};

export const AppWriteContext = React.createContext<AppWriteContextType>({
  appwrite: new AppWriteService(),
  isLogged: false,
  setIsLogged: () => {},
});

const AppWriteProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLogged, setIsLogged] = useState(false);
  const defaultValue = {
    appwrite: new AppWriteService(),
    isLogged,
    setIsLogged,
  };
  return (
    <AppWriteContext.Provider value={defaultValue}>
      {children}
    </AppWriteContext.Provider>
  );
};

export default AppWriteProvider;
