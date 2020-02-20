const logout = () => {
  return (document.location.href = "../../index.html");
};

const remove = id => {
  document.querySelector(`.${id}`).innerHTML = "";
  document.querySelector(`.${id}`).style = "background:transparent";
};

const makesure = () =>{
  if(confirm('Are you Sure')){
    alert('its Done')
  }else{
    alert('Abort Successful')
  }
}
const create = id => {
  const newDiv = document.createElement("div");
  const olddiv = document.querySelector(`.${id}`).innerHTML;
  newDiv.innerHTML = olddiv;
  const close = document.createElement("p");
  close.setAttribute("id", "para");
  close.innerHTML = "X";
  close.setAttribute("onclick", `closer()`);
  newDiv.appendChild(close);
  newDiv.setAttribute("id", "pop");
  document.querySelector(".container").style = "display:none";
  document.body.appendChild(newDiv);
};

const closer = id => {
  document.querySelector("#pop").remove();
  document.querySelector(".container").style = "display:flex";
};
const activate = id => {
    document.querySelector(`[name=${id}]`).innerHTML="Acc Activated";
    document.querySelector(`[${id}]`).removeAttribute('class')
    document.querySelector(`[${id}]`).removeAttribute('onclick')
    document.querySelector(`[${id}]`).setAttribute('class','fas fa-user-slash')
    document.querySelector(`[${id}]`).setAttribute('onclick','deactivate(this.id)')
};

const deactivate = id => {
    document.querySelector(`[name=${id}]`).innerHTML="Acc Deactivated";
    document.querySelector(`[${id}]`).removeAttribute('class')
    document.querySelector(`[${id}]`).removeAttribute('onclick')
    document.querySelector(`[${id}]`).setAttribute('class','fas fa-user')
    document.querySelector(`[${id}]`).setAttribute('onclick','activate(this.id)')
};

const staff = id =>{
    document.querySelector(`[name=${id}]`).innerHTML = 'Staff Acc'
}
const admin = id =>{
    document.querySelector(`[name=${id}]`).innerHTML = 'Admin Acc'
}