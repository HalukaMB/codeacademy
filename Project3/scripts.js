let results_release = artist_answer_json["results"]

/* we get from the results all represented labels and arrays */
style_array = []
label_array = []
for (index = 0; index < artist_answer_json["results"].length; index++) {
    style_array.push(...results_release[index]["style"])
    let label_doubles = new Set(results_release[index]["label"])
    label_array.push(...label_doubles)
}

/* And thne we count the occurence of each value*/
function OccurenceOfPropertyCheck(array) {
    OccurenceObj = {}
    array.forEach(element => {
        if ((element != "Techno") & (element != "House")) {
            if (OccurenceObj[element]) {
                OccurenceObj[element] += 1
            } else {
                OccurenceObj[element] = 1
            }
        }
    });
    return OccurenceObj
}

let occurence_of_styles = OccurenceOfPropertyCheck(style_array)
let occurence_of_labels = OccurenceOfPropertyCheck(label_array)


function SortOccurenceArray(occurence_of_property) {
    let sortable_array = []
    for (let property in occurence_of_property) {
        sortable_array.push([property, occurence_of_property[property]])
    }
    sortable_array.sort(function (a, b) {
        return b[1] - a[1]
    })
    return sortable_array
}

let sortable_style = SortOccurenceArray(occurence_of_styles);
let sortable_labels = SortOccurenceArray(occurence_of_labels);


let styles_to_check_against = sortable_style.splice(0, 10)
console.log(styles_to_check_against)
listofstyles = []
for (let index = 0; index < styles_to_check_against.length; index++) {
    listofstyles.push(styles_to_check_against[index][0])
}
/* if master-id is not 0, there are multiple */
/* https://api.discogs.com/database/search?per_page=100&sort=year&key={}&secret={}&label=rekids */

console.log(labeljson_database_without_artist["results"])

recommendations_similar = []


for (let index = 0; index < labeljson_database_without_artist["results"].length; index++) {
    styles_of_release = labeljson_database_without_artist["results"][index]["style"]
    if (styles_of_release.some(r => listofstyles.includes(r)) & labeljson_database_without_artist["results"][index]["community"]["have"] > 50) {
        console.log("match")
        recommendations_similar.push(labeljson_database_without_artist["results"][index])
    }
}

let idOfArtistList = []
for (i = 0; i < labeljson_database_with_artist["results"].length; i++) {
    idOfArtistRelease = labeljson_database_with_artist["results"][i]["id"]
    idOfArtistList.push(idOfArtistRelease)
}

for (i = 0; i < recommendations_similar.length; i++) {
    if (idOfArtistList.includes(recommendations_similar[i].id)) {
        recommendations_similar[i]
    }
}



const filteredItems = recommendations_similar.filter(release => {
    console.log(release)
    let itemId = release.id
    let itemtype = release.type

    if ((!idOfArtistList.includes(itemId)) && itemtype == "release") {
        return release
    }
})
console.log(filteredItems)


const second_gallery = document.getElementById("carousel_ol-2")
let orderedListForSlides = document.createElement("ol")
orderedListForSlides.classList.add("carousel__viewport")



for (index = 0; index < filteredItems.length; index++) {
    let listEntry = document.createElement("li")
    listEntry.tabindex = "0"
    listEntry.id = "carousel__slide_2-" + String(index)
    listEntry.classList.add("carousel__slide")

    let releaseInfoDiv=document.createElement("a")
    releaseInfoDiv.classList.add("carousel__content")
/*     releaseInfoDiv.href= "https://www.discogs.com" + filteredItems[index].uri
 */    releaseInfoDiv.innerHTML=filteredItems[index].title

    let divSlide = document.createElement("div")
    divSlide.classList.add("carousel__snapper")

    let toPreviousSlide = document.createElement("a")
    toPreviousSlide.classList.add("carousel__prev")

    if (index == 0) {
        toPreviousSlide.href = "#carousel__slide_2-" + String(filteredItems.length - 1)
    } else {
        toPreviousSlide.href = "#carousel__slide_2-" + String(index-1)
    }
    let toNextSlide = document.createElement("a")
    toNextSlide.classList.add("carousel__next")
    if (index == (filteredItems.length - 1)) {
        toNextSlide.href = "#carousel__slide_2-" + String(0)
    } else {
        toNextSlide.href = "#carousel__slide_2-" + String(index+1)
    }
    listEntry.appendChild(divSlide)
    listEntry.appendChild(releaseInfoDiv)

    listEntry.appendChild(toPreviousSlide)
    listEntry.appendChild(toNextSlide)

    orderedListForSlides.appendChild(listEntry)
}
/* Problem might be that bcs of asynchronity that event listener is added before the element

ALTERNATIVE: addEventListener after rendering DOM has finished*/
second_gallery.appendChild(orderedListForSlides)


document.addEventListener("mouseover", function(e){
    const target = e.target.closest(".carousel__snapper"); // Or any other selector.
    console.log(target)

    console.log("hihere!")

    if(target){
      // Do something with `target`.
    }
  });
carouselParents=document.getElementsByClassName("carousel__snapper")
console.log(carouselParents)


function createButton(){

    const divToAttach = document.querySelector("#herebutton")
    const myButton = document.createElement('button')
/*     .addEventListener("click",function(){console.log("You clicked the button")})
 */    divToAttach.appendChild(myButton)
}
createButton();



function initPage (){
createCarousel();
pickUpElementsAndAddListener()
}
initPage()