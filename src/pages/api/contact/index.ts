import { NextApiResponse, NextApiRequest } from 'next';

const postContact = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    console.log(`[postContact] start`);
    console.log(`[postContact] HTTP-Body parameter validation start`);

    const body = req.body;
    if (!body.name) {
        return res.status(400).json({ message: `Bad Request. "name" is required.` });
    }
    if (!body.email) {
        return res.status(400).json({ message: `Bad Request. "email" is required.` });
    }
    if (!body.body) {
        return res.status(400).json({ message: `Bad Request. "body" is required.` });
    }

    console.log(`[postContact] Query parameter validation end`);
    console.log(`[postContact]External API access start`);

    const urls = `${process.env.MICROCMS_BASEURL}/contact`;
    const content = await fetch(urls, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-WRITE-API-KEY': process.env.microcms_white_access_key,
        },
        body: JSON.stringify(body),
    })
        .then(() => 'Created')
        .catch(() => null);

    console.log(`[postContact]External API access end`);
    console.log(`[postContact]Response setting start`);

    if (content !== 'Created') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.status(200).json({ message: 'OK' });

    console.log(`[postContact]Response setting end`);
    console.log(`[postContact] end`);
};

export default postContact;
