import 'styles/index.css';
import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import Layout from '~/components/layout';
import BreadcrumbProvider from '~/provider/breadcrumb-provider';

const App = ({ Component, pageProps }: AppProps) => (
    <Layout>
        <BreadcrumbProvider>
            <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} />
            <Component {...pageProps} />
        </BreadcrumbProvider>
    </Layout>
);

export default App;
