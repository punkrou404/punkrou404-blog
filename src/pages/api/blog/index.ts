import { NextApiRequest, NextApiResponse } from 'next';
import { selectBlogById } from '~/pages/api/blog/select_blog_by_id';
import { findAllBlog } from '~/pages/api/blog/find_all_blog';
import { findBlogByOffset } from '~/pages/api/blog/find_blog_by_offset';

const Blog = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (req.query.id) {
            const result = await selectBlogById({ id: req.query.id });
            return res.status(200).json(result);
        }

        if (req.query.offset) {
            const result = await findBlogByOffset({ offset: req.query.offset });
            return res.status(200).json(result);
        }

        const result = await findAllBlog();
        return res.status(200).json(result);
    } catch (e) {
        res.status(e.status).json(e.message);
    }
};

export default Blog;
