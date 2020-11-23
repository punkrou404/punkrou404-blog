import Head from 'next/head';
import { NextPage } from 'next';

const Layout: NextPage = ({ children }) => (
    <div>
        <Head>
            <title>{`punkrou404 blog`}</title>
        </Head>
        <body>{children}</body>
    </div>
);

export default Layout;
