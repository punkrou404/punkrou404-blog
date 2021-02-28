import React from 'react';
import NextDocument, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from 'next/document';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets as MaterialServerStyleSheets } from '@material-ui/core';

class Document extends NextDocument {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const styledComponentsSheet = new ServerStyleSheet();
        const materialUiSheets = new MaterialServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
                originalRenderPage({
                    enhanceApp: (App) => (
                        props
                    ): React.ReactElement<{
                        sheet: ServerStyleSheet;
                    }> =>
                        styledComponentsSheet.collectStyles(
                            materialUiSheets.collect(<App {...props} />)
                        ),
                });

            const initialProps = await NextDocument.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: [
                    <React.Fragment key="styles">
                        {initialProps.styles}
                        {styledComponentsSheet.getStyleElement()}
                        {materialUiSheets.getStyleElement()}
                    </React.Fragment>,
                ],
            };
        } finally {
            styledComponentsSheet.seal();
        }
    }
    render(): JSX.Element {
        return (
            <Html lang="ja">
                <Head>
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
