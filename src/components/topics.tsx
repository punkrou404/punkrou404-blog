const Topics = ({ list, title }): JSX.Element => {
    if (null == list || undefined == list) {
        return <div />;
    }
    return (
        <div className="flex">
            {list.map((topic) => (
                <div className="text-xs text-grey pr-2" key={`${title}-${topic}`}>
                    <a href="#" className="uppercase tracking-wide">
                        <div className="pr-2 pl-2 active:bg-blue-400 hover:bg-blue-300 bg-blue-200 rounded-lg shadow-lg">
                            {topic}
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default Topics;
