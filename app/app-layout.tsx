'use client';
import { WebAppDataContext } from '@/utils/web-app-provider';
import { NextUIProvider } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const { state } = useContext(WebAppDataContext);
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      console.log('state.appData', state);
      if (state.appData?.version?.length > 0) {
          setLoaded(true);
      }
    }, [state]);
  return (
        <body>
          <NextUIProvider>
             { loaded && 
                children
             }
          </NextUIProvider>
        </body>
    
  )
}
