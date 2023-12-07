
import React, { useEffect, useState } from "react";
import {getPostById, createPost} from "../../Common/Services/PostService.js";
import {getById} from "../../Common/Services/PlantService.js";
import {useParams} from "react-router-dom"
import Parse from "parse";
import { Link } from "react-router-dom";
import PostForm from "./PostForm.js"
import NavBar from "../NavBar/NavBar"

const Plant = () => {
  const params = useParams();
  const currentUser = Parse.User.current();

  const [plant, setPlant] = useState(null); // or useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPlant = await getById(params.plantid);
        console.log(fetchedPlant);
        setPlant(fetchedPlant);
      } catch (error) {
        console.error("Error fetching plant:", error, params.plantid);
      }
    };

    fetchData();
  }, [params.plantid]);

// Retreive all the posts for the plant:
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPostById(params.plantid);
        console.log(fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [params.plantid]);
  // Set use state for new post
  const [post, setPost] = useState({
    title: "",
    content: "",
    plant: {
      __type: "Pointer",
      className: "Plant",
      objectId: params.plantid,
    },
    poster: {
      __type: "Pointer",
      className: "_User",
      objectId: currentUser?.id || 'OVh1wbZdbh',
    },
  });

  const handleChange = (e, field) => {
    setPost({
      ...post,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createPost(post);
      console.log("Post created:", result);
      // clear the form fields after the post is submitted
      setPost({
        title: "",
        content: "",
        plant: {
          __type: "Pointer",
          className: "Plant",
          objectId: params.plantid,
        },
        user: {
          __type: "Pointer",
          className: "_User",
          // The default user is guest@guest.com
          objectId: currentUser?.id || 'tnlhhlRPEK',
        },
      });
      // Optionally, you can redirect or perform other actions after successful creation
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h1>{plant?.get('name')}</h1>
      <h2>{plant?.get('description')}</h2>
      <h1>Create a Post</h1>
      <PostForm post={post} onChange={handleChange} onSubmit={handleSubmit} />

      <h1>Posts for {plant?.get('name')}</h1>

        {posts.map((post) => (
          <div key={post.id}>
            <h1>{post.get("Title")}</h1>
            <p>{post.get("Content")}</p>
          </div>  
        ))}
        <NavBar />
    </div>
    
  );
};


export default Plant;
