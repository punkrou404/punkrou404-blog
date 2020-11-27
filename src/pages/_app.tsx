import 'styles/index.css';
import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }: AppProps) => (
    <div>
        <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} />
        <Component {...pageProps} />
    </div>
);

export default App;
