import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { json } from "stream/consumers";

export async function GET(context) {
  const blog = await getCollection('posts');

  const jsonData = [{ 
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      summary: post.data?.summary,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/posts/${post.slug}/`,
    })),
  }];

  return new Response(
    JSON.stringify(jsonData),  {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}