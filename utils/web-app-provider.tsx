'use client';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { WebApp as WebAppTypes } from "@twa-dev/types";
import WebApp from "@twa-dev/sdk";

interface IState {
  appData: WebAppTypes
}

interface IActions {
  setAppData: Dispatch<SetStateAction<WebAppTypes>>
}

const WebAppDataContext = createContext({state: {} as IState, actions: {} as IActions});

const WebAppDataProvider = ({ children }: any) => {
  const [appData, setAppData] = useState({} as WebAppTypes);

  const value = {
    state: { appData },
    actions: { setAppData },
  };

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      console.log('window is defined');
      const app = WebApp;
      if (app) {
        app.ready();
        app.setHeaderColor(app.themeParams.bg_color);
        app.setBackgroundColor('bg_color');
        setAppData(app);
        console.log('window is defined app', app);
      }
    }
  },[]);

  return (
    <WebAppDataContext.Provider value={value}>
      {children}
    </WebAppDataContext.Provider>
  )
}
export { WebAppDataProvider, WebAppDataContext};


