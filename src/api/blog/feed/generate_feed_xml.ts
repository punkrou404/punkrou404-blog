import RSS from 'rss';
import { Post } from '~/api/types';
import { getAllContents } from '../get_all_contents';

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

    const posts = await getAllContents();

    console.log(`[generateFeedXml] get feed end`);
    console.log(`[generateFeedXml] generate xml start`);

    posts.forEach((c: Post) => {
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
