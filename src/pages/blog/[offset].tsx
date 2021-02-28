import React from 'react';
import { Pagination } from '~/components/pagination';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import PostListElement from '~/components/post-list-element';
import PageHead from '~/components/page-head';
import { ISR_TIME, PER_PAGE } from '~/lib/const';
import { range } from '~/lib/range';
import SearchInput from '~/components/search-input';
import { Post } from '~/api/types';
import { findBlogByOffset } from '~/api/blog/find_blog_by_offset';
import { getAllContents } from '~/api/blog/get_all_contents';

interface P {
    contents: Post[];
    totalCount: number;
    offset: number;
}

type blogOffsetPaths = `/blog/${number}`;

const BlogOffset = ({ contents, totalCount, offset }: P): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: `/blog`,
        },
        {
            id: 3,
            text: String(offset),
        },
    ]);

    return (
        <div>
            <PageHead
                subtitle={`Blog page.${offset}`}
                description={`Blog list`}
                image={``}
                url={``}
            />
            <SearchInput />
            <Pagination current={offset} totalCount={totalCount} />
            {contents.map((content) => (
                <PostListElement props={content} key={content.id} />
            ))}
            <Pagination current={offset} totalCount={totalCount} />
        </div>
    );
};

export const getStaticProps = async (context: {
    params: { offset: number };
}): Promise<{
    props: P;
    revalidate: number;
}> => {
    const offset = context.params.offset;
    const posts = await findBlogByOffset({ pageOffset: offset });
    const { contents, totalCount } = posts;

    return {
        props: {
            contents,
            totalCount,
            offset,
        },
        revalidate: ISR_TIME,
    };
};

export const getStaticPaths = async (): Promise<{
    paths: blogOffsetPaths[];
    fallback: boolean;
}> => {
    const posts = await getAllContents();

    const paths = range(1, Math.ceil(posts.length / PER_PAGE)).map(
        (offset) => `/blog/${offset}` as blogOffsetPaths
    );

    return { paths, fallback: false };
};

export default BlogOffset;
