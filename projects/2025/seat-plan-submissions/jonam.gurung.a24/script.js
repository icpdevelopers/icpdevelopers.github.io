//Login
let login = document.getElementById("login");
let submit = document.getElementById("btn");
submit.onclick = function(){
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
    if(email == "jonam.gurung.a24@icp.edu.np" && password == "admin"){
        login.style.display = "none" ;
        document.getElementById("header").style.display = "block";
        document.getElementById("seatPlanSection").style.display = "block";
    }
}

//Search button
// let btn = document.getElementById("search");
// let count = 0;
// btn.onclick = function(){
//     let search = document.getElementById("londenMet").value;
//     let previous=document.getElementById(`${search}`);
//     if((search>=24042001 && search<=24042045) || (search>=24042051 && search<=24042070)){
//         if(count==0){
//             btn.innerHTML = "<a href=" +`#${search}`+">Search</a>";
//            previous.style.backgroundColor= "aqua";
//             count++;
//         }
//         else{
//             btn.innerHTML = "Search";
//             previous.style.backgroundColor = "white";
//             count=0;
//         }
        
//     }
    
//     else{
//         alert("Invalid LondonMet ID")
//     }
// }

let btn = document.getElementById("search");
let highlightedRow = null; // Track currently highlighted row

btn.onclick = function() {
    let search = document.getElementById("londenMet").value;
    let row = document.getElementById(search);

    // Check if ID is valid
    if ((search >= 24042001 && search <= 24042045) || (search >= 24042051 && search <= 24042070)) {
        // If a row is already highlighted, reset it
        if (highlightedRow) {
            highlightedRow.style.backgroundColor = "";
        }

        // If the same row is clicked again, just remove highlight
        if (highlightedRow === row) {
            highlightedRow = null;
            btn.textContent = "Search";
        } 
        // Otherwise, highlight the new row
        else {
            row.style.backgroundColor = "aqua";
            row.scrollIntoView({ behavior: "smooth", block: "center" });
            highlightedRow = row;
            btn.textContent = "Clear";
        }
    } else {
        alert("Invalid LondonMet ID!");
    }
};