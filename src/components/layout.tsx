import Footer from '~/components/footer';
import Header from '~/components/header';
import { NextPage } from 'next';
import Main from '~/components/main';

const Layout: NextPage = ({ children }): JSX.Element => {
    return (
        <div className="bg-blue-200 break-all text-white min-h-screen">
            <Header />
            <Main children={children} />
            <Footer />
        </div>
    );
};

export default Layout;
