import { NextApiRequest, NextApiResponse } from 'next';
import { getLatestPost, Post } from '../../../graphcms/posts';

export default async function latestBlogPost(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
): Promise<void> {
  const posts = await getLatestPost();
  res.status(200).json(posts);
}
