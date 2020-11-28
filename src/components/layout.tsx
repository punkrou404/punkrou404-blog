import Footer from '~/components/footer';
import Header from '~/components/header';
import { NextPage } from 'next';
import Main from '~/components/main';

const Layout: NextPage = ({ children, pageProps }) => {
    console.log(pageProps);
    return (
        <div>
            <body className="bg-blue-200 break-all text-white min-h-screen">
                <Header />
                <Main children={children} pageProps={pageProps} />
                <Footer />
            </body>
        </div>
    );
};

export default Layout;
