let results_release = artist_answer_json["results"]
/* we get from the results all represented labels and arrays and turn them into a flat array */

function flattenArrays(artist_answer_json, keyword) {
    let array = []
    for (index = 0; index < artist_answer_json["results"].length; index++) {
        let array_with_doubles = new Set(results_release[index][keyword])
        array.push(...array_with_doubles)
    }
    return (array)
}

let style_array = flattenArrays(artist_answer_json, "style")
let label_array = flattenArrays(artist_answer_json, "label")


/* And then we count the occurence of each value while also for certain things we do not want to count*/
function OccurenceOfPropertyCheck(array, NotInList = []) {
    OccurenceObj = {}
    array.forEach(element => {
        if (!NotInList.includes(element)) {
            if (OccurenceObj[element]) {
                OccurenceObj[element] += 1
            } else {
                OccurenceObj[element] = 1
            }
        }
    });
    return OccurenceObj
}

let occurence_of_styles = OccurenceOfPropertyCheck(style_array, ["House", "Techno"])
let occurence_of_labels = OccurenceOfPropertyCheck(label_array)

/* And then we sort for the occurence */
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

/* here we define the styles to check for the 10 formeost occuring */
function creatingFilterArray(arrayWithNesting, cutoff, nestedIndex) {
    arrayToCheckAgainst = []
    let reducedArray = arrayWithNesting.splice(0, cutoff)
    for (let index = 0; index < reducedArray.length; index++) {
        arrayToCheckAgainst.push(reducedArray[index][nestedIndex])
    }
    return arrayToCheckAgainst
}
let arrayOfStyles = creatingFilterArray(sortable_style, 10, 0)

/*Finally we filter only for releases that do not include this artist*/
function onlyKeepOtherArtists(allResults, resultsOnlyWithArtist) {

    let idOfArtistList = []
    for (i = 0; i < resultsOnlyWithArtist["results"].length; i++) {
        idOfArtistRelease = resultsOnlyWithArtist["results"][i]["id"]
        idOfArtistList.push(idOfArtistRelease)
    }

    console.log(allResults)

    let filteredItems = allResults["results"].filter(release => {
        let itemId = release.id
        let itemtype = release.type
        if ((!idOfArtistList.includes(itemId)) && itemtype == "release") {
            return release
        }

    })
    return filteredItems
}
let filteredItems = (onlyKeepOtherArtists(labeljson_database_all, labeljson_database_with_artist)).splice(0, 10)
console.log(filteredItems)


const second_gallery = document.getElementById("carousel_ol-2")
let orderedListForSlides = document.createElement("ol")
orderedListForSlides.classList.add("carousel__viewport")

function addSlide(entry) {
    carouselSlide = document.createElement("div")
    carouselSlide.classList.add("carousel__snapper")
    carouselSlide.setAttribute("cover_image",entry.cover_image)

    let releaseInfoDiv = document.createElement("a")
    releaseInfoDiv.classList.add("carousel__content")

    releaseInfoDiv.innerHTML = entry.title
    releaseInfoDiv.href = "https://www.discogs.com" + entry.uri
    carouselSlide.appendChild(releaseInfoDiv)
    return carouselSlide
}

function addNavigator(direction, index, lastindex) {
    if ((direction == "prev") || (direction == "next")) {
        slideNavigator = document.createElement("a")
        slideNavigator.classList.add("carousel__" + direction)

        if (direction == "prev") {
            slideNavigator.href = "#carousel__slide_2-" + String(index - 1)
            if (index == 0) {
                slideNavigator.href = "#carousel__slide_2-" + String(lastindex - 1)
            }
        }

        if (direction == "next") {
            slideNavigator.href = "#carousel__slide_2-" + String(index + 1)
            if (index == lastindex - 1) {
                slideNavigator.href = "#carousel__slide_2-" + String(0)
            }
        }
        return slideNavigator

    } else {
        console.log("wrong pointer")
    }
}



for (index = 0; index < filteredItems.length; index++) {
    let listEntry = document.createElement("li")
    listEntry.tabindex = "0"
    listEntry.id = "carousel__slide_2-" + String(index)
    listEntry.classList.add("carousel__slide")

    let divSlide = addSlide(filteredItems[index])
    let toPreviousSlide = addNavigator("prev", index, filteredItems.length)
    let toNextSlide = addNavigator("next", index, filteredItems.length)

    listEntry.appendChild(divSlide)
    listEntry.appendChild(toPreviousSlide)
    listEntry.appendChild(toNextSlide)

    orderedListForSlides.appendChild(listEntry)

}
/* Problem might be that bcs of asynchronity that event listener is added before the element

ALTERNATIVE: addEventListener after rendering DOM has finished*/
second_gallery.appendChild(orderedListForSlides)

function lazyLoadImage(element){}

function appendEventListener(parentElementId, newElementClass) {
    const container = document.querySelector(parentElementId);
    console.log(container)
    container.addEventListener('mouseover', function (e) {
/*         if (e.target.classList.contains(newElementClass)) {
            divToBeFilled=e.target.parentElement
            console.log(divToBeFilled)
            if (!divToBeFilled.img){
            src_for_image=(divToBeFilled.getAttribute("cover_image"))

            img=document.createElement("img")
            img.src=src_for_image
            divToBeFilled.appendChild(img)
        }
        } */
    })
}
appendEventListener("#carousel_ol-2","carousel__content");

/* 

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
/*  
divToAttach.appendChild(myButton)

createButton();



function initPage() {
    createCarousel();
    pickUpElementsAndAddListener()
}
initPage() * / */