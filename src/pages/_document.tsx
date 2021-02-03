import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
    render(): JSX.Element {
        return (
            <Html lang="ja">
                <Head>
                    <link rel="shortcut icon" href="/profile.png" key="shortcutIcon" />
                    <link rel="manifest" href="/manifest.json" />
                    <title>{`punkrou404 blog`}</title>
                </Head>
                <Main />
                <NextScript />
            </Html>
        );
    }
}

export default Document;
