import EditPost from "./CreatePost";

export default function EditButton({openEditForm, post, handleSetPost}){

    const handleEdit = () =>{
        openEditForm()
        handleSetPost(post)
        }
    return(
        <button style={{color:"yellow",backgroundColor: "blue"}} onClick={handleEdit}>Edit</button>
    )
}