import Date from './date';
import Link from 'next/link';
import { PostData } from '../lib/types';
import Topics from './topics';

const Card = ({ props }: PostData) => (
    <Link href={`/posts/${props.id}`} key={props.id}>
        <div className="w-full flex flex-col p-3">
            <div className="active:bg-blue-400 hover:bg-blue-300 bg-white text-gray-500 rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                <header className="bg-cover">
                    <h3 className="mb-4 text-2xl">{props.title}</h3>
                    <div className="mb-4 text-grey-darker text-sm flex-1">
                        <Date dateString={props.date} />
                    </div>
                    <Topics list={props.topics} title={props.title} />
                </header>
                <main className="p-4 flex-1 flex flex-col">
                    <p>Summary.</p>
                </main>
            </div>
        </div>
    </Link>
);

export default Card;
