export interface MicrocmsContent {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    body: string;
}

export interface ContentHeader {
    title: string;
    type: string;
    topics: string[];
    published: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
}

export type BlogError = {
    status: number;
    message: string;
};
