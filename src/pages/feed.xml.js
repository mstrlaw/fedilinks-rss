import rss from '@astrojs/rss';

const limit = 50;

export async function GET() {
  const { links } = await fetch(
    `https://fedilinks.sinacosa.com/v2/links?limit=${limit}&offset=${limit}`
  ).then((response) => response.json());

  const items = links.map((link) => ({
    title: link.title,
    pubDate: link.published_at || link.created_at,
    description: link.description,
    language: link.language,
    enclosure: {
      url: link.image,
      length: 0,
      type: 'image/jpg',
    },
    author: link.author_name,
    link: link.url,
  }));

  return rss({
    title: 'Fedilink RSS Feed',
    description: `Latest ${limit} trending links`,
    site: 'https://fedilinks.com',
    items,
  });
}
