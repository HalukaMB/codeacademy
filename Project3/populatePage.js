/* this is the function used to fill the gallery with the results from the fetch*/
const fillGallery = (filteredItems) => {
    const gallery = document.getElementById("carousel_ol")
    gallery.innerHTML = '';
    /* we need to add a ordered list for the viewport */
    let orderedListForSlides = document.createElement("ol")
    orderedListForSlides.classList.add("carousel__viewport")
    for (index = 0; index < filteredItems.length; index++) {
        /* and then we append for each entry a list element */
        let listEntry = document.createElement("li")
        listEntry.tabindex = "0"
        listEntry.id = "carousel__slide_" + String(index)
        listEntry.classList.add("carousel__slide")

        /* that gets a div for all the info in there and the navigator buttons */
        let divSlide = addSlide(filteredItems[index])
        let toPreviousSlide = addNavigator("prev", index, filteredItems.length)
        let toNextSlide = addNavigator("next", index, filteredItems.length)

        /* we append all this to the list entry */
        listEntry.appendChild(divSlide)
        listEntry.appendChild(toPreviousSlide)
        listEntry.appendChild(toNextSlide)
        /* which we add to the list  */
        orderedListForSlides.appendChild(listEntry)

    }
    /* lastly we add the list to the gallery div */
    gallery.appendChild(orderedListForSlides)
    /* and an event listener that fires a function when people are hovering the carousel
    this is used to load the image */
    appendEventListenerForImg("mouseover", "#carousel-div", "carousel__content");

}

/* when we add slides this is what happens */
function addSlide(entry) {

    /* we need something for the snapper */
    let carouselSlide = document.createElement("div")
    carouselSlide.classList.add("carousel__snapper")

    /* we need a placeholder for the later image */
    let placeholderDiv = document.createElement("div")
    placeholderDiv.classList.add("carousel__image__placeholder")

    /* and we add an a with the releaseinfo and hrefs*/
    let releaseInfoA = document.createElement("a")
    releaseInfoA.classList.add("carousel__content")
    releaseInfoA.innerHTML = entry.title
    releaseInfoA.href = "https://www.discogs.com" + entry.uri
    releaseInfoA.setAttribute("target", "_blank")
    releaseInfoA.setAttribute("rel", "noopener noreferrer")

    /* also here we already leave the url for loading the image later */
    placeholderDiv.setAttribute("cover_image", entry.cover_image)
    placeholderDiv.setAttribute("load_status", "false")

    /* we add the releaseinfo */
    placeholderDiv.appendChild(releaseInfoA)
    carouselSlide.appendChild(placeholderDiv)
    return carouselSlide
}

/* this is the function we use for adding the navigators */
function addNavigator(direction, index, lastindex) {
    if ((direction == "prev") || (direction == "next")) {
        slideNavigator = document.createElement("a")
        slideNavigator.classList.add("carousel__" + direction)

        if (direction == "prev") {
            slideNavigator.href = "#carousel__slide_" + String(index - 1);
            if (index == 0) {
                slideNavigator.href = "#carousel__slide_" + String(lastindex - 1)
            }
        }

        if (direction == "next") {
            slideNavigator.href = "#carousel__slide_" + String(index + 1)
            if (index == lastindex - 1) {
                slideNavigator.href = "#carousel__slide_" + String(0)
            }
        }
        return slideNavigator

    }
}


/* this function is fired when someone hovers over the text of the release */
function appendEventListenerForImg(eventtype, parentElementId, newElementClass) {
    const container = document.querySelector(parentElementId);
    container.addEventListener(eventtype, function (e) {
        /* we have to do this using this if target because
        we create the gallery slides dynamically so we cannot simply add the eventlistener
        to the slides per se */
        if (e.target.classList.contains(newElementClass)) {
            const divToBeFilled = e.target.parentElement
            /* we check whether the image was already loaded */
            let load_status = (divToBeFilled.getAttribute("load_status"))
            if (load_status == "false") {
                /* if this is not the case, we create a image with a starting opacity of zero */
                const src_for_image = (divToBeFilled.getAttribute("cover_image"))
                let img = document.createElement("img")
                img.style.opacity = 0
                img.src = src_for_image
                img.classList.add("coverimage")

                /* append it to our div that hosts the a tag for the release */
                divToBeFilled.appendChild(img)
                divToBeFilled.setAttribute("load_status", "true")
                /* and then we call a function that slowly increases the opacity of the image */
                increaseopacity(img)

            }
        }
    })
}

