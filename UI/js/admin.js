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
    newDiv.innerHTML = olddiv;
    const close = document.createElement('p')
    close.setAttribute('id','para')
    close.innerHTML = 'X'
    close.setAttribute('onclick',`closer()`)
    newDiv.appendChild(close)
    newDiv.setAttribute('id','pop')
    document.querySelector('.container').style='display:none'
    document.body.appendChild(newDiv)
}

const closer = (id)=>{
    document.querySelector('#pop').remove();
    document.querySelector('.container').style="display:flex"
}