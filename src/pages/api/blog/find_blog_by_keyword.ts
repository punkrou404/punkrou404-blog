import { BlogError } from '~/pages/api/types';
import { getSearchWords } from '~/lib/keyword';
import { getContentsByMarkdownFile, getSources } from '~/lib/post-contents';
import { Content } from '~/pages/api/types';

interface InputFindBlogByKeyword {
    keyword: string | string[];
}

interface OutputFindBlogByKeyword {
    contents: Content[];
    totalCount: number;
    hitCount: number;
}

export const findBlogByKeyword = async ({
    keyword,
}: InputFindBlogByKeyword): Promise<OutputFindBlogByKeyword> => {
    console.log(`[findBlogByKeyword] start`);
    console.log(`[findBlogByKeyword]Query parameter validation start`);

    if (!keyword) {
        throw {
            status: 400,
            message: `Bad Request. "keyword" is required.`,
        } as BlogError;
    }

    console.log(`[findBlogByKeyword]Query parameter validation end`);
    console.log(`[findBlogByKeyword]Get sources start`);

    const keywords = getSearchWords(String(keyword));
    const sources = getSources();
    const totalCount = sources.length;

    console.log(`[findBlogByKeyword]Get sources end`);
    console.log(`[findBlogByKeyword]Filtered contents start`);

    const filteredSources = sources.filter((content) => {
        return !keywords.map((keyword) => content.fileContent.indexOf(`${keyword}`)).includes(-1);
    });
    const hitCount = filteredSources.length;

    console.log(`[findBlogByKeyword]Filtered contents end`);
    console.log(`[findBlogByKeyword]Get metadata to display on the page start`);

    const contents = getContentsByMarkdownFile(filteredSources);

    console.log(`[findBlogByKeyword]Get metadata to display on the page end`);
    console.log(`[findBlogByKeyword] end`);

    return {
        contents,
        totalCount,
        hitCount,
    };
};
