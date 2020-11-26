import Date from './date';
import Topics from './topics';

const PostCard = ({ props }) => (
    <div className="w-full flex flex-col p-3 text-gray-500">
        <div className="p-4 bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
            <header className="bg-cover">
                <h3 className="mb-4 text-2xl">{props.title}</h3>
                <div className="mb-4 text-grey-darker text-sm flex-1">
                    <Date dateString={props.date} />
                </div>
                <div>
                    <Topics list={props.topics} title={props.title} />
                </div>
            </header>
            <main className="pt-4 flex-1 flex flex-col">
                <div className="pt-4 border-t" />
                <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
            </main>
            <footer>
                <div className="border-t" />
                Comment.
            </footer>
        </div>
    </div>
);

export default PostCard;
