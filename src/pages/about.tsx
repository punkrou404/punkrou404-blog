import IconLink from '~/components/icon-link';
import { NextPage } from 'next';
import { useBreadcrumb } from '~/lib/use-breadcrumb';

const About: NextPage = () => {
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
            <section className="grid grid-cols-6 gap-4 justify-center items-center">
                <div className="col-start-1 col-span-6 h-full ">{/*padding area.*/}</div>
                <div className="col-start-3 col-span-1 place-self-center">
                    <img src="profile.png" />
                </div>
                <div className="flex-col col-start-4 col-span-1 place-self-center">
                    <div className="font-semibold text-xl">Sato Kotaro</div>
                    <div className="font-semibold text-l">@punkrou404</div>
                    <div className="font-semibold text-m text-gray-400 pt-6">
                        frontend, backend, infrastructure, sauna, and more...
                    </div>
                </div>
                <div className="col-start-3 col-span-2 h-full">
                    <nav className="flex w-full h-full">
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
                <div className="col-start-1 col-span-6">{/*padding area.*/}</div>
            </section>
        </>
    );
};

export default About;
