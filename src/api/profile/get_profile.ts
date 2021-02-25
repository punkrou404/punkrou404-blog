import marked from 'marked';
import highlightjs from 'highlight.js';
import matter from 'gray-matter';
import { MICROCMS_GET_HEADER } from '~/lib/const';

export const getProfile = async () => {
    console.log(`[getProfile] start`);

    const result = await fetch(`${process.env.MICROCMS_BASEURL}/profile`, MICROCMS_GET_HEADER);
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
