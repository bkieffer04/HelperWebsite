
document.getElementById('Login_Submit').onclick=checkCredentials;

function checkCredentials(){
   let userName_check = document.getElementById('Username').value;
   if(userName_check === "Kaelynne78704Nelson2111"){
    let password_Check = document.getElementById('password').value;
    if(password_Check === "Brian0408Loves2111You"){
     window.open("src/mainpage.html");
    }
    else{
       console.log("You suck bitch")
    }
   }
   else{
      console.log("booooo")
   }
}