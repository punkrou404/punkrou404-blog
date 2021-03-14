import * as React from 'react';
import Head from 'next/head';
import { HANDLE_NAME } from '~/lib/const';

interface Props {
    subtitle: string;
    description: string;
    image: string;
    url: string;
}

const PageHead = ({ subtitle, description, image, url }: Props): JSX.Element => {
    const title = `${HANDLE_NAME} blog - ${subtitle}`;
    image = `/profile.png`;
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            {/* <meta property="og:description" content={description} /> */}
            <meta property="og:type" content="blog" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={title} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={`@${HANDLE_NAME}`} />
            <meta name="twitter:url" content={image} />
            <meta name="twitter:title" content={title} />
            {/* <meta name="twitter:description" content={description} /> */}
            <meta name="twitter:image" content={image} />
            <link rel="canonical" href={url} />
            <link rel="shortcut icon" href={image} />
            <link rel="apple-touch-icon" href={image} />
        </Head>
    );
};

export default PageHead;
