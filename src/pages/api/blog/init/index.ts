import { NextApiRequest, NextApiResponse } from 'next';
import { initialize } from '~/pages/api/blog/init/initialize';

const BlogInit = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const result = await initialize();
        return res.status(200).json(result);
    } catch (e) {
        res.status(e.status).json(e.message);
    }
};

export default BlogInit;
