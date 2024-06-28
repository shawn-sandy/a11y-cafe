import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { json } from "stream/consumers";

export async function GET(context) {
  const blog = await getCollection('posts');
  // return rss({
  //   title: 'Buzz’s Blog',
  //   description: 'A humble Astronaut’s guide to the stars',
  //   site: context.site,
  //   items: blog.map((post) => ({
  //     title: post.data.title,
  //     pubDate: post.data.pubDate,
  //     description: post.data.description,
  //     customData: post.data.customData,
  //     // Compute RSS link from post `slug`
  //     // This example assumes all posts are rendered as `/blog/[slug]` routes
  //     link: `/blog/${post.slug}/`,
  //   })),
  // });

  const jsonData = {
    title: 'Buzz’s Blog',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      summary: post.data?.summary,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/posts/${post.slug}/`,
    })),
  };

  return new Response(
    JSON.stringify(jsonData)
  )
}