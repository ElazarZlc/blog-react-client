import { useQuery, useQueryClient } from "@tanstack/react-query";
import aboutBgImage from "../assets/img/about-bg.jpg";
import axios from "axios";

export default function GetAPost({id}) {
   

    const {
      data: post,
      isLoading: postIsLoading,
      isError: postIsError,
      error: postError,
    } = useQuery({
      queryKey: ["singlePost", id],
      queryFn: () => axios(`http://localhost:8081/posts/${id}`).then((res) => res.data),
    });

    if (postIsLoading) {
        return <div>Loading...</div>;
      }

      if (postIsError) {
        console.log(postError || commentsError);
        return <div>Error!</div>;
      }
    
    return(
        <>
        <header
        className=""
        style={{
          backgroundImage: `url(${aboutBgImage})`,
          backgroundPosition: "center",
          height: "500px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container position-relative text-center ">
          <h1 className="header-h1 fw-bold py-3">{post.title}</h1>
          <span className="fs-4">{post.description}</span>
        </div>
      </header>
      <div className="p-3" style={{ background: "lightBlue", marginTop: "-50px" }}>
        {post.data}
      </div>
      </>
    )
}