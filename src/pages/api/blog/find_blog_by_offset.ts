import { BlogError } from '~/pages/api/types';
import { MAX_DISPLAY_POST } from '~/pages/api/const';
import { getContentsByMarkdownFile, getSources } from '~/lib/post-contents';
import { Content } from '~/pages/api/types';

interface InputFindBlogByOffset {
    pageOffset: string | string[];
}

interface OutputFindBlogByOffset {
    contents: Content[];
    totalCount: number;
    hitCount: number;
}

export const findBlogByOffset = async ({
    pageOffset,
}: InputFindBlogByOffset): Promise<OutputFindBlogByOffset> => {
    console.log(`[findBlogByOffset] start`);
    console.log(`[findBlogByOffset]Query parameter validation start`);

    console.log(`[findBlogByOffset] pageOffset=${pageOffset}`);
    const pageOffsetNumber = Number(pageOffset) - 1;
    if (isNaN(pageOffsetNumber) || pageOffsetNumber < 0) {
        throw {
            status: 400,
            message: `Bad Request. "offset" is a positive integer.`,
        } as BlogError;
    }

    console.log(`[findBlogByOffset]Query parameter validation end`);
    console.log(`[findBlogByOffset]Get sources start`);

    const sources = getSources();
    const totalCount = sources.length;
    const hitCount = sources.length;

    console.log(`[findBlogByOffset]Get sources end`);
    console.log(`[findBlogByOffset]Filtered contents start`);

    const start = MAX_DISPLAY_POST * pageOffsetNumber;
    const end = MAX_DISPLAY_POST * pageOffsetNumber + MAX_DISPLAY_POST;
    console.log(`[findBlogByOffset]Page index start: ${start}    end: ${end}`);
    const filteredSources = sources.filter((_, i) => start <= i && i < end);

    console.log(`[findBlogByOffset]Filtered contents end`);
    console.log(`[findBlogByOffset]Get metadata to display on the page start`);

    const contents = getContentsByMarkdownFile(filteredSources);

    console.log(`[findBlogByOffset]Get metadata to display on the page end`);
    console.log(`[findBlogByOffset] end`);

    return {
        contents,
        totalCount,
        hitCount,
    };
};
