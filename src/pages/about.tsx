import IconLink from '~/components/icon-link';
import { NextPage } from 'next';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import MarkdownPreview from '~/components/markdown-preview';
import { getProfile } from '~/lib/posts';

const About: NextPage<{
    postData: string;
}> = ({ postData }) => {
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
            <section className="">
                <div className="py-5">{/* padding area */}</div>
                <div className="w-32 h-32">
                    <img src="profile.png" />
                </div>
                <div className="">
                    <div className="font-semibold text-xl py-2">Sato Kotaro</div>
                    <div className="font-semibold text-l py-2">@punkrou404 (@happyhotlife)</div>
                    <div className="">
                        <nav className="flex justify-evenly w-full py-2">
                            <IconLink
                                href="https://github.com/punkrou404"
                                data="/images/logo/github.logo.svg"
                            />
                            <IconLink
                                href="https://twitter.com/punkrou404"
                                data="/images/logo/twitter.logo.svg"
                            />
                            <IconLink
                                href="https://qiita.com/punkrou404"
                                data="/images/logo/qiita.logo.svg"
                            />
                            <IconLink
                                href="https://zenn.dev/punkrou404"
                                data="/images/logo/zenn.logo.svg"
                            />
                            <IconLink
                                href="https://sauna-ikitai.com/saunners/26885"
                                data="/images/logo/sauna-ikitai.logo.svg"
                            />
                        </nav>
                    </div>
                </div>
                <div className="py-5">{/* padding area */}</div>
                <div className="font-semibold text-m text-gray-400 pt-6">
                    <MarkdownPreview content={postData} />
                </div>
            </section>
        </>
    );
};

const getStaticProps = async (): Promise<{
    props: {
        postData: string;
    };
}> => {
    const postData = await getProfile();
    return {
        props: {
            postData,
        },
    };
};

export default About;
export { getStaticProps };