/* this one we use for slowly increasing the opacity of the image */
function increaseopacity(img) {
    let i = 0
    var k = window.setInterval(function () {
        if (i > 30) {
            clearInterval(k);
        } else {
            img.style.opacity = i / 100;
            i++;
        }
    }, 100);
}
/* this function creates a dropdown for the artist to allow the user
to clarify which artist he meant */
function createArtistChoicesDropdpown(artistnames) {

    selectArtist = document.querySelector("#selectArtists")
    selectArtist.innerHTML = ""
    /* for each possible artist selection, it creates another option */
    artistnames.map((element) => {
        const aOption = document.createElement("option")
        aOption.innerHTML = element.title
        aOption.classList.add("artistOption")
        /* that also holds certain info important for later event triggers */
        aOption.setAttribute("artistid", element.uri.slice(8))
        aOption.setAttribute("resource", element.resource_url)

        selectArtist.appendChild(aOption)
    })
    addEventListenerForDropdown("change", "#selectArtists");
    return artistnames[0]
}
/* this is a function that adds an event listener to the dropdown that we need for clarification
when there are multiple artists with similar names */
function addEventListenerForDropdown(eventtype, parentElementId) {
    const container = document.querySelector(parentElementId);
    container.addEventListener(eventtype, function (e) {
        /*it retriggers when there is a change in the dropdown the artistToSimilarChain
        and also loads a new bio*/
        let selectedArtist = ((container.options[e.target.selectedIndex]).getAttribute("artistid"))
        let selectedArtistUrl = ((container.options[e.target.selectedIndex]).getAttribute("resource"))
        artistToSimilarChain(selectedArtist)
        getBioDataForArtist(selectedArtistUrl)

    })
}

/* this is the function that populates the bio div for the artist */
function populateBioDiv(profileBio) {
    const divForBio = document.getElementById("profileOfArtist")
    divForBio.innerHTML = ""
    divForBio.innerHTML = profileBio
}

/* this function creates the slider for the releases so that the user can select one
that matches best his taste for how rare a record is */
const customizeSlider = (similarReleases) => {
    /* we take in the number of similar releases and set them as the max for the slider */
    const lengthForSlider=similarReleases.length
    const slider = document.getElementById("myRangeSlider")
    slider.setAttribute("max", lengthForSlider)
    /* and set the slider to half of that */
    let half = Math.round(lengthForSlider / 2)
    slider.setAttribute("value", half)
    /* and then we resort the releases lastly using the resort function
    that sorts the results according to their rarity */
    resortSearchResults(similarReleases)

}

/* this function fill in the best suggestion based on what someone selects on the slider */
const fillBestSuggestion = (entry) => {
    let divToAddBestSuggestion = document.querySelector("#bestSuggestion")
    divToAddBestSuggestion.innerHTML = ""

    /* we create a div that holds the best suggestion */
    let bestSuggestionOuterDiv = document.createElement("div")
    bestSuggestionOuterDiv.classList.add("bestSuggestionOuterDiv")

    /* and one that will be used to add the image and the a for the release info */

    let bestSuggestionInnerDiv = document.createElement("div")
    bestSuggestionInnerDiv.classList.add("bestSuggestionInnerDiv")
    bestSuggestionInnerDiv.setAttribute("cover_image", entry.cover_image)
    bestSuggestionInnerDiv.setAttribute("load_status", "false")

    /* here we add all the info for a release */
    let bestSuggestionInnerA = document.createElement("a")
    bestSuggestionInnerA.classList.add("bestSuggestionAText")
    bestSuggestionInnerA.innerHTML = entry.title
    bestSuggestionInnerA.href = "https://www.discogs.com" + entry.uri
    bestSuggestionInnerA.setAttribute("target", "_blank")
    bestSuggestionInnerA.setAttribute("rel", "noopener noreferrer")

    /* and add all this info */
    bestSuggestionInnerDiv.appendChild(bestSuggestionInnerA)
    bestSuggestionOuterDiv.appendChild(bestSuggestionInnerDiv)
    divToAddBestSuggestion.appendChild(bestSuggestionOuterDiv)
    appendEventListenerForImg("mouseover", "#bestSuggestion", "bestSuggestionAText");

}

/* these are just two helper functions that will make elements of certain classes show up or not */
const hidefunction = (className) => {
    elementsToHide = document.querySelectorAll(`[class*='${className}']`)
    elementsToHide.forEach(element => {
        console.log(element.style)
        element.style.display = "none"
    })
}

const showfunction = (className) => {
    elementsToShow = document.querySelectorAll(`[class*='${className}']`)
    elementsToShow.forEach(element => {
        element.style.display = "block"
    })
}

