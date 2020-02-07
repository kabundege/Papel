const signin = () =>{
    return (document.location.href = "../index.html");
} 
const dash = () =>{
    return (document.location.href = "../html/dashboard.html");
}
const delete = (id) => {
    return (document.querySelector(`#${id}`).remove)
}