const logout = () => {
    return (document.location.href = "../../index.html");
}

const remove = (id) => {
    document.querySelector(`.${id}`).innerHTML = '';
    document.querySelector(`.${id}`).style="background:transparent";
}

const create = (id) => {
    const newDiv = document.createElement('div')
    const olddiv = document.querySelector(`.${id}`).innerHTML
    newDiv.style="background:rgb(255,255,255,0.9);width:450px;height:300px;margin:-28% 0 0 35%;text-align:center;box-shadow: 0 8px 12px 0  rgba(0, 0, 0, 0.8), 0 10px 25px 0 rgba(0, 0, 0, 0.8)";
    newDiv.innerHTML = olddiv;
    const close = document.createElement('p')
    close.style="font-size:30px;cursor:pointer;float:right;padding:10px 20px;background:rgba(163, 163, 163, 0.904)"
    close.setAttribute('id','para')
    close.innerHTML = 'X'
    close.setAttribute('onclick',`closer('${id}')`)
    newDiv.appendChild(close)
    newDiv.setAttribute('id','pop')
    document.querySelector('.container').innerHTML='';
    document.querySelector('.container').style="background:rgb(0,0,0,0.5);"
    document.body.appendChild(newDiv)
}
const closer = (id)=>{
    console.log(id)
    if(id=="div1"||id=="div2"||id=="div3"){
         document.location.href="../html/dashboard.html"
    }else if(id=="div4"||id=="div5"||id=="div7"){
         document.location.href="../html/admin.html"
    }else{
        document.location.href="../html/staff.html"
    }
}