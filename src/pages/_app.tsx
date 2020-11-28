import 'styles/index.css';
import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import Layout from '~/components/layout';

const App = ({ Component, pageProps }: AppProps) => {
    console.log(Component);
    return (
        <Layout>
            <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} />
            <Component {...pageProps} />
        </Layout>
    );
};

export default App;
