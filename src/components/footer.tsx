const Footer = (): JSX.Element => {
    return (
        <footer className="h-10 border bg-blue-300">
            <p className="text-center text-white">
                {`created by `}
                <a
                    className="text-blue-500 hover:text-blue-600 visited:text-purple-600"
                    href={`https://github.com/punkrou404/punkrou404-blog`}
                    target="_blank"
                    rel="noreferrer"
                >{`punkrou404-blog`}</a>
                {` | This site uses Google Analytics.`}{' '}
            </p>
        </footer>
    );
};

export default Footer;
