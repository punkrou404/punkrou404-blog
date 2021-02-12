import 'styles/index.css';
import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import Layout from '~/components/layout';
import BreadcrumbProvider from '~/provider/breadcrumb-provider';
import React from 'react';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <Layout>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <BreadcrumbProvider>
                <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} />
                <Component {...pageProps} />
            </BreadcrumbProvider>
        </Layout>
    );
};

export default App;
