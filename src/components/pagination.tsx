import Link from 'next/link';
import { PER_PAGE } from '~/lib/const';
import { range } from '~/lib/range';

const START_INDEX = 1 as const;
const COUNT = 4 as const;

type PageLinksProps = {
    current: number;
    start: number;
    end: number;
    total: number;
};

type PaginationProps = {
    current: number;
    totalCount: number;
};

const PageLinks = ({ current, start, end, total }: PageLinksProps) => (
    <nav className="flex justify-evenly w-full pt-4">
        <Link key={START_INDEX} href={`/blog/${START_INDEX}`}>
            <a>{`<<`}</a>
        </Link>
        {range(start, end).map((e) => {
            const style = e == current ? `text-blue-400` : ``;
            return (
                <div key={e} className={`active:text-blue-600 hover:bg-blue-300 ${style}`}>
                    <Link href={`/blog/${e}`}>
                        <a>{e}</a>
                    </Link>
                </div>
            );
        })}
        <Link key={total} href={`/blog/${total}`}>
            <a>{`>>`}</a>
        </Link>
    </nav>
);

export const Pagination = ({ current, totalCount }: PaginationProps): JSX.Element => {
    const lastIndex = Math.ceil(totalCount / PER_PAGE);

    if (current <= COUNT - START_INDEX)
        return (
            <PageLinks
                current={current}
                start={START_INDEX}
                end={START_INDEX + COUNT}
                total={lastIndex}
            />
        );

    if (lastIndex - COUNT <= current && current <= lastIndex)
        return (
            <PageLinks
                current={current}
                start={lastIndex - COUNT}
                end={lastIndex}
                total={lastIndex}
            />
        );

    return (
        <PageLinks
            current={current}
            start={current - COUNT / 2}
            end={current + COUNT / 2}
            total={lastIndex}
        />
    );
};
