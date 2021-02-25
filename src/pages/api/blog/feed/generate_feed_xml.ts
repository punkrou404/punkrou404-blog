import RSS from 'rss';
import { Post } from '~/api/types';

const generateFeedXml = async (): Promise<string> => {
    console.log(`[generateFeedXml] start`);
    console.log(`[generateFeedXml] get feed start`);

    const feed = new RSS({
        title: 'タイトル',
        description: '説明',
        site_url: 'サイトのURL',
        feed_url: 'フィードページのURL',
        language: 'ja',
    });

    const res = await fetch(`${process.env.MYDOMAIN_BASEURL}/api/blog`, {
        method: 'GET',
    });
    const json = await res.json();

    console.log(`[generateFeedXml] get feed end`);
    console.log(`[generateFeedXml] generate xml start`);

    json.contents.forEach((c: Post) => {
        feed.item({
            title: c.title,
            description: c.summary,
            date: new Date(c.createdAt),
            url: `${process.env.MYDOMAIN_BASEURL}/blog/post/${c.id}`,
        });
    });
    const xml = feed.xml();

    console.log(`[generateFeedXml] generate xml end`);
    console.log(`[generateFeedXml] end`);
    return xml;
};

export default generateFeedXml;
