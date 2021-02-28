import React from 'react';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import PostListElement from '~/components/post-list-element';
import PageHead from '~/components/page-head';
import { NextPageContext } from 'next';
import SearchInput from '~/components/search-input';
import { Post } from '~/api/types';
import { findBlogByKeyword } from '~/api/blog/find_blog_by_keyword';
import { CardOutside } from '~/components/card-outside';

type P = {
    contents: Post[];
    hitCount: number;
    keyword: string | string[];
};

const BlogSearch = ({ contents, hitCount, keyword }: P): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: `/blog/search?keyword=${keyword}`,
        },
        {
            id: 3,
            text: `"${String(keyword)}"`,
        },
    ]);

    return (
        <div>
            <PageHead
                subtitle={`Blog page. search for "${String(keyword)}"`}
                description={`Blog list`}
                image={``}
                url={``}
            />
            <CardOutside action={false}>
                <SearchInput />
            </CardOutside>
            <div className="text-blue-500">
                {`Blog page. search for "${String(keyword)}". ${hitCount} hits.`}
            </div>
            {contents.map((content) => (
                <PostListElement props={content} key={content.id} />
            ))}
        </div>
    );
};

export const getServerSideProps = async (params: NextPageContext) => {
    const { keyword } = params.query;
    const posts = await findBlogByKeyword(keyword);
    const { contents, hitCount } = posts;

    return {
        props: {
            contents,
            hitCount,
            keyword,
        },
    };
};

export default BlogSearch;
