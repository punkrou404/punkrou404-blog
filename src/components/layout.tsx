import Footer from './footer';
import Head from 'next/head';
import Header from './header';
import { NextPage } from 'next';

const Layout: NextPage = ({ children }) => (
    <div>
        <Head>
            <title>{`punkrou404 blog`}</title>
        </Head>
        <body className="bg-blue-200">
            <Header />
            <main className="p-5">{children}</main>
            <Footer />
        </body>
    </div>
);

export default Layout;
