import 'styles/index.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }: AppProps) => (
    <div>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>punkrou404 blog</title>
            <link rel="shortcut icon" href="/favicon.ico" key="shortcutIcon" />
            <link rel="manifest" href="/manifest.json" />
        </Head>
        <Component {...pageProps} />
    </div>
);

export default App;
