const signup = () => {
  return (document.location.href = "./UI/html/signup.html");
};

const signin  = async () => {  
  const username = document.querySelector("#uname").value;
  const password = document.querySelector("#pswd").value;

  const payload = {
    email: username,
    password: password
  }
  const res = await fetch('http://localhost:1999/api/v1/auth/signin',{
    method: 'POST', 
    headers: {
      Accepted:'appication/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
  })
  const data = await res.json()
  console.log(data)
  data.status != 200 ? document.querySelector('#error').innerHTML = data.error : document.location.href = './UI/html/dashboard.html'
}