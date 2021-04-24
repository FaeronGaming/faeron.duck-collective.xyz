export type JsonResponse<T> = {
  data?: T,
  errors?: Array<{message: string}>
};

export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  coverImage: {
    url: string
  };
  author: {
    name: string;
    picture: {
      url: string;
    };
  };
};

export type PostsResponse = {
  posts: Array<Post>
};

async function fetchApi<T>(query: string, {variables}: {variables?: Record<string, any>} = {}) {
  const response = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GRAPHCMS_DEV_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const json : JsonResponse<T> = await response.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllPosts() {
  const data = await fetchApi<PostsResponse>(`{
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
  }`);
  return data.posts;
}
