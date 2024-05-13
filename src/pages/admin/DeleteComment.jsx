import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeleteComment ({id}){


    const queryClient = useQueryClient();

    const { name } = useParams();

    const handleDel = async () => {
            try {
              const response = await axios.delete(`http://localhost:8081/admin/${name}/comments/${id}`);
              if (response.status === 204) {
                queryClient.invalidateQueries("allComments");
              } else {
                console.error('Error deleting post:', response.data);
              }
            } catch (error) {
              console.error('Error deleting post:', error);
            }
          };
    
    return(
        <button style={{backgroundColor: "red"}} onClick={handleDel}>Delete comment</button>
    )
}