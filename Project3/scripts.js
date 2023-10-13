/* so these are two global variables that we store in order to filter further
when the use clicks */
let artistoptions = {}
let lastSearchResultsOrdered = []

/* this is the function that we initialize to have event listeners 
on two interactive bits of the page */
const init = () => {
    const sendButton = (document.getElementById("sendDiscogsButton"))
    sendButton.addEventListener("click", (event) => {
        readOutForm(event.target.parentElement)
    })

    const slider = (document.getElementById("myRangeSlider"))
    slider.addEventListener("change", (event) => {
        filterDown(slider.value)
    })
}



/* this is the central function for all possible fetches */
const callDiscogs = (args) => {
    switch (args["type"]) {
        case "artistClarificationSearch":
            apiUrl = `https://api.discogs.com/database/search?q=${args["artistName"]}&type=artist&token=${authKey}&secret=${secretKey}&per_page=10`
            return fetchFunction(apiUrl)
        case "artistSearch":
            apiUrl = `https://api.discogs.com/database/search?q=${args["artistName"]}&type=release&token=${authKey}&secret=${secretKey}&per_page=100&sort=year`
            return fetchFunction(apiUrl)
        case "labelSearch":
            apiUrl = `https://api.discogs.com/database/search?label=${args["label"]}&type=release&token=${authKey}&secret=${secretKey}&per_page=100&sort=year`
            return fetchFunction(apiUrl)
        case "labelAndArtistSearch":
            apiUrl = `https://api.discogs.com/database/search?label=${args["label"]}&q=${args["artistName"]}&type=release&token=${authKey}&secret=${secretKey}&per_page=100&sort=year`
            return fetchFunction(apiUrl)
    }
}

const fetchFunction = (apiUrl) => {
    return fetch(apiUrl).then(response => response.json()).then(result => {
        return (result["results"]);
    })
}


/* This gets triggered if someone clicks send on the form with some kind of name for an artist*/
const readOutForm = (formBlob) => {
    showfunction("hideShowFirst")
    hidefunction("hideShowSecond")
    hidefunction("hideShowThird")

/*     document.location.href = newUrl;
 */
    let artistName = formBlob.getElementsByTagName("input")[0].value
    if (artistName === "") {
        artistName = formBlob.getElementsByTagName("input")[0].placeholder
    }
    let args = {}
    args["type"] = "artistClarificationSearch"
    args["artistName"] = artistName
    callDiscogs(args).then(
        (artistnames) => {
            console.log(artistnames)
            if(artistnames.length>0){
            /* this creates a dropdown for different artist names */
            createArtistChoicesDropdpown(artistnames);

            /* and this will retrieve the bio for the first hit of the artists */
            const artistResourcesUrl = artistnames[0].resource_url
            getBioDataForArtist(artistResourcesUrl)

            /* and this will retrieve the unique-id of this artist and kick off the
            search chain for similar releases to the artist's ones */
            const artistId = artistnames[0].uri.slice(8)
            artistToSimilarChain(artistId)
        } else{
            console.log("empty")
            hidefunction("hideShowFirst")
            hidefunction("hideShowSecond")
            hidefunction("hideShowThird")

            showfunction("hideShowFourth")
        }

        }
    )
}

const getBioDataForArtist = (artistResourcesUrl) => {
    fetch(artistResourcesUrl).then(response => response.json()).then(result => {
        /* this retrieves the profile of the artist */
        const roughBio = result.profile
        /* but we want to clean it from the cross references */
        const roughBioArray = roughBio.split(".")
        let reducedRoughBioArray = roughBioArray.filter(sentence => {
            return (!sentence.includes("["))
        })
        /* and then join it together */
        reducedRoughBioArray=reducedRoughBioArray.slice(0, 5);
        const bioString = reducedRoughBioArray.join(".")
        populateBioDiv(bioString)
    })
}

/* We first search for the releases of this artist using his id */
const artistToSimilarChain = (artistId) => {
    hidefunction("hideShowThird")
    args = {}
    args["type"] = "artistSearch";
    args["artistName"] = artistId;
    (callDiscogs(args)).then(
        /* we use this data on the releases */
        (result) => {
            /* and use our own function that filters out what styles and
            labels stand for the artist */
            filterArtistData(result).then(
                /* and then pass this into a function that searches for similar things */
                artistinfo => searchForSimilar(artistinfo, args)
            )
        })
}




