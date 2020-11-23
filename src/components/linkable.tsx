import Link from 'next/link';

const Linkable = ({ href, name }) => (
    <Link href={href}>
        <div className="cursor-pointer p-8 active:bg-blue-500 hover:bg-blue-300 focus:bg-blue-300">
            {name}
        </div>
    </Link>
);

export default Linkable;
