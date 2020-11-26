const IconLink = ({ href, data }) => (
    <div className="flex-grow">
        <a className="block" href={href} target="_blank" rel="noreferrer">
            <object type="image/svg+xml" className="pointer-events-none w-8 h-8" data={data} />
        </a>
    </div>
);

export default IconLink;