/* This is the function that filters for all the data that we can find on one artist's releases
and retrieves the 10 most frequent styles and labels that this artist is associated with */
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

        return resolve(artistinfo)
    });
}

/* with the info on the artist releases we can kick of a search for similar stuff */
const searchForSimilar = (artistinfo, args) => {
    /* we pick one random label out of the 10 that are the most associated with our artist */
    const randomIndex = Math.floor(Math.random() * artistinfo["labels"].length);
    const labelToSearch = artistinfo["labels"][randomIndex]
    const stylesToFilter = artistinfo["styles"]
    fillIdElement(labelToSearch, "labelname");
    fillIdElement(stylesToFilter, "styles");
    

    /* and we will once retrieve all releases from this label */
    let labelSearchArgs = {}
    labelSearchArgs["type"] = "labelSearch"
    labelSearchArgs["label"] = labelToSearch
    const promiseLabelSearch = callDiscogs(labelSearchArgs)

    /* and we will once retrieve all releases from this label by our artist*/
    let labelSearchArtistArgs = {}
    labelSearchArtistArgs["type"] = "labelAndArtistSearch"
    labelSearchArtistArgs["label"] = labelToSearch
    labelSearchArtistArgs["artistName"] = args["artistName"]
    const promiseLabelArtistSearch = callDiscogs(labelSearchArtistArgs)

    /* we create an array of promises that we chain using promise all
    to wait for both search to resolve */
    let arrayOfPromises = [promiseLabelSearch, promiseLabelArtistSearch];
    Promise.all(arrayOfPromises).then((arrayOfResults) => {

        /* and then we use our own function that only keeps releases that are NOT from this artist
        but fit the style of the artist that we typed in */
        onlyKeepOtherArtists(arrayOfResults[0], arrayOfResults[1], stylesToFilter).then(similarReleases => {
            
            /* and then we fill the gallery with these releases */
            if(similarReleases.length>1){
                showfunction("hideShowSecond")
                hidefunction("hideShowThird")
                hidefunction("hideShowFourth")
            fillGallery(similarReleases)}

            if(similarReleases.length===1){
                hidefunction("hideShowSecond")
                showfunction("hideShowThird")
                hidefunction("hideShowFourth")
                fillBestSuggestion(similarReleases[0])
            }

            if(similarReleases.length===0){
                hidefunction("hideShowSecond")
                hidefunction("hideShowThird")
                showfunction("hideShowFourth")
            }

            /* and customize the last slider for these releases
            that will give you the best fit whether you want something rare or not*/
            customizeSlider(similarReleases)

        })
    })
}

/*Finally we filter only for releases that do not include the typed in artist*/
function onlyKeepOtherArtists(allLabelResults, allLabelResultsWithArtist, stylesToFilter) {
    return new Promise((resolve) => {
        /* so we go through the releases of the artist on the label and push the ids into an array */
        let idOfReleasesOfArtistList = []
        for (i = 0; i < allLabelResultsWithArtist.length; i++) {
            idOfArtistRelease = allLabelResultsWithArtist[i]["id"]
            idOfReleasesOfArtistList.push(idOfArtistRelease)
        }
        /* and then we filter through all releases by the label*/
        let catNoArray = []
        let filteredItems = allLabelResults.filter(release => {
            let itemId = release.id;
            let styleArray = release.style;
            let catNo = release.catno;
            /* by only keeping the release that are 
            a) not in the array of the artist id, so not from that artist 
            b) fit to the styles we are looking for
            c) we have not already in another format (hence, we check for the catalogue number)*/
            if ((!idOfReleasesOfArtistList.includes(itemId)) && styleArray.some(r => stylesToFilter.includes(r)) && !catNoArray.includes(catNo)) {
                catNoArray.push(catNo)
                return release
            }
        })
        return resolve(filteredItems)
    })
}

/* lastly this is the function that manages the last bit of the page
it let's you filter all found releases for the one that fits the best to
how rare you want a record to be */
const filterDown = (slidervalue) => {
    showfunction("hideShowThird")
    filteredResult = lastSearchResultsOrdered[slidervalue - 1]
    fillBestSuggestion(filteredResult)
}


init()