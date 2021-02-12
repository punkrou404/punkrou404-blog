import Linkable from '~/components/linkable';

const Header = (): JSX.Element => {
    return (
        <header className="border-b">
            <nav className="bg-blue-300 flex font-semibold items-center justify-between bg-teal-500 py-4">
                <div className="p-2 flex-row">
                    <Linkable href="/" name="@punkrou404" />
                </div>
                <div className="flex flex-row-reverse uppercase">
                    <Linkable href="/contact" name="Contact" />
                    <Linkable href="/blog/1" name="Blog" />
                    <Linkable href="/about" name="About" />
                </div>
            </nav>
        </header>
    );
};

export default Header;
