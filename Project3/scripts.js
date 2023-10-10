let artistoptions={}
let lastSearchResultsOrdered=[]


/* here we define the styles to check for the 10 foremost occuring */
function creatingFilterArray(arrayWithNesting, cutOff, nestedIndex) {
    let arrayToCheckAgainst = []
    let reducedArray = arrayWithNesting.splice(0, cutOff)
    for (let index = 0; index < reducedArray.length; index++) {
        arrayToCheckAgainst.push(reducedArray[index][nestedIndex])
    }
    return arrayToCheckAgainst
}

/*Finally we filter only for releases that do not include this artist*/
function onlyKeepOtherArtists(allResults, resultsOnlyWithArtist, stylesToFilter) {
    let idOfArtistList = []
    for (i = 0; i < resultsOnlyWithArtist.length; i++) {
        idOfArtistRelease = resultsOnlyWithArtist[i]["id"]
        idOfArtistList.push(idOfArtistRelease)
    }
    console.log(allResults);
    let catNoArray=[]
    let filteredItems = allResults.filter(release => {
        let itemId = release.id;
        let styleArray = release.style;
        let catNo = release.catno;


        if ((!idOfArtistList.includes(itemId)) && styleArray.some(r=> stylesToFilter.includes(r)) && !catNoArray.includes(catNo)) {
            catNoArray.push(catNo)
            return release
        }

    })

    return filteredItems
}

function filterArtistData(result) {
    return new Promise((resolve) => {
        const artistinfo = {}

        let artist_entries = result;
        let style_array = flattenArrays(artist_entries, "style")
        let label_array = flattenArrays(artist_entries, "label")

        let occurence_of_styles = occurenceOfPropertyCheck(style_array, ["House", "Techno"])
        let occurence_of_labels = occurenceOfPropertyCheck(label_array)

        let sortable_style = sortOccurenceArray(occurence_of_styles);
        let sortable_labels = sortOccurenceArray(occurence_of_labels);

        artistinfo["styles"] = creatingFilterArray(sortable_style, 10, 0)
        artistinfo["labels"] = creatingFilterArray(sortable_labels, 10, 0)
        console.log(artistinfo)

        return resolve(artistinfo)
    });
}


/* ### QUESTION */
const callDiscogs = (args) => {
    console.log("called")
    switch (args["type"]) {
        case "artistClarificationSearch":
            apiUrl = `https://api.discogs.com/database/search?q=${args["artistName"]}&type=artist&token=${authKey}&secret=${secretKey}&per_page=10`
            return fetch(apiUrl).then(response => response.json()).then(result => {
                let artistnames = (result["results"]);
                return (artistnames)
            })
        case "artistSearch":
            apiUrl = `https://api.discogs.com/database/search?q=${args["artistName"]}&type=release&token=${authKey}&secret=${secretKey}&per_page=100&sort=year`
            return fetch(apiUrl).then(response => response.json()).then(result => {
                let artists = (result["results"]);
                return (artists)
            })
        case "labelSearch":
            apiUrl = `https://api.discogs.com/database/search?label=${args["label"]}&type=release&token=${authKey}&secret=${secretKey}&per_page=100&sort=year`
            return fetch(apiUrl).then(response => response.json()).then(result => {
                let allLabelReleases = (result["results"]);
                return allLabelReleases
            })
        case "labelAndArtistSearch":
            apiUrl = `https://api.discogs.com/database/search?label=${args["label"]}&q=${args["artistName"]}&type=release&token=${authKey}&secret=${secretKey}&per_page=100&sort=year`
            return fetch(apiUrl).then(response => response.json()).then(result => {
                let artistReleases = (result["results"]);
                return artistReleases
            })
    }
}

