import Linkable from './linkable';

const Header = () => (
    <header className="border-b">
        <nav className="flex items-center justify-between bg-teal-500 p-4">
            <div className="p-2 flex-row">
                <div className="font-semibold">@punkrou404</div>
            </div>
            <div className="flex flex-row-reverse">
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
