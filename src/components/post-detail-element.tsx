import Date from '~/components/date';
import MarkdownPreview from '~/components/markdown-preview';
import TagList from '~/components/tag_list';
import DeprecationAlert from '~/components/deprecation_alert';
import { Alert } from '@material-ui/lab';
import { PostDetail } from '~/api/types';
import { SharedButton } from '~/components/shared-button';
import { useEffect } from 'react';

type P = {
    props: PostDetail;
};

const PostDetailElement = ({ props }: P): JSX.Element => {
    // Twitter Widget
    let isLoadwidgets = false;
    useEffect(() => {
        if (!isLoadwidgets) {
            const s = document.createElement('script');
            s.setAttribute('src', 'https://platform.twitter.com/widgets.js');
            document.body.appendChild(s);
            isLoadwidgets = true;
        }
    }, []);

    return (
        <>
            <header className="bg-cover">
                <h3 className="mb-4 text-2xl">{props.title}</h3>
                <SharedButton
                    title={`${props.title}`}
                    url={`${process.env.MYDOMAIN_BASEURL}/blog/post/${props.id}`}
                ></SharedButton>
                <div className="mb-4 text-sm">
                    <DeprecationAlert props={props} />
                </div>
                <div className="mb-4 text-sm">
                    {`作成: `}
                    <Date dateString={props.createdAt} />
                </div>
                <div className="mb-4 text-sm">
                    {`更新: `}
                    <Date dateString={props.updatedAt} />
                </div>
                <div className="pb-4 text-sm">
                    <Alert severity="info">{`このPOSTは約${props.time2FinishReading}分で読めます。`}</Alert>
                </div>
                <div className="mb-4 text-sm">
                    <TagList list={props.tagList} title={props.title} />
                </div>
            </header>
            <main className="pt-4 flex-col">
                <div className="pb-4 border-t" />
                <MarkdownPreview content={props.contentHtml} />
            </main>
            <footer className="pt-4">
                <div className="pb-4 border-t" />
                Comment.
            </footer>
        </>
    );
};

export default PostDetailElement;
