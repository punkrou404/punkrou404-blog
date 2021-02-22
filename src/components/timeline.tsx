const Timeline = (): JSX.Element => {
    return (
        <div>
            <a
                className="twitter-timeline"
                href="https://twitter.com/punkrou404?ref_src=twsrc%5Etfw"
            >
                Tweets by punkrou404
            </a>{' '}
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
    );
};

export default Timeline;
