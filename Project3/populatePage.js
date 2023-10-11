const fillGallery = (filteredItems) => {
    const second_gallery = document.getElementById("carousel_ol")
    second_gallery.innerHTML = '';
    let orderedListForSlides = document.createElement("ol")
    orderedListForSlides.classList.add("carousel__viewport")
    for (index = 0; index < filteredItems.length; index++) {
        let listEntry = document.createElement("li")
        listEntry.tabindex = "0"
        listEntry.id = "carousel__slide_" + String(index)
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
}

customizeSlider=(length)=>{
    slider=document.getElementById("myRangeSlider")
    slider.setAttribute("max",length)
    let half=Math.round(length/2)
    slider.setAttribute("value",half)

}
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

function addEventListenerForDropdown(eventtype, parentElementId){
    const container = document.querySelector(parentElementId);
    container.addEventListener(eventtype, function (e) {
        
        let selectedArtist=((container.options[e.target.selectedIndex]).getAttribute("artistid"))

        let selectedArtistUrl=((container.options[e.target.selectedIndex]).getAttribute("resource"))
        artistToSimilarChain(selectedArtist)
        getBioDataForArtist(selectedArtistUrl)

    })
}

function appendEventListener(eventtype, parentElementId, newElementClass) {
    const container = document.querySelector(parentElementId);
    console.log(container)
    container.addEventListener(eventtype, function (e) {

        if (e.target.classList.contains(newElementClass)) {
            divToBeFilled = e.target.parentElement
            console.log(e)
            console.log(e.target)

            console.log(divToBeFilled)

            load_status = (divToBeFilled.getAttribute("load_status"))
            console.log(load_status)
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
appendEventListener("mouseover", "#carousel-div", "carousel__content");

function populateBioDiv(profileBio){
    const divForBio=document.getElementById("profileOfArtist")
    divForBio.innerHTML=""
    divForBio.innerHTML = profileBio
}

function createArtistChoicesDropdpown(artistnames) {
    selectArtistClarifier = document.querySelector("#clarifierArtist")
    console.log(selectArtistClarifier)

    selectArtistClarifier.style.display = "block";

    selectArtist = document.querySelector("#selectArtists")
    artistnames.map((element) => {
        aOption = document.createElement("option")
        aOption.innerHTML = element.title
        aOption.classList.add("artistOption")
        aOption.setAttribute("artistid", element.uri.slice(8))
        aOption.setAttribute("resource", element.resource_url)

        selectArtist.appendChild(aOption)
    })
    addEventListenerForDropdown("change", "#selectArtists");
    return artistnames[0]
}

const fillBestSuggestion=(entry)=>{
    console.log(entry)
    let divToAddBestSuggestion=document.querySelector("#bestSuggestion")
    divToAddBestSuggestion.innerHTML=""

    let bestSuggestionOuterDiv=document.createElement("div")
    bestSuggestionOuterDiv.classList.add("bestSuggestionOuterDiv")

    
    let bestSuggestionInnerDiv=document.createElement("div")
    bestSuggestionInnerDiv.classList.add("bestSuggestionInnerDiv")
    bestSuggestionInnerDiv.setAttribute("cover_image", entry.cover_image)
    bestSuggestionInnerDiv.setAttribute("load_status", "false")

    let bestSuggestionInnerA=document.createElement("a")
    bestSuggestionInnerA.classList.add("bestSuggestionAText")
    bestSuggestionInnerA.innerHTML = entry.title
    bestSuggestionInnerA.href = "https://www.discogs.com" + entry.uri
    bestSuggestionInnerA.setAttribute("target", "_blank")
    bestSuggestionInnerA.setAttribute("rel", "noopener noreferrer")




    bestSuggestionInnerDiv.appendChild(bestSuggestionInnerA)
    bestSuggestionOuterDiv.appendChild(bestSuggestionInnerDiv)
    divToAddBestSuggestion.appendChild(bestSuggestionOuterDiv)


    appendEventListener("mouseover", "#bestSuggestion", "bestSuggestionAText");

}