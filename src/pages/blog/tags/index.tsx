import React from 'react';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import Card from '~/components/card';
import PageHead from '~/components/page-head';
import { NextPageContext } from 'next';
import SearchInput from '~/components/search-input';
import { Post } from '~/api/types';
import { findBlogByTag } from '~/api/blog/find_blog_by_tags';

type P = {
    contents: Post[];
    hitCount: number;
    tag: string | string[];
};

const BlogTags = ({ contents, hitCount, tag }: P): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: `/blog/tags?tag=${tag}`,
        },
        {
            id: 3,
            text: `"${String(tag)}"`,
        },
    ]);

    return (
        <div>
            <PageHead
                subtitle={`Blog page. tags for "${String(tag)}"`}
                description={`Blog list`}
                image={``}
                url={``}
            />
            <SearchInput />
            <div className="text-blue-500">
                {`Blog page. tags for "${String(tag)}". ${hitCount} hits.`}
            </div>
            {contents.map((content) => (
                <Card props={content} key={content.id} />
            ))}
        </div>
    );
};

export const getServerSideProps = async (params: NextPageContext) => {
    const { tag } = params.query;
    const posts = await findBlogByTag(String(tag));
    const { contents, hitCount } = posts;

    return {
        props: {
            contents,
            hitCount,
            tag,
        },
    };
};

export default BlogTags;
