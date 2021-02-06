import { NextApiResponse, NextApiRequest } from 'next';

interface Contact {
    name: string;
    email: string;
    body: string;
}

const contact = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    // クエリとAPIキーのチェック
    if (!isContact(req.body)) {
        return res.status(404).end();
    }

    const content = await fetch(`${process.env.MICROCMS_BASEURL}/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-WRITE-API-KEY': process.env.microcms_white_access_key,
        },
        body: JSON.stringify(req.body),
    })
        .then(() => 'Created')
        .catch(() => null);

    // CMS側で正しく作成されたかチェック
    if (content !== 'Created') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(200).json({ message: 'OK' });
};

const isContact = (item: unknown): item is Contact => {
    const target = item as Contact;

    return (
        'name' in target &&
        typeof target.name === 'string' &&
        !!target.name &&
        'email' in target &&
        typeof target.email === 'string' &&
        !!target.email &&
        'body' in target &&
        typeof target.body === 'string' &&
        !!target.body
    );
};

export default contact;
