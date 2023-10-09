function init(){

const whoIsItButton=document.getElementById("MoreLessButton")
console.log(whoIsItButton)
whoIsItButton.addEventListener("click",showMoreOrLess)
}

const showMoreOrLess = ()=>{
    const MoreLessButton=document.getElementById("MoreLessButton")
    const MoreLessButtonStatus =MoreLessButton.getAttribute("status")
    const whoIsIt=document.getElementById("whoIsIt")

    if (MoreLessButtonStatus=="inactive"){
        MoreLessButton.setAttribute("status","active")
        MoreLessButton.innerHTML=""
        MoreLessButton.innerHTML="Show Less"
        whoIsIt.style.display = "block";

    }
    if (MoreLessButtonStatus=="active"){
        MoreLessButton.setAttribute("status","inactive")
        MoreLessButton.innerHTML=""
        MoreLessButton.innerHTML="Show More"
        whoIsIt.style.display = "none";

    }
}
console.log("start")

init()