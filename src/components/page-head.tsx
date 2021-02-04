import * as React from 'react';
import Head from 'next/head';

interface Props {
    subtitle: string;
    description: string;
    image: string;
    url: string;
}

export default ({ subtitle, description, image, url }: Props): JSX.Element => {
    const title = `punkrou404 blog - ${subtitle}`;
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="blog" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={title} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={`@punkrou404`} />
            <meta name="twitter:url" content={image} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <link rel="canonical" href={url} />
            <link rel="shortcut icon" href={`profile.png`} />
            <link rel="apple-touch-icon" href={`profile.png`} />
        </Head>
    );
};
