import { getContentsByMarkdownFile, getSources } from '~/lib/post-contents';
import { Content } from '~/pages/api/types';

interface OutputFindAllBlog {
    contents: Content[];
    totalCount: number;
    hitCount: number;
}

export const findAllBlog = async (): Promise<OutputFindAllBlog> => {
    console.log(`[findAllBlog] start`);
    console.log(`[findAllBlog]Get metadata to display on the page start`);

    const sources = getSources();
    const totalCount = sources.length;
    const hitCount = sources.length;
    const contents = getContentsByMarkdownFile(sources);

    console.log(`[findAllBlog]Get metadata to display on the page end`);
    console.log(`[findAllBlog] end`);

    return {
        contents,
        totalCount,
        hitCount,
    };
};
