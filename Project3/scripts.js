/* let results_release = artist_answer_json["results"]
we get from the results all represented labels and arrays and turn them into a flat array */

function flattenArrays(artist_answer_json, keyword) {
    console.log(artist_answer_json)
    let array = []
    for (index = 0; index < artist_answer_json.length; index++) {
        let array_with_doubles = new Set(artist_answer_json[index][keyword])
        array.push(...array_with_doubles)
    }
    return (array)
}




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

/* let occurence_of_styles = OccurenceOfPropertyCheck(style_array, ["House", "Techno"])
let occurence_of_labels = OccurenceOfPropertyCheck(label_array)
 */
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

/* let sortable_style = SortOccurenceArray(occurence_of_styles);
let sortable_labels = SortOccurenceArray(occurence_of_labels);
 */
/* here we define the styles to check for the 10 formeost occuring */
function creatingFilterArray(arrayWithNesting, cutoff, nestedIndex) {
    arrayToCheckAgainst = []
    let reducedArray = arrayWithNesting.splice(0, cutoff)
    for (let index = 0; index < reducedArray.length; index++) {
        arrayToCheckAgainst.push(reducedArray[index][nestedIndex])
    }
    return arrayToCheckAgainst
}
/* let arrayOfStyles = creatingFilterArray(sortable_style, 10, 0)
 */
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

    let placeholderDiv=document.createElement("div")
    placeholderDiv.classList.add("carousel__image__placeholder")


    let releaseInfoDiv = document.createElement("a")
    releaseInfoDiv.classList.add("carousel__content")

    releaseInfoDiv.innerHTML = entry.title
    releaseInfoDiv.href = "https://www.discogs.com" + entry.uri
    placeholderDiv.setAttribute("cover_image",entry.cover_image)
    placeholderDiv.setAttribute("load_status","false")


    placeholderDiv.appendChild(releaseInfoDiv)
    carouselSlide.appendChild(placeholderDiv)
    return carouselSlide
}

function addNavigator(direction, index, lastindex) {
    if ((direction == "prev") || (direction == "next")) {
        slideNavigator = document.createElement("a")
        slideNavigator.classList.add("carousel__" + direction)

        if (direction == "prev") {

            slideNavigator.href = "#carousel__slide_2-" + String(index - 1);
/*             slideNavigator.style.backgroundImage = "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,50 80,100 80,0' fill='%23fff'/%3E%3C/svg%3E";
 */

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

function increaseopacity(img){
    let i =0
    var k = window.setInterval(function() {
        if (i >= 30) {
          clearInterval(k);
        } else {
            img.style.opacity = i / 100;
          i++;
        }
      }, 100);
}

function appendEventListener(parentElementId, newElementClass) {
    const container = document.querySelector(parentElementId);
    console.log(container)
    container.addEventListener('mouseover', function (e) {
        console.log("this is what I try to find:",newElementClass)
        console.log("this is what I try find class-wise:", e.target.classList)
        console.log(e.target.classList.contains(newElementClass))
        if (e.target.classList.contains(newElementClass)) {
            divToBeFilled=e.target.parentElement
            console.log(divToBeFilled)
            console.log(divToBeFilled.img)
            load_status=(divToBeFilled.getAttribute("load_status"))
            console.log(load_status)

            if (load_status=="false"){
            console.log(load_status)
            src_for_image=(divToBeFilled.getAttribute("cover_image"))
            let img=document.createElement("img")
            img.style.opacity=0
            img.src=src_for_image
            img.classList.add("coverimage")
            increaseopacity(img)

            divToBeFilled.appendChild(img)
            divToBeFilled.setAttribute("load_status","true")
            
        }
        }
    })
}
appendEventListener("#carousel-div-2","carousel__content");

/* This gets triggered if someone clicks send */
const readOutForm=(formBlob)=>{
    let artistName=formBlob.getElementsByTagName("input")[0].value
    apiUrl=`https://api.discogs.com/database/search?q=${artistName}&token=${authKey}&secret=${secretKey}`
    askForArtistData(apiUrl)
}


function askForArtistData(url){ fetch(url).then(response=>
    response.json()).then(result=>{
        let artist_entries=(result["results"]);
        console.log(artist_entries)
        let style_array = flattenArrays(artist_entries, "style")
        let label_array = flattenArrays(artist_entries, "label")
        console.log(style_array)
        console.log(label_array)
        let sortable_style = SortOccurenceArray(occurence_of_styles);
        let sortable_labels = SortOccurenceArray(occurence_of_labels);
        console.log(sortable_style)
        console.log(sortable_labels)

        
    }
)}

discogsForm=document.getElementById("requestToDiscogs")
let typedInName=(discogsForm.getElementsByTagName("input")[0].value)
let sendButton=(discogsForm.getElementsByTagName("input")[1])
sendButton.addEventListener("click", (event)=>readOutForm(event.target.parentElement))