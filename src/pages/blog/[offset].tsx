import React from 'react';
import { Pagination } from '~/components/pagination';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import Card from '~/components/card';
import PageHead from '~/components/page-head';
import { Content, getBlog, getBlogByQuery } from '~/lib/blog';

const PER_PAGE = 5;
const MAX_PAGE = 5;

interface BlogOffsetInput {
    blog: Content[];
    totalCount: number;
    offset: number;
}

const BlogOffset = ({ blog, totalCount, offset }: BlogOffsetInput): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: `/blog/${String(offset)}`,
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
            <Pagination totalCount={totalCount} />
            {blog.map((content) => (
                <Card props={content} key={content.id} />
            ))}
            <Pagination totalCount={totalCount} />
        </div>
    );
};

export const getStaticProps = async (context: {
    params: { offset: number };
}): Promise<{
    props: BlogOffsetInput;
}> => {
    const offset = context.params.offset;

    const body = await getBlogByQuery(offset, PER_PAGE, MAX_PAGE);

    return {
        props: {
            blog: body.contents,
            totalCount: body.totalCount,
            offset,
        },
    };
};

export const getStaticPaths = async (): Promise<{
    paths: `/blog/${number}`[];
    fallback: boolean;
}> => {
    const body = await getBlog();

    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

    const paths = range(1, Math.ceil(body.totalCount / PER_PAGE)).map(
        (offset) => `/blog/${offset}`
    );

    return { paths, fallback: false };
};
export default BlogOffset;
