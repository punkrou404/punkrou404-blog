import 'styles/index.css';
import { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }: AppProps) => (
    <div>
        <Component {...pageProps} />
    </div>
);

export default App;
