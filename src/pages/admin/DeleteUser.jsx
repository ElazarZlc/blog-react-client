import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeleteUser ({id}){


    const queryClient = useQueryClient();

    const { name } = useParams();

    const handleDel = async () => {
            try {
              const response = await axios.delete(`http://localhost:8081/admin/${name}/users/${id}`);
              if (response.status === 204) {
                queryClient.invalidateQueries("allComments");
              } else {
                console.error('Error deleting user:', response.data);
              }
            } catch (error) {
              console.error('Error deleting user:', error);
            }
          };
    
    return(
        <button style={{backgroundColor: "red"}} onClick={handleDel}>Delete user</button>
    )
}