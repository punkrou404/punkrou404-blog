import { GetServerSidePropsContext } from 'next';
import { MY_ORIGIN, NODE_ENV_DEV } from '~/lib/const';

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
    if (process.env.NODE_ENV === NODE_ENV_DEV) {
        return `User-agent: *
Disallow: /`;
    } else {
        return `User-agent: *
Allow: /
Sitemap: ${MY_ORIGIN}/sitemap.xml`;
    }
};

const Robots = (): null => null;
export default Robots;
