/* we get from the results all represented labels and arrays and turn them into a flat array */
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
        let itemtype = release.type;
        let styleArray = release.style;
        let catNo = release.catno;


        if ((!idOfArtistList.includes(itemId)) && itemtype == "release" && styleArray.some(r=> stylesToFilter.includes(r)) && !catNoArray.includes(catNo)) {
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
    console.log(artistName)
    let args = {}
    args["type"] = "artistClarificationSearch"
    args["artistName"] = artistName
    callDiscogs(args).then(
        (artistnames) => {
            createArtistChoicesDropdpown(artistnames);
            artistId=artistnames[0].uri.slice(8)
            artistToSimilarChain(artistId)
        }
    )
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
        fillGallery(similarReleases)
    })
}



discogsForm = document.getElementById("requestToDiscogs")
let typedInName = (discogsForm.getElementsByTagName("input")[0].value)
let sendButton = (discogsForm.getElementsByTagName("button")[0])
console.log(sendButton)
sendButton.addEventListener("click", (event) => {
    console.log(event)
    readOutForm(event.target.parentElement)})
let filteredItems = (onlyKeepOtherArtists(labeljsonDatabaseAll["results"], labeljsonDatabaseWithArtist["results"], ["House","Techno"])).splice(0, 10)