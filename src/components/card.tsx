import Date from '~/components/date';
import Link from 'next/link';
import Topics from '~/components/topics';

const Card = ({ props }): JSX.Element => {
    return (
        <Link href={`/blog/post/${props.id}`} key={props.id}>
            <div className="w-full flex flex-col p-3 text-gray-500">
                <div className="p-4 active:bg-blue-400 bg-blue-200 hover:bg-blue-300 rounded-lg shadow-lg flex-1 flex flex-col">
                    <div className="p-4 rounded-lg active:bg-gray-400 hover:bg-gray-200 bg-white">
                        <header className="bg-cover">
                            <h3 className="mb-4 text-2xl">{props.title}</h3>
                            <div className="mb-4 text-grey-darker text-sm flex-1">
                                <Date dateString={props.createdAt} />
                            </div>
                            <Topics list={props.topics} title={props.title} />
                        </header>
                        <main className="p-4 flex-1 flex flex-col">
                            <p>{props.summary}</p>
                        </main>
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default Card;
