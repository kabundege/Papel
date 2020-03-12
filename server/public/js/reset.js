const mailer  = async () => {  
    const email = document.querySelector("#EM").value;
  
    const payload = {
      email: email
    }
    const res = await fetch('http://localhost:1999/api/v1/auth/email',{
      method: 'POST', 
      headers: {
        Accepted:'appication/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    const data = await res.json()
    console.log(data)
    data.status != 200 ? document.querySelector('#error').innerHTML = data.error : document.querySelector('#error').innerHTML = data.message
}

const reset  = async () => {  
  const password = document.querySelector("#PS").value;
  const confirmPassword = document.querySelector("#CPS").value;

  const url  = document.URL;

  const newUrl = url.split("")

  let k=0;

  newUrl.forEach(el => {
     if(el=='t'||el=='o'||el=='k'||el=='e'||el=='n'){
       k++
     }else{
       k=0;
     }
    if(k==5){
      let index = newUrl.indexOf(el)
      return newUrl.splice(0,index+2)
    }
  });

  const token = newUrl.join("")

  const payload = {
    password: password,
    confirmPassword: confirmPassword
  }

  const res = await fetch(`http://localhost:1999/api/v1/auth/reset`,{
    method: 'PATCH', 
    headers: {
      "token":`${token}`,
      Accepted:'appication/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
  })
  const data = await res.json()
  console.log(data)
  data.status != 200 ? document.querySelector('#error').innerHTML = data.error : document.querySelector('#error').innerHTML = data.message
}