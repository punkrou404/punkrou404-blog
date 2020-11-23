import Link from 'next/link';
import { PostMetaData } from '../lib/types';

const Card = ({ props }: PostMetaData) => (
    <Link href={`/posts/${props.id}`} key={props.id}>
        <div className="w-full sm:w-1/2 md:w-1/3 flex flex-col p-3">
            <div className="active:bg-gray-500 hover:bg-gray-300 bg-gray-100 rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                <header className="bg-cover">
                    <h3 className="mb-4 text-2xl">{props.title}</h3>
                    <div className="mb-4 text-grey-darker text-sm flex-1">
                        <p>{props.date}</p>
                    </div>
                </header>
                <main className="p-4 flex-1 flex flex-col">
                    <p>Summary.</p>
                </main>
                <footer>
                    <a
                        href="#"
                        className="border-t border-grey-light pt-2  text-xs text-grey hover:text-red uppercase no-underline tracking-wide"
                    >
                        Tags.
                    </a>
                </footer>
            </div>
        </div>
    </Link>
);

export default Card;
