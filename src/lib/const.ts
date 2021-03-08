export const PER_PAGE = 5 as const;
export const MAX_PAGE = 5 as const;
export const ISR_TIME = 3600 as const;
export const NODE_ENV = process.env.NODE_ENV;
export const IS_DEVELOP = (NODE_ENV === 'development') as boolean;

console.log(`Current environmental : ${NODE_ENV}`);
export const MY_ORIGIN = IS_DEVELOP
    ? `http://${process.env.MYDOMAIN}`
    : `https://${process.env.MYDOMAIN}`;
console.log(`MY_ORIGIN: ${MY_ORIGIN}`);

export const MICROCMS_BASEURL = process.env.MICROCMS_BASEURL;
console.log(`MICROCMS_BASEURL: ${MICROCMS_BASEURL}`);

/** microcms http get header(api-key) */
type MicrocmsHTTPGETHeader = {
    headers: {
        'X-API-KEY': string;
    };
};
const GET_KEY = process.env.MICROCMS_ACCESS_KEY;
export const MICROCMS_GET_HEADER = {
    headers: { 'X-API-KEY': GET_KEY },
} as MicrocmsHTTPGETHeader;

/** microcms http post header */
type MicrocmsHTTPPOSTHeader = {
    'Content-Type': string;
    'X-WRITE-API-KEY': string;
};
const POST_KEY = process.env.MICROCMS_WHITE_ACCESS_KEY;
export const MICROCMS_POST_HEADER = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-WRITE-API-KEY': POST_KEY,
} as MicrocmsHTTPPOSTHeader;
