import Date from '~/components/date';
import MarkdownPreview from '~/components/markdown-preview';
import Topics from '~/components/topics';

const PostCard = ({ props }): JSX.Element => {
    return (
        <div className="w-full flex-col p-3 text-gray-500">
            <div className="p-4 bg-white rounded-lg shadow-lg flex-col">
                <header className="bg-cover">
                    <h3 className="mb-4 text-2xl">{props.title}</h3>
                    <div className="mb-4 text-sm">
                        <Date dateString={props.date} />
                    </div>
                    <div className="pb-4 text-sm">
                        このPOSTは約{props.time2FinishReading}分で読めます。
                    </div>
                    <div>
                        <Topics list={props.topics} title={props.title} />
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
            </div>
        </div>
    );
};

export default PostCard;
