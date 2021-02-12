import React, { useEffect, useState } from 'react';
import { Pagination } from '~/components/pagination';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import Card from '~/components/card';
import PageHead from '~/components/page-head';
import { Content, getBlogByQuery } from '~/lib/blog';
import { useRouter } from 'next/router';

const Blog = ({ blog, totalCount }): JSX.Element => {
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
    ]);

    return (
        <div>
            <PageHead subtitle={`Blog page`} description={`Blog list`} image={``} url={``} />
            <Pagination totalCount={totalCount} />
            {blog.map((content) => (
                <Card props={content} key={content.id} />
            ))}
            <Pagination totalCount={totalCount} />
        </div>
    );
};

export const getStaticProps = async (): Promise<{
    props: { blog: Content[]; totalCount: number };
}> => {
    const body = await getBlogByQuery(1, 5, 5);

    return {
        props: {
            blog: body.contents,
            totalCount: body.totalCount,
        },
    };
};
export default Blog;
