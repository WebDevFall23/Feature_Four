import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

export const createPost = (newPost, plant) => {
    console.log(newPost);
    const Post = Parse.Object.extend("Post");
  
    const post = new Post();
  
    post.set("Content", newPost.content);
    post.set("Plant", newPost.plant);
    post.set("Poster", newPost.poster);
    post.set("Title", newPost.title);
  
    return post.save().then((result) => {
      // Print the result's name to console log
      // returns new Plant object
      return result;
    });
  };

// READ operation - get plant by ID
export const getPostById = async (plantId) => {
  try {
    const Plant = Parse.Object.extend("Plant");
    const plantQuery = new Parse.Query(Plant);
    plantQuery.equalTo("objectId", plantId);

    const plant = await plantQuery.first();

    if (!plant) {
      throw new Error("Plant not found");
    }

    const Post = Parse.Object.extend("Post");
    const postQuery = new Parse.Query(Post);
    postQuery.equalTo("Plant", plant);

    const posts = await postQuery.find();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// READ operation - get all plants in Parse class Plant
export const getAllPosts = () => {
  const Post = Parse.Object.extend("Post");
  const query = new Parse.Query(Post);
  return query.find().then((results) => {
    // returns array of Plant objects
    return results;
  });
};

// DELETE operation - remove plant by ID
export const removePost = (id) => {
  const Post = Parse.Object.extend("Post");
  const query = new Parse.Query(Post);
  return query.get(id).then((post) => {
    post.destroy();
  });
};
