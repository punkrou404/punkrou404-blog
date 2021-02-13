import Link from 'next/link';
import { PER_PAGE } from '~/lib/const';

export const Pagination = ({ totalCount }): JSX.Element => {
    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

    return (
        <nav className="flex justify-evenly w-full pt-4">
            {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
                <div key={index}>
                    <Link href={`/blog/${number}`}>
                        <a>{number}</a>
                    </Link>
                </div>
            ))}
        </nav>
    );
};
