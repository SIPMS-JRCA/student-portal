function signUp(){

    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    if(username === "" || password === ""){
        alert("Please fill in all fields.");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Account created successfully!");

    window.location.href = "login.html";
}

function login(){

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if(username === savedUser && password === savedPass){
        window.location.href = "dashboard.html";
    }else{
        alert("Incorrect username or password.");
    }
}

function logout(){

    window.location.href = "index.html";

}