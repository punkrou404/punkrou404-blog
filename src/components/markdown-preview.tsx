const MarkdownPreview = ({ content }) => (
    <div className="border">
        <div className="border" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
);

export default MarkdownPreview;
