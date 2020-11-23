import Linkable from './linkable';

const Header = () => (
    <header>
        <nav className="flex items-center justify-between bg-teal-500 p-6">
            <div className="w-full">
                <img src="profile.png" />
            </div>
            <div className="p-8 w-full">
                <div className="font-semibold text-xl text-white">@punkrou404</div>
                <div className="font-semibold text-xl">SNS, more...</div>
            </div>
            <div className="flex w-full">
                <Linkable href="/" name="Home" />
                <div className="border-l-2" />
                <Linkable href="/profile" name="Profile" />
                <div className="border-l-2" />
                <Linkable href="/contact" name="Contact" />
            </div>
        </nav>
    </header>
);

export default Header;
