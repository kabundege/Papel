const signup = () => {
  return (document.location.href = "./UI/html/signup.html");
};
const signin = () => {
  const username = document.querySelector("#uname").value;
  const password = document.querySelector("#pswd").value;
  if(!username.includes('@')&&!username.includes('.')){
    return alert("email of incorrect format")
  }
  if (username == "admin@gmail.com" && password == "123") {
    document.location.href = "./UI/html/admin.html";
  } else if (username == "staff@gmail.com" && password == "123") {
    document.location.href = "./UI/html/staff.html";
  } else if (username == "user@gmail.com" && password == "123") {
    document.location.href = "./UI/html/dashboard.html";
  } else {
    alert("User Not Found");
  }
};
