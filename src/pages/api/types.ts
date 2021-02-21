export interface ContentHeader {
    title: string;
    topics: string[];
    published: boolean;
}

export interface Content extends ContentHeader {
    id: string;
    summary: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
}

export interface MicrocmsContentHeader {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
}

export interface MicrocmsContent extends MicrocmsContentHeader {
    body: string;
}

export type BlogError = {
    status: number;
    message: string;
};
