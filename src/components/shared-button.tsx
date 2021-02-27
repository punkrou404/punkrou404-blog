import { ReactNode } from 'react';

interface P {
    title: string;
    url: string;
}

export const SharedButton = ({ title, url }: P): JSX.Element => {
    return (
        <>
            <Card key={`1`}>
                <Twitter title={title} url={url} />
            </Card>
            {/* <Card key={`2`}>
                <Facebook url={url} />
            </Card>
            <Card key={`3`}>
                <Line url={url} />
            </Card> */}
        </>
    );
};

const Card = ({ children }: { children?: ReactNode }): JSX.Element => {
    return <div className={``}>{children}</div>;
};

const Twitter = ({ title, url }: P): JSX.Element => {
    const description = `test word`;
    return (
        <>
            <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                className="twitter-share-button"
                data-text={title}
                data-url={url}
                data-via={`punkrou404`}
                data-show-count="false"
            />
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </>
    );
};

// const Facebook = ({ url }): JSX.Element => {
//     const text = `[表示したい文字]`;
//     return (
//         <>
//             <div
//                 className="fb-share-button"
//                 data-href={`${url}`}
//                 data-layout="button"
//                 data-size="small"
//             >
//                 <a
//                     href={`https://www.facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse&amp;t=${text}`}
//                     className="fb-xfbml-parse-ignore"
//                     target="_blank"
//                     rel="noreferrer"
//                 >
//                     Shared Facebook
//                 </a>
//             </div>
//             <div id="fb-root"></div>
//             <script
//                 async
//                 defer
//                 crossOrigin="anonymous"
//                 src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&amp;version=v10.0"
//                 nonce="FeepxFVn"
//             ></script>
//         </>
//     );
// };

// const Line = ({ url }): JSX.Element => {
//     const text = `[表示したい文字]`;
//     return (
//         <>
//             <a href={`http://line.me/R/msg/text/?${url}`} target="_blank" rel="noreferrer">
//                 Shared LINE
//             </a>
//         </>
//     );
// };
