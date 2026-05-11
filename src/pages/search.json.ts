import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('posts');

  const jsonData =  blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      summary: post.data?.summary,
      link: `/posts/${post.id}/`,
    }))
  ;

  return new Response(
    JSON.stringify(jsonData),  {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}
