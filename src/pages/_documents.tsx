import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
    render(): JSX.Element {
        return (
            <Html lang="ja">
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <link rel="shortcut icon" href="/profile.png" key="shortcutIcon" />
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <Main />
                <NextScript />
            </Html>
        );
    }
}

export default Document;
