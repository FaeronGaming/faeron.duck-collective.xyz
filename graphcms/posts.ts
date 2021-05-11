import { fetchApi } from './fetch';

export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  coverImage: {
    url: string;
  };
  author: {
    name: string;
    picture: {
      url: string;
    };
  };
};

export type PostsResponse = {
  posts: Array<Post>;
};

export const latestPostQuery = `{
  posts(orderBy: date_DESC, first: 1) {
    title
    slug
    excerpt
    date
    coverImage {
      url(transformation: {
        image: {
          resize: {
            fit:crop,
            width:2000
            height:1000
          }
        }
      })
    }
    author {
      name
      picture {
        url(transformation: {
          image: {
            resize: {
              width:100
              height:100
              fit:crop
            }
          }
        })
      }
    }
  }
}`;

export async function getLatestPost(): Promise<Post[]> {
  const data = await fetchApi<PostsResponse>(latestPostQuery);
  return data.posts;
}
