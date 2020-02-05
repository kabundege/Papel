const signup = () => {
  return (document.location.href = "../html/signup.html");
};
const signin = () => {
  const username = document.querySelector("#uname").value;
  const password = document.querySelector("#pswd").value;
  if (username == "admin" && password == "123") {
    document.location.href = "../html/admin.html";
  } else if (username == "staff" && password == "123") {
    document.location.href = "../html/staff.html";
  } else if (username == "user" && password == "123") {
    document.location.href = "../html/user.html";
  } else {
    alert("User Not Found");
  }
};
