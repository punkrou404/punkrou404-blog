/**
 * public environment valiables
 */
console.log(`[PUBLIC ENVIRONMENT VALIABLES READING START]`);

const SAUNNER_ID = process.env.NEXT_PUBLIC_SAUNNER_ID;
const HANDLE_NAME = process.env.NEXT_PUBLIC_HANDLE_NAME;
const MY_FIRST_NAME = process.env.NEXT_PUBLIC_MY_FIRST_NAME;
const MY_LAST_NAME = process.env.NEXT_PUBLIC_MY_LAST_NAME;
console.log(`[ENV]      SAUNNER_ID: ${SAUNNER_ID}`);
console.log(`[ENV]     HANDLE_NAME: ${HANDLE_NAME}`);
console.log(`[ENV]   MY_FIRST_NAME: ${MY_FIRST_NAME}`);
console.log(`[ENV]    MY_LAST_NAME: ${MY_LAST_NAME}`);
export { HANDLE_NAME, MY_FIRST_NAME, MY_LAST_NAME };

console.log(`[PUBLIC ENVIRONMENT VALIABLES READING END]`);

/**
 * private environment valiables
 */
console.log(`[PRIVATE ENVIRONMENT VALIABLES READING END]`);

const NODE_ENV = process.env.NODE_ENV;
const MYDOMAIN = process.env.MYDOMAIN;
const GET_KEY = process.env.MICROCMS_ACCESS_KEY;
const POST_KEY = process.env.MICROCMS_WHITE_ACCESS_KEY;
const MICROCMS_BASEURL = process.env.MICROCMS_BASEURL;
const EXISTS = NODE_ENV || MYDOMAIN || GET_KEY || POST_KEY || MICROCMS_BASEURL;
if (!EXISTS) {
    console.log(`no reading.`);
} else {
    console.log(`reading successful.`);
    console.log(`[ENV]        NODE_ENV: ${NODE_ENV}`);
    console.log(`[ENV]        MYDOMAIN: ${MYDOMAIN}`);
    console.log(`[ENV]         GET_KEY: ${GET_KEY}`);
    console.log(`[ENV]        POST_KEY: ${POST_KEY}`);
    console.log(`[ENV]MICROCMS_BASEURL: ${MICROCMS_BASEURL}`);
}
export { MICROCMS_BASEURL };

console.log(`[PRIVATE ENVIRONMENT VALIABLES READING END]`);

/**
 * link url
 */
console.log(`[LINKS READING START]`);

const GITHUB_URL = `https://github.com/${HANDLE_NAME}` as const;
const TWITTER_URL = `https://twitter.com/${HANDLE_NAME}` as const;
const SAUNA_IKITAI_URL = `https://sauna-ikitai.com/saunners/${SAUNNER_ID}` as const;
const GITHUB_GRASS_URL = `https://grass-graph.moshimo.works/images/${HANDLE_NAME}.png?rotate=90` as const;
console.log(`[LINK]      GITHUB_URL: ${GITHUB_URL}`);
console.log(`[LINK]     TWITTER_URL: ${TWITTER_URL}`);
console.log(`[LINK]SAUNA_IKITAI_URL: ${SAUNA_IKITAI_URL}`);
console.log(`[LINK]GITHUB_GRASS_URL: ${MY_LAST_NAME}`);
export { GITHUB_URL, TWITTER_URL, SAUNA_IKITAI_URL, GITHUB_GRASS_URL };

console.log(`[LINKS READING END]`);

/**
 * else const
 */
console.log(`[ELSE CONST SETTING START]`);

const IS_DEVELOP = (NODE_ENV === 'development') as boolean;
const PER_PAGE = 5 as const;
const MAX_PAGE = 5 as const;
const ISR_TIME = 3600 as const;
const MY_ORIGIN = IS_DEVELOP ? `http://${MYDOMAIN}` : `https://${MYDOMAIN}`;
console.log(`[VALUE]IS_DEVELOP: ${String(IS_DEVELOP)}`);
console.log(`[VALUE]  PER_PAGE: ${String(PER_PAGE)}`);
console.log(`[VALUE]  MAX_PAGE: ${String(MAX_PAGE)}`);
console.log(`[VALUE]  ISR_TIME: ${String(ISR_TIME)}`);
console.log(`[VALUE] MY_ORIGIN: ${MY_ORIGIN}`);
export { IS_DEVELOP, PER_PAGE, MAX_PAGE, ISR_TIME, MY_ORIGIN };

console.log(`[ELSE CONST SETTING END]`);

/** microcms http get header */
type MicrocmsHTTPGETHeader = {
    headers: {
        'X-API-KEY': string;
    };
};
export const MICROCMS_GET_HEADER = {
    headers: { 'X-API-KEY': GET_KEY },
} as MicrocmsHTTPGETHeader;

/** microcms http post header */
type MicrocmsHTTPPOSTHeader = {
    'Content-Type': string;
    'X-WRITE-API-KEY': string;
};
export const MICROCMS_POST_HEADER = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-WRITE-API-KEY': POST_KEY,
} as MicrocmsHTTPPOSTHeader;
