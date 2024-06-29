import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('posts');
  return rss({
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      summary: post.data?.summary,
      link: `/blog/${post.slug}/`,
    })),
  });
}