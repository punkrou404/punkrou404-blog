import marked from 'marked';
import highlightjs from 'highlight.js';
import matter from 'gray-matter';

const getProfile = async (): Promise<string> => {
    const key = {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    };

    const res = await fetch(`${process.env.MICROCMS_BASEURL}/profile`, key);
    const body = await res.json();
    const matterResult = matter(body.contents[0].body);

    marked.setOptions({
        highlight: (code, lang) => highlightjs.highlightAuto(code, [lang]).value,
        pedantic: false,
        gfm: true,
        breaks: true,
        silent: false,
    });
    const contentHtml = marked(matterResult.content);
    return contentHtml;
};


export { getProfile };
