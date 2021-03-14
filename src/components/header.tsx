import Linkable from '~/components/linkable';
import { HANDLE_NAME } from '~/lib/const';

const Header = (): JSX.Element => {
    return (
        <header className="border-b">
            <nav className="bg-blue-300 flex font-semibold items-center justify-between bg-teal-500 py-4">
                <div className="p-2 flex-row">
                    <Linkable href="/" name={`@${HANDLE_NAME}`} />
                </div>
                <div className="flex flex-row-reverse uppercase">
                    <Linkable href="/contact" name="Contact" />
                    <Linkable href="/blog" name="Blog" />
                    <Linkable href="/about" name="About" />
                </div>
            </nav>
        </header>
    );
};

export default Header;
