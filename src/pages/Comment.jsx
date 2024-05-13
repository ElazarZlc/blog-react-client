export default function Comment({ comment }) {
  const myDate = (date) => {
    const today = new Date();
    if (today.getDate() == date.getDate()) {
      return "Today";
    }
    if (today.getDate() - 1 == date.getDate()) {
      return "Yesterday";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return day + "/" + month + "/" + date.getFullYear();
  };

  return (
    <li
      style={{marginRight:"20%", marginLeft:"20%", marginTop:"50px", backgroundColor: "grey"}}
    >
      <h3 
        
      >
        {comment.name}
      </h3>
      <h5

      >
        {comment.data}
      </h5>
      <p className="float-end">{myDate(new Date(comment.createdAt))}</p>
    </li>
  );
}
