import marked from 'marked';
import highlightjs from 'highlight.js';
import matter from 'gray-matter';
import { MICROCMS_GET_HEADER } from '~/lib/const';

export const getProfile = async () => {
    console.log(`[getProfile] start`);

    const url = `${process.env.MICROCMS_BASEURL}/profile`;
    console.log(`[getProfile] url=${url}`);
    const result = await fetch(url, MICROCMS_GET_HEADER);
    const body = await result.json();
    const matterResult = matter(body.contents[0].body);
    marked.setOptions({
        highlight: (code, lang) => highlightjs.highlightAuto(code, [lang]).value,
        pedantic: false,
        gfm: true,
        breaks: true,
        silent: false,
    });
    const profile = marked(matterResult.content);

    console.log(`[getProfile] end`);
    return profile;
};
