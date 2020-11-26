export type PostMeta = {
    date: string;
    id: string;
    published: boolean;
    summary: string;
    title: string;
    topics: string[];
    type: string;
};

export type PostContent = {
    contentHtml: string;
    date: string;
    id: string;
    published: boolean;
    title: string;
    topics: string[];
    type: string;
};

export type PostID = {
    params: { id: string };
};