/* This gets triggered if someone clicks send */
const readOutForm = (formBlob) => {
    allElementsToShowOnSearch=document.querySelectorAll("[class*='hideShowFirst']")
    console.log(allElementsToShowOnSearch)
    allElementsToShowOnSearch.forEach(element=>{
        element.style.display="block"
    })
    let artistName = formBlob.getElementsByTagName("input")[0].value
   if (artistName===""){
    artistName = formBlob.getElementsByTagName("input")[0].placeholder
   }
    let args = {}
    args["type"] = "artistClarificationSearch"
    args["artistName"] = artistName
    callDiscogs(args).then(
        (artistnames) => {
            console.log(artistnames)
            createArtistChoicesDropdpown(artistnames);
            artistId=artistnames[0].uri.slice(8)
            artistResourcesUrl=artistnames[0].resource_url
            console.log(artistResourcesUrl)
            artistToSimilarChain(artistId)
            getBioDataForArtist(artistResourcesUrl)
        }
    )
}

getBioDataForArtist=(artistResourcesUrl)=>{
    console.log(artistResourcesUrl)
    fetch(artistResourcesUrl).then(response => response.json()).then(result => {
        const roughBio=(result.profile)
        roughBioArray=roughBio.split(".")
        const reducedRoughBioArray=roughBioArray.filter(sentence=>{return(!sentence.includes("["))
    })
        console.log(reducedRoughBioArray)
        const bioString=reducedRoughBioArray.join(".")
        populateBioDiv(bioString)
    })
}

artistToSimilarChain=(artistId)=>{
            args={}
            args["type"] = "artistSearch";
            args["artistName"] = artistId;
            (callDiscogs(args)).then(
                (result) => {
                    filterArtistData(result).then(
                        artistinfo => searchForSimilar(artistinfo, args)
                    )
                })
}

searchForSimilar = (artistinfo, args) => {
    console.log(artistinfo, args)
    const randomIndex = Math.floor(Math.random() * artistinfo["labels"].length);
    labelToSearch = artistinfo["labels"][randomIndex]
    stylesToFilter = artistinfo["styles"]

    let labelSearchArgs = {}
    labelSearchArgs["type"] = "labelSearch"
    labelSearchArgs["label"] = labelToSearch

    let labelSearchArtistArgs = {}
    labelSearchArtistArgs["type"] = "labelAndArtistSearch"
    labelSearchArtistArgs["label"] = labelToSearch
    labelSearchArtistArgs["artistName"] = args["artistName"]

    const promiseLabelSearch = callDiscogs(labelSearchArgs)
    const promiseLabelArtistSearch = callDiscogs(labelSearchArtistArgs)

    let arrayOfPromises = [promiseLabelSearch, promiseLabelArtistSearch];
    Promise.all(arrayOfPromises).then((arrayOfResults) => {
        const similarReleases = (onlyKeepOtherArtists(arrayOfResults[0], arrayOfResults[1], stylesToFilter));
        console.log(similarReleases)
        resortSearchResults(similarReleases);
        fillGallery(similarReleases)
    })
}

const resortSearchResults = (similarReleases)=>{
    similarReleases.sort(function(a, b) { 
        return (a.community.have-a.community.want)-(b.community.have-b.community.want);
        })
        lastSearchResultsOrdered=similarReleases
        customizeSlider(similarReleases.length)
}

discogsForm = document.getElementById("requestToDiscogs")
let typedInName = (discogsForm.getElementsByTagName("input")[0].value)
let sendButton = (document.getElementById("sendDiscogsButton"))
sendButton.addEventListener("click", (event) => {
    console.log(event)
    readOutForm(event.target.parentElement)})
let slider = (document.getElementById("myRangeSlider"))


const filterDown=(slidervalue)=>{
    hideShowSecondDiv=document.querySelectorAll(".hideShowSecond")
    hideShowSecondDiv.forEach(element=>{
        element.style.display="block"
    })
    console.log(slidervalue)
    filteredResult=lastSearchResultsOrdered[slidervalue-1]
    fillBestSuggestion(filteredResult)
}

slider.addEventListener("change", (event) => {
    console.log(event);
    filterDown(slider.value)
    })
