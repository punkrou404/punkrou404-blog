import { MICROCMS_POST_HEADER } from '~/lib/const';
import { BlogError } from '~/pages/api/types';

interface InputPostContact {
    name: string;
    email: string | undefined;
    body: string;
}

export const postContact = async ({ name, email, body }: InputPostContact): Promise<void> => {
    console.log(`[postContact] start`);
    console.log(`[postContact] HTTP-Body parameter validation start`);

    if (!name) {
        throw {
            status: 400,
            message: `Bad Request. "name" is required.`,
        } as BlogError;
    }
    // if (!email) {
    //     throw {
    //         status: 400,
    //         message: `Bad Request. "email" is required.`,
    //     } as BlogError;
    // }
    if (!body) {
        throw {
            status: 400,
            message: `Bad Request. "body" is required.`,
        } as BlogError;
    }

    console.log(`[postContact] Query parameter validation end`);
    console.log(`[postContact]External API access start`);

    const urls = `${process.env.MICROCMS_BASEURL}/contact`;
    try {
        await fetch(urls, {
            method: 'POST',
            headers: MICROCMS_POST_HEADER,
            body: JSON.stringify(body),
        });
    } catch {
        throw {
            status: 500,
            message: `Server error.`,
        } as BlogError;
    }

    console.log(`[postContact]External API access end`);
    console.log(`[postContact] end`);
};
