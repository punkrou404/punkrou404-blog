import { NextApiRequest, NextApiResponse } from 'next';
import { selectBlogById } from '~/pages/api/blog/select_blog_by_id';
import { findAllBlog } from '~/pages/api/blog/find_all_blog';
import { findBlogByOffset } from '~/pages/api/blog/find_blog_by_offset';
import { findBlogByKeyword } from './find_blog_by_keyword';
import { BlogError } from '~/pages/api/types';

const Blog = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (1 < Object.keys(req.query).length) {
            throw {
                status: 400,
                message: `Bad Request. QUERY PARAMETER cannot be set more than once.`,
            } as BlogError;
        }

        if (req.query.id) {
            const result = await selectBlogById({ id: req.query.id });
            return res.status(200).json(result);
        }

        if (req.query.offset) {
            const result = await findBlogByOffset({ offset: req.query.offset });
            return res.status(200).json(result);
        }

        if (req.query.keyword) {
            const result = await findBlogByKeyword({ keyword: req.query.keyword });
            return res.status(200).json(result);
        }

        const result = await findAllBlog();
        return res.status(200).json(result);
    } catch (e) {
        res.status(e.status).json(e.message);
    }
};

export default Blog;
