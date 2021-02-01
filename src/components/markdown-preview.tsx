const MarkdownPreview = ({ content }) => (
    <div className="border">
        <link rel="stylesheet" href="https://sindresorhus.com/github-markdown-css/github-markdown.css"></link>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
);

export default MarkdownPreview;
