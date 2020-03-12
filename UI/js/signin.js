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
  const res =  
  const data = await res.json()
  console.log(data)
  data.status != 200 ? document.querySelector('#error').innerHTML = data.error : document.location.href = './UI/html/dashboard.html'
}