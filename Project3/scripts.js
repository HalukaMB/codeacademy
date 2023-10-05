/* let results_release = artistAnswerJson["results"]
we get from the results all represented labels and arrays and turn them into a flat array */

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
    OccurenceObj = {}
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

/* let sortable_style = sortOccurenceArray(occurence_of_styles);
let sortable_labels = sortOccurenceArray(occurence_of_labels);
 */
/* here we define the styles to check for the 10 formeost occuring */
function creatingFilterArray(arrayWithNesting, cutOff, nestedIndex) {
    arrayToCheckAgainst = []
    let reducedArray = arrayWithNesting.splice(0, cutOff)
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


    let filteredItems = allResults["results"].filter(release => {
        let itemId = release.id
        let itemtype = release.type
        if ((!idOfArtistList.includes(itemId)) && itemtype == "release") {
            return release
        }

    })
    return filteredItems
}
let filteredItems = (onlyKeepOtherArtists(labeljsonDatabaseAll, labeljsonDatabaseWithArtist)).splice(0, 10)
console.log(filteredItems)


const second_gallery = document.getElementById("carousel_ol-2")
let orderedListForSlides = document.createElement("ol")
orderedListForSlides.classList.add("carousel__viewport")

function addSlide(entry) {
    carouselSlide = document.createElement("div")
    carouselSlide.classList.add("carousel__snapper")

    let placeholderDiv = document.createElement("div")
    placeholderDiv.classList.add("carousel__image__placeholder")


    let releaseInfoDiv = document.createElement("a")
    releaseInfoDiv.classList.add("carousel__content")

    releaseInfoDiv.innerHTML = entry.title
    releaseInfoDiv.href = "https://www.discogs.com" + entry.uri
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
    console.log(container)
    container.addEventListener(eventtype, function (e) {
        console.log(e)
        console.log("this is what I try to find:", newElementClass)
        console.log("this is what I try find class-wise:", e.target.classList)
        console.log(e.target.classList.contains(newElementClass))
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

/* This gets triggered if someone clicks send */
const readOutForm = (formBlob) => {
    let artistName = formBlob.getElementsByTagName("input")[0].value
    apiUrl = `https://api.discogs.com/database/search?q=${artistName}&type=artist&token=${authKey}&secret=${secretKey}&per_page=10`
    const args = {}
    args["type"] = "artistSearch"
    args["artistName"] = artistName
    callDiscogs(args).then(artists=>clearingUpArtist(artists)
    )
}

const callDiscogs = (args) => {
        switch (args["type"]) {
            case "artistSearch":
                apiUrl = `https://api.discogs.com/database/search?q=${args["artistName"]}&type=artist&token=${authKey}&secret=${secretKey}&per_page=10`
                fetch(apiUrl).then(response => response.json()).then(result => {
                    let artists = (result["results"]);
                    console.log(artists)
                    return (artists)
                })
            case "labelSearch":
                apiUrl = `https://api.discogs.com/database/search?label=${args["label"]}&token=${authKey}&secret=${secretKey}&per_page=100`
                fetch(apiUrl).then(response => response.json()).then(result => {
                    let allLabelReleases = (result["results"]);
                    return allLabelReleases

                })
                case "labelAndArtistSearch":
                    apiUrl = `https://api.discogs.com/database/search?label=${args["label"]}&q=${args["artistName"]}&token=${authKey}&secret=${secretKey}&per_page=100`
                    fetch(apiUrl).then(response => response.json()).then(result => {
                        let artistReleases = (result["results"]);
                        return artistReleases
    
                    })



        }}

        function clearingUpArtist(artists) {
            selectArtist = document.querySelector("#select-artists")
            artists.map((element) => {
                aOption = document.createElement("option")
                aOption.innerHTML = element.title
                aOption.classList.add("artistOption")
                aOption.setAttribute("id", element.id)
                selectArtist.appendChild(aOption)


            })
            appendEventListener("click", "#select-artists", ".artistOption");
            const default_artist_name_id = (artists[0].uri).slice(8)
            let defaultArtistUrl = apiUrl = `https://api.discogs.com/database/search?q=${default_artist_name_id}&token=${authKey}&secret=${secretKey}&per_page=100`

            askForArtistData(defaultArtistUrl)
        }

        function askForArtistData(url) {
            fetch(url).then(response =>
                response.json()).then(result => {
                let artist_entries = (result["results"]);
                let style_array = flattenArrays(artist_entries, "style")
                let label_array = flattenArrays(artist_entries, "label")

                let occurence_of_styles = occurenceOfPropertyCheck(style_array, ["House", "Techno"])
                let occurence_of_labels = occurenceOfPropertyCheck(label_array)

                let sortable_style = sortOccurenceArray(occurence_of_styles);
                let sortable_labels = sortOccurenceArray(occurence_of_labels);


                let arrayOfStyles = creatingFilterArray(sortable_style, 10, 0)
                let arrayOfLabels = creatingFilterArray(sortable_labels, 5, 0)



                console.log(arrayOfStyles)
                console.log(arrayOfLabels)
                let labelToSearchFor = (arrayOfLabels[Math.floor(Math.random() * arrayOfLabels.length)])
                const args = {}
                args["type"]="labelSearch"
                args["label"]=labelToSearchFor
                const promise = callDiscogs(args);
                promise.then((result) => console.log(result));
              

            })
        }

        discogsForm = document.getElementById("requestToDiscogs")
        let typedInName = (discogsForm.getElementsByTagName("input")[0].value)
        let sendButton = (discogsForm.getElementsByTagName("input")[1])
        sendButton.addEventListener("click", (event) => readOutForm(event.target.parentElement))