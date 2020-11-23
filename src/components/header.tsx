import Linkable from './linkable';

const Header = () => (
    <header className="sticky border">
        <nav className="flex items-center justify-between bg-teal-500 p-4">
            <div className="p-2 w-full flex-row">
                <div className="font-semibold">@punkrou404</div>
            </div>
            <div className="flex w-full flex-row-reverse">
                <Linkable href="/contact" name="Contact" />
                <div className="border-l-2" />
                <Linkable href="/blog" name="Blog" />
                <div className="border-l-2" />
                <Linkable href="/" name="Home" />
            </div>
        </nav>
    </header>
);

export default Header;
