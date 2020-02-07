const logout = () => {
    return (document.location.href = "../index.html");
}
const remove = (id) => {
    console.log(id)
    document.querySelector(`.${id}`).innerHTML = '';
    document.querySelector(`.${id}`).style="background:transparent";
}