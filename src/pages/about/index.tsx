import { NextPage } from 'next';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import MarkdownPreview from '~/components/markdown-preview';
import React from 'react';
import PageHead from '~/components/page-head';
import { getProfile } from '~/api/profile/get_profile';
import { ISR_TIME } from '~/lib/const';
import { CardOutside } from '~/components/card-outside';

const About: NextPage<{
    profile: string;
}> = ({ profile }): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'About',
        },
    ]);

    return (
        <>
            <PageHead
                subtitle={`About page`}
                description={`About page`}
                image={``}
                url={``}
            ></PageHead>
            <CardOutside action={false}>
                <section className="">
                    <div className="py-5">{/* padding area */}</div>
                    <div className="font-semibold text-m text-gray-400 pt-6">
                        <MarkdownPreview content={profile} />
                    </div>
                </section>
            </CardOutside>
        </>
    );
};

export const getStaticProps = async (): Promise<{
    props: {
        profile: string;
    };
    revalidate: number;
}> => {
    const profile = await getProfile();
    return {
        props: {
            profile,
        },
        revalidate: ISR_TIME,
    };
};

export default About;
