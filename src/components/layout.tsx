import Footer from '~/components/footer';
import Head from 'next/head';
import Header from '~/components/header';
import { NextPage } from 'next';

const Layout: NextPage = ({ children }) => (
    <div>
        <Head>
            <title>{`punkrou404 blog`}</title>
        </Head>
        <body className="bg-blue-200 break-all text-white min-h-screen overflow-hidden">
            <Header />
            <main className="p-5">{children}</main>
            <Footer />
        </body>
    </div>
);

export default Layout;
