import 'styles/index.css';
import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import Layout from '~/components/layout';
import BreadcrumbProvider from '~/provider/breadcrumb-provider';
import React, { useEffect, useState } from 'react';
import { SearchContext } from '~/context/search-context';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const router = useRouter();
    const [search, setSearch] = useState<string | string[]>('');
    useEffect(() => {
        const urlQuery = router.query;
        if (urlQuery && urlQuery.keyword) {
            setSearch(urlQuery.keyword);
        } else {
            setSearch('');
        }
    }, [router]);

    return (
        <Layout>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <BreadcrumbProvider>
                <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} />
                <SearchContext.Provider value={{ search, setSearch }}>
                    <Component {...pageProps} />
                </SearchContext.Provider>
            </BreadcrumbProvider>
        </Layout>
    );
};

export default App;
