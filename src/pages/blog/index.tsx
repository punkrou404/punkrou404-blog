import React from 'react';
import { Pagination } from '~/components/pagination';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import Card from '~/components/card';
import PageHead from '~/components/page-head';
import { Content } from '~/pages/api/blogs';
import { DEFAULT_OFFSET } from '~/lib/const';

interface BlogInput {
    blog: Content[];
    totalCount: number;
}

const Blog = ({ blog, totalCount }: BlogInput): JSX.Element => {
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
    props: BlogInput;
}> => {
    const res = await fetch(
        `${process.env.MYDOMAIN_BASEURL}/api/blogs?${new URLSearchParams({
            offset: String(DEFAULT_OFFSET),
        })}`,
        {
            method: 'GET',
        }
    );
    const json = await res.json();

    return {
        props: {
            blog: json.contents,
            totalCount: json.totalCount,
        },
    };
};
export default Blog;
