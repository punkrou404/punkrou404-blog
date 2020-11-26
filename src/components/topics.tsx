const Topics = ({ list, title }) => {
    if (null == list || undefined == list) {
        return <div />;
    }
    return (
        <div className="flex">
            {list.map((topic) => (
                <div className="pr-2" key={`${title}-${topic}`}>
                    <a
                        href="#"
                        className="text-xs text-grey hover:text-red uppercase tracking-wide"
                    >
                        <div className="pr-2 pl-2 bg-blue-200 rounded-lg">{topic}</div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default Topics;
