import Footer from '~/components/footer';
import Head from 'next/head';
import Header from '~/components/header';
import { NextPage } from 'next';

const Layout: NextPage = ({ children }) => (
    <div>
        <Head>
            <title>{`punkrou404 blog`}</title>
        </Head>
        <body className="bg-blue-200 break-all text-white min-h-screen">
            <Header />
            <main className="grid grid-cols-6 p-5">
                <aside className="col-start-1 col-span-2" />
                <div className="col-start-2 col-span-4">{children}</div>
                <aside className="col-start-4 col-span-6" />
            </main>
            <Footer />
        </body>
    </div>
);

export default Layout;
