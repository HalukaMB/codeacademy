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
    lastSearchResultsOrdered=sortableArray
    return sortableArray
}

/* here we define the styles to check for the 10 foremost occuring */
function creatingFilterArray(arrayWithNesting, cutOff, nestedIndex) {
    let arrayToCheckAgainst = []
    let reducedArray = arrayWithNesting.splice(0, cutOff)
    for (let index = 0; index < reducedArray.length; index++) {
        arrayToCheckAgainst.push(reducedArray[index][nestedIndex])
    }
    return arrayToCheckAgainst
}

/* this function is necessary to resort the releases by rarity */
const resortSearchResults = (similarReleases) => {
    similarReleases.sort(function (a, b) {
        return (a.community.have - a.community.want) - (b.community.have - b.community.want);
    })
    lastSearchResultsOrdered = similarReleases
}
