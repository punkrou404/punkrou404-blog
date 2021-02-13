import { NextApiRequest, NextApiResponse } from 'next';
import { id } from '~/pages/api/blog/id';
import { blog } from '~/pages/api/blog/blog';
import { offset } from '~/pages/api/blog/offset';

const Blog = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (req.query.id) {
            const result = await id(req.query.id);
            return res.status(200).json(result);
        }

        if (req.query.offset) {
            const result = await offset(req.query.offset);
            return res.status(200).json(result);
        }

        const result = await blog();
        return res.status(200).json(result);
    } catch (e) {
        res.status(e.status).json(e.message);
    }
};

export default Blog;
