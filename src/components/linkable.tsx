import Link from 'next/link';

const Linkable = ({ href, name }): JSX.Element => {
    return (
        <Link href={href}>
            <div className="cursor-pointer pr-6 pl-6 active:text-blue-200 hover:text-blue-100 focus:text-blue-100">
                {name}
            </div>
        </Link>
    );
};

export default Linkable;
