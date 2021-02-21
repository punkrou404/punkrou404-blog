import Link from 'next/link';
type TagProps = {
    children: string;
};

const Tag = ({ children }: TagProps): JSX.Element => {
    return (
        <div className="text-xs text-grey pr-2 uppercase tracking-wide">
            <Link href={`/blog/tags?tag=${children}`}>
                <div className="pr-2 pl-2 active:bg-blue-400 hover:bg-blue-300 bg-blue-200 rounded-lg shadow-lg">
                    {children}
                </div>
            </Link>
        </div>
    );
};

export default Tag;
