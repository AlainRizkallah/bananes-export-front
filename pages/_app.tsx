import { UserProvider } from '@auth0/nextjs-auth0';
import { CacheProvider, css, EmotionCache } from "@emotion/react";
import { CssBaseline, GlobalStyles } from '@mui/material';
import { green, purple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import PageProvider from '../components/PageProvider';
import createEmotionCache from "../components/theme/createEmotionCache";
import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}


type CustomAppProps = AppProps & {
  emotionCache: EmotionCache 
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: CustomAppProps) {
  return (
    <UserProvider>
    <ThemeProvider>
        <CacheProvider value={emotionCache}>
          <PageProvider>
            <CssBaseline />
            <GlobalStyles
            styles={css`  
              :root {
                body {
                  background-color: #fff;
                  color: #121212;
                }
              }
[data-theme="dark"] {
                body {
                  background-color: #121212;
                  color: #fff;
                }
              }
            `}
          />
             <Component {...pageProps} />
          </PageProvider>
        </CacheProvider>
    </ThemeProvider>
    </UserProvider>
  )
}

export default MyApp