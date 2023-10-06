/* we get from the results all represented labels and arrays and turn them into a flat array */

let resultsObject = {}

function flattenArrays(artistAnswerJson, keyword) {
    let array = []
    for (index = 0; index < artistAnswerJson.length; index++) {
        if (keyword == "style") {
            let arrayWithDoubles = new Set(artistAnswerJson[index][keyword])
            array.push(...arrayWithDoubles)
        }
        if (keyword == "label") {
            let labelInfo = (artistAnswerJson[index]["label"][0])
            array.push(labelInfo)
        }
    }
    return (array)
}

/* And then we count the occurence of each value while also for certain things we do not want to count*/
function occurenceOfPropertyCheck(array, notInList = []) {
    const OccurenceObj = {}
    array.forEach(element => {
        if (!notInList.includes(element)) {
            if (OccurenceObj[element]) {
                OccurenceObj[element] += 1
            } else {
                OccurenceObj[element] = 1
            }
        }
    });
    return OccurenceObj
}

function sortOccurenceArray(occurenceOfProperty) {
    let sortableArray = []
    for (let property in occurenceOfProperty) {
        sortableArray.push([property, occurenceOfProperty[property]])
    }
    sortableArray.sort(function (a, b) {
        return b[1] - a[1]
    })
    return sortableArray
}

/* here we define the styles to check for the 10 formeost occuring */
function creatingFilterArray(arrayWithNesting, cutOff, nestedIndex) {
    let arrayToCheckAgainst = []
    let reducedArray = arrayWithNesting.splice(0, cutOff)
    for (let index = 0; index < reducedArray.length; index++) {
        arrayToCheckAgainst.push(reducedArray[index][nestedIndex])
    }
    return arrayToCheckAgainst
}

/*Finally we filter only for releases that do not include this artist*/
function onlyKeepOtherArtists(allResults, resultsOnlyWithArtist) {

    let idOfArtistList = []
    for (i = 0; i < resultsOnlyWithArtist["results"].length; i++) {
        idOfArtistRelease = resultsOnlyWithArtist["results"][i]["id"]
        idOfArtistList.push(idOfArtistRelease)
    }
    let filteredItems = allResults["results"].filter(release => {
        let itemId = release.id
        let itemtype = release.type
        if ((!idOfArtistList.includes(itemId)) && itemtype == "release") {
            return release
        }

    })
    return filteredItems
}


function createArtistChoicesDropdpown(artistnames) {
    selectArtist = document.querySelector("#select-artists")
    artistnames.map((element) => {
        aOption = document.createElement("option")
        aOption.innerHTML = element.title
        aOption.classList.add("artistOption")
        aOption.setAttribute("id", element.id)
        selectArtist.appendChild(aOption)
    })
    appendEventListener("click", "#select-artists", ".artistOption");
    return artistnames[0]
}

function filterArtistData(result) {
    return new Promise((resolve) => {
        const artistinfo = {}

        let artist_entries = result;
        console.log(artist_entries)
        let style_array = flattenArrays(artist_entries, "style")
        let label_array = flattenArrays(artist_entries, "label")
    
        let occurence_of_styles = occurenceOfPropertyCheck(style_array, ["House", "Techno"])
        let occurence_of_labels = occurenceOfPropertyCheck(label_array)
    
        let sortable_style = sortOccurenceArray(occurence_of_styles);
        let sortable_labels = sortOccurenceArray(occurence_of_labels);
    
        artistinfo["styles"] = creatingFilterArray(sortable_style, 10, 0)
        artistinfo["labels"] = creatingFilterArray(sortable_labels, 5, 0)
        console.log(artistinfo)

      return resolve(artistinfo)});
}


/* ### QUESTION */
const callDiscogs = (args) => {
    switch (args["type"]) {
        case "artistClarificationSearch":
            apiUrl = `https://api.discogs.com/database/search?q=${args["artistName"]}&type=artist&token=${authKey}&secret=${secretKey}&per_page=10`
            return fetch(apiUrl).then(response => response.json()).then(result => {
                let artistnames = (result["results"]);
                return (artistnames)
            })
        case "artistSearch":
            apiUrl = `https://api.discogs.com/database/search?q=${args["artistName"]}&token=${authKey}&secret=${secretKey}&per_page=100&sort=year`
            return fetch(apiUrl).then(response => response.json()).then(result => {
                let artists = (result["results"]);
                return (artists)
            })
        case "labelSearch":
            apiUrl = `https://api.discogs.com/database/search?label=${args["label"]}&token=${authKey}&secret=${secretKey}&per_page=100&sort=year`
            return fetch(apiUrl).then(response => response.json()).then(result => {
                let allLabelReleases = (result["results"]);
                return allLabelReleases
            })
        case "labelAndArtistSearch":
            apiUrl = `https://api.discogs.com/database/search?label=${args["label"]}&q=${args["artistName"]}&token=${authKey}&secret=${secretKey}&per_page=100&sort=year`
            return fetch(apiUrl).then(response => response.json()).then(result => {
                let artistReleases = (result["results"]);
                return artistReleases

            })

    }
}

/* This gets triggered if someone clicks send */
const readOutForm = (formBlob) => {
    let artistName = formBlob.getElementsByTagName("input")[0].value
    let args={}
    args["type"] = "artistClarificationSearch"
    args["artistName"] = artistName
    callDiscogs(args).then(
        (artistnames) => {
            
        createArtistChoicesDropdpown(artistnames);
        
        args["type"] = "artistSearch";
        args["artistName"] = artistnames[0].uri.slice(8);
        (callDiscogs(args)).then(
            (result)=>{filterArtistData(result).then(
                artistinfo=>searchForSimilar(artistinfo, args)
                )}
            )}
        )
}

searchForSimilar=(artistinfo, args)=>{
    console.log(artistinfo)
    const randomIndex = Math.floor(Math.random() * artistinfo["labels"].length);
    labelToSearch=artistinfo["labels"][randomIndex]
    console.log(labelToSearch)

}



discogsForm = document.getElementById("requestToDiscogs")
let typedInName = (discogsForm.getElementsByTagName("input")[0].value)
let sendButton = (discogsForm.getElementsByTagName("input")[1])
sendButton.addEventListener("click", (event) => readOutForm(event.target.parentElement))






/* const default_artist_name_id = (artistnames[0].uri).slice(8)
    resultsObject["artist"] = default_artist_name_id
    args = {}
    args["type"] = "artistSearch"
    args["artistName"] = default_artist_name_id
    callDiscogs(args).then(results => {
        filterArtistData(results)
    })
 */






let filteredItems = (onlyKeepOtherArtists(labeljsonDatabaseAll, labeljsonDatabaseWithArtist)).splice(0, 10)

const second_gallery = document.getElementById("carousel_ol-2")
let orderedListForSlides = document.createElement("ol")
orderedListForSlides.classList.add("carousel__viewport")

function addSlide(entry) {
    let carouselSlide = document.createElement("div")
    carouselSlide.classList.add("carousel__snapper")

    let placeholderDiv = document.createElement("div")
    placeholderDiv.classList.add("carousel__image__placeholder")


    let releaseInfoDiv = document.createElement("a")
    releaseInfoDiv.classList.add("carousel__content")

    releaseInfoDiv.innerHTML = entry.title
    releaseInfoDiv.href = "https://www.discogs.com" + entry.uri
    releaseInfoDiv.setAttribute("target", "_blank")
    releaseInfoDiv.setAttribute("rel", "noopener noreferrer")
    placeholderDiv.setAttribute("cover_image", entry.cover_image)
    placeholderDiv.setAttribute("load_status", "false")


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

function increaseopacity(img) {
    let i = 0
    var k = window.setInterval(function () {
        if (i >= 30) {
            clearInterval(k);
        } else {
            img.style.opacity = i / 100;
            i++;
        }
    }, 100);
}

function appendEventListener(eventtype, parentElementId, newElementClass) {
    console.log("triggered")
    const container = document.querySelector(parentElementId);
    container.addEventListener(eventtype, function (e) {

        if (e.target.classList.contains(newElementClass)) {
            divToBeFilled = e.target.parentElement

            load_status = (divToBeFilled.getAttribute("load_status"))

            if (load_status == "false") {
                src_for_image = (divToBeFilled.getAttribute("cover_image"))
                let img = document.createElement("img")
                img.style.opacity = 0
                img.src = src_for_image
                img.classList.add("coverimage")
                increaseopacity(img)

                divToBeFilled.appendChild(img)
                divToBeFilled.setAttribute("load_status", "true")

            }
        }
    })
}
appendEventListener("mouseover", "#carousel-div-2", "carousel__content");