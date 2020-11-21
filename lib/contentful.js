import axios from "axios";
const API_BASE_URL = process.env.API_BASE_URL;
const API_SPACE_ID = process.env.API_SPACE_ID;
const API_TOKEN = process.env.API_TOKEN;
const API_BLOG_POST_TYPE_ID = process.env.API_BLOG_POST_TYPE_ID;

export async function getContentfulAll() {
  const request = await axios.get(
    `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=${API_BLOG_POST_TYPE_ID}`
  );
  const all = [];
  request.data.items.map((item) => {
    all.push(item);
  });
  return all;
}

export async function getContentfulAllPostsData(id) {
  const request = await axios.get(
    `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=blogPost`
  );
  const post = request.data.items.find((item) => {
    return item.sys.id === id;
  });
  if (post) {
    return { post };
  }
}

export async function getContentfulAllPostsIds() {
  const request = await axios.get(
    `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=blogPost`
  );
  //   console.log(request);
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  //   const ids = [];
  //   request.data.items.map((item) => {
  //     ids.push({
  //       params: {
  //         id: item.sys.id,
  //       },
  //     });
  //   });
  //   return ids;

  return request.data.items.map((item) => {
    return {
      params: {
        id: item.sys.id,
      },
    };
  });
}
