import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import backgroundImage from "../assets/img/home-bg.jpg";
import Post from "./Post";
import { NavLink } from "react-router-dom";

export default function Home() {
  const posts = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => axios("http://localhost:8081/posts").then((res) => res.data),
  });
  if (posts.isLoading) {
    return <div>Loading...</div>;
  }
  if (posts.isError) {
    return <div>Error!</div>;
  }
  return (
    <div>
    <NavLink to={"/admin"} style={{backgroundColor: "lightblue", marginLeft: "4px"}}>LogIn</NavLink>
      <header
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          height: "500px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container position-relative text-center ">
          <h1 className="header-h1 fw-bold py-3">All of my Blogs</h1>
          <span className="fs-4">
            This is what I do. If you blog it we blog it.
          </span>
        </div>
      </header>

      <ul
        className="list-group list-group-flush container px-5 my-5
"
      >
        <>
          {posts.data.slice().reverse().map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </>
      </ul>
      <footer className="border-top text-center pt-5 pb-3 bg-light">
        <p>Copyright © Java Project {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}


