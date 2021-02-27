import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async ({
    res,
}: GetServerSidePropsContext): Promise<{ props: {} }> => {
    const robotsContent = getRobots();

    res.statusCode = 200;
    // Cashed 24Hr.
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.setHeader('Content-Type', 'text/plain');
    res.end(robotsContent);

    return {
        props: {},
    };
};

const getRobots = (): string => {
    if (process.env.ENV === 'PRODUCTION') {
        return `User-agent: *
Allow: /
Sitemap: ${process.env.MICROCMS_BASEURL}/sitemap.xml`;
    } else {
        return `User-agent: *
Disallow: /`;
    }
};

const Robots = (): null => null;
export default Robots;
