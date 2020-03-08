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

  const payload = {
    password: password,
    confirmPassword: confirmPassword
  }
  const res = await fetch('http://localhost:1999/api/v1/auth/reset',{
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