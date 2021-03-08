import { GetServerSidePropsContext } from 'next';
import { getAllContents } from '~/api/blog/get_all_contents';
import { MYDOMAIN } from '~/api/const';
import { Post } from '~/api/types';

export const getServerSideProps = async ({
    res,
}: GetServerSidePropsContext): Promise<{ props: {} }> => {
    const xml = await generateSitemapXml();

    res.statusCode = 200;
    // Cashed 24Hr.
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.setHeader('Content-Type', 'text/xml');
    res.end(xml);

    return {
        props: {},
    };
};

const generateSitemapXml = async (): Promise<string> => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const posts: Post[] = await getAllContents();
    posts.forEach((post: Post) => {
        xml += `
        <url>
          <loc>https://${MYDOMAIN}/blog/post/${post.id}</loc>
          <lastmod>${post.updatedAt}</lastmod>
          <changefreq>weekly</changefreq>
        </url>
      `;
    });

    xml += `</urlset>`;
    return xml;
};

const Sitemap = (): null => null;
export default Sitemap;
