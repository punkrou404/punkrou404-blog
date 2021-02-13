import marked from 'marked';
import highlightjs from 'highlight.js';
import matter from 'gray-matter';
import { NextApiRequest, NextApiResponse } from 'next';

const getProfile = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    console.log(`getProfile start`);
    const key = {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    };

    const result = await fetch(`${process.env.MICROCMS_BASEURL}/profile`, key);
    const body = await result.json();
    const matterResult = matter(body.contents[0].body);

    marked.setOptions({
        highlight: (code, lang) => highlightjs.highlightAuto(code, [lang]).value,
        pedantic: false,
        gfm: true,
        breaks: true,
        silent: false,
    });
    const contentHtml = marked(matterResult.content);
    res.status(200).json({ message: contentHtml });
};

export default getProfile;
