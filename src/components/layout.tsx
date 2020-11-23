import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';

const Layout: NextPage = ({ children }) => (
    <div>
        <Head>
            <title>{`punkrou404 blog`}</title>
        </Head>
        <body>
            <header>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </header>
            <main>{children}</main>
            <footer></footer>
        </body>
    </div>
);

export default Layout;
