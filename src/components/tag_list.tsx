import Tag from '~/components/tag';
type TagListProps = {
    list: string[];
    title: string;
};

const TagList = ({ list, title }: TagListProps): JSX.Element => {
    if (!list) {
        return <div />;
    }
    return (
        <div className="flex">
            {list.map((tag) => (
                <Tag key={`${title}-${tag}`}>{tag}</Tag>
            ))}
        </div>
    );
};

export default TagList;
