type ShareButtonTwitterProps = {
    description: string;
    url: string;
};

const ShareButtonTwitter = ({ description, url }: ShareButtonTwitterProps): JSX.Element => {
    return (
        <>
            <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                className="twitter-share-button"
                data-text={description}
                data-url={url}
                data-show-count="false"
            >
                Tweet
            </a>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </>
    );
};

export default ShareButtonTwitter;
