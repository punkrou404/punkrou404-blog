import { NextPage } from 'next';

const Layout: NextPage = ({ children }) => {
    return (
        <div>
            Layout.
            {children}
        </div>
    );
};

export default Layout;
