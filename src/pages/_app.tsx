import 'styles/index.css';
import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import Layout from '~/components/layout';
import BreadcrumbProvider from '~/provider/breadcrumb-provider';
import React, { useEffect, useState } from 'react';
import { SearchContext } from '~/context/search-context';
import { useRouter } from 'next/router';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialUIThemeProvider, StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'styles/theme';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const router = useRouter();
    const [search, setSearch] = useState<string | string[]>('');

    // Search keyword
    useEffect(() => {
        const urlQuery = router.query;
        if (urlQuery && urlQuery.keyword) {
            setSearch(urlQuery.keyword);
        } else {
            setSearch('');
        }
    }, [router]);

    // Material UI
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }, []);

    return (
        <Layout>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <BreadcrumbProvider>
                <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} />
                <SearchContext.Provider value={{ search, setSearch }}>
                    <StylesProvider injectFirst>
                        <MaterialUIThemeProvider theme={theme}>
                            <StyledComponentsThemeProvider theme={theme}>
                                <CssBaseline />
                                <Component {...pageProps} />
                            </StyledComponentsThemeProvider>
                        </MaterialUIThemeProvider>
                    </StylesProvider>
                </SearchContext.Provider>
            </BreadcrumbProvider>
        </Layout>
    );
};

export default App;
