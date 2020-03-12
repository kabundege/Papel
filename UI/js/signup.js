const signin = () =>{
    return (document.location.href = "../../index.html");
} 
const dash = async () =>{  
    const firstname = document.querySelector("#FN").value;
    const lastname = document.querySelector("#LN").value;
    const username = document.querySelector("#EM").value;
    const password = document.querySelector("#PS").value;
    const confirm = document.querySelector("#CPS").value;
  
    const payload = {
        firstName:firstname,
        lastName:lastname,
        email: username,
        password: password,
        confirmPassword:confirm
    }
    const res = await fetch('http://localhost:1999/api/v1/auth/signup',{
      method: 'POST', 
      headers: {
        Accepted:'appication/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    const data = await res.json()
    data.status != 201 ? document.querySelector('#error').innerHTML = data.error : document.location.href = '../../index.html'
  }

const remove = (id) => {
    return (document.querySelector(`#${id}`).remove) 
}