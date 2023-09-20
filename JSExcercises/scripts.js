console.log("Starting javascript...")
const myName = "Haluka";
console.log(myName);
let myAge = 33;
console.log(myAge);
let juliaAge = 32;
let ageDiff = juliaAge - myAge;
console.log(ageDiff)
if (myAge >>> 21) {
    console.log("You are older than 21")
} else {
    console.log("You are younger than 21")
}
if (ageDiff > 0) {
    console.log("Julia is older")
} else if (ageDiff === 0) {
    console.log("You are of the same age.")
} else {
    console.log("You are older.")
}
let coursemembers = ["Laura", "Ali", "Heron", "Nastia", "Haluka"]
console.log(coursemembers[0])

let agecoursemembers = [41, 30, 35, 28, 33]
let i = 0
let sum = 0
while (i < agecoursemembers.length) {
    console.log(agecoursemembers[i]);
    sum += agecoursemembers[i]
    i++;
}
console.log(sum);

added_even = 0
const mixednumbers = [1, 2, 8, 3, 2];
for (i = 0; i < mixednumbers.length; i++) {
    let rest = mixednumbers[i] % 2
    if (rest == 0) {
        added_even += mixednumbers[i]
    }
}
console.log(added_even)
console.log("here")
const array = [4, 1, 2, 8, 3, 2, 3, 4]

let sum_of_array_even_index = 0
for (i = 1; i < array.length; i++) {
    if (i % 2 == 0) {
        sum_of_array_even_index += array[i]
    }
}
console.log(sum_of_array_even_index)

let emptyf = function () {}
emptyf()

const multiply = function () {
    return (12 * 10)
}
let result = multiply()
console.log(result)

/* excercise 13 */
const multiplyarg = function (a, b) {
    return (a * b)
}
result = multiplyarg(2, 3)
console.log(result)
/* excercise 14 */
function determinetriangle(a, b, c) {
    let equalsides = 0;
    if (a === b) {
        equalsides += 1
    }
    if (b === c) {
        equalsides += 1
    }
    if (a === c) {
        equalsides += 1
    }
    if (equalsides == 1) {
        return ("Isosceles")
    } else if (equalsides == 3) {
        return ("Equilateral")
    } else {
        return ("Scalene")
    }
}
console.log(determinetriangle(4, 2, 1))

/* excercise 15 */

function smallest(array_arg) {
    let smallestnumber;

    console.log(array_arg)
    for (i = 0; i < array_arg.length; i++) {
        console.log(array_arg[i])
        if (i == 0) {
            smallestnumber = array_arg[i]
        } else {
            if (smallestnumber > array_arg[i]) {
                smallestnumber = array_arg[i]
            }
        }
    }
    return smallestnumber;
}
console.log(smallest(array))
/* excercise 16 */

function biggest(array_arg) {
    let biggestnumber;

    console.log(array_arg)
    for (i = 0; i < array_arg.length; i++) {
        if (i == 0) {
            biggestnumber = array_arg[i]
        } else {
            if (biggestnumber < array_arg[i]) {
                biggestnumber = array_arg[i]
            }
        }
    }
    return biggestnumber;
}
console.log(biggest(array))

function printout(array, index) {
    console.log(array[index])
}

printout(array, 2)

/* excercise 18 */

const myColor = ["Red", "Green", "White", "Black"];

function addstrings(array) {
    let overallstring = ""
    for (el = 0; el < array.length; el++) {
        if (el == 0) {
            overallstring = array[0]
        } else {
            overallstring += (" " + array[el])
        }
    }
    return overallstring
}
console.log(addstrings(myColor))
const x = 32443

function reverseorder(number) {
    number = String(number)
    wordlength = (number.length)
    let stringreverse = ""
    for (index = wordlength - 1; index >= 0; index--) {
        console.log(index)
        console.log(number[index])
        stringreverse += String(number[index])
    }
    return stringreverse
}
console.log(reverseorder(x))

const wordx = 'webmaster'

function sortalphabetical(wordx) {
    let wordxarray=[]
    for (index = 0; index < wordx.length; index++) {
        wordxarray.push(wordx[index])
    }
    wordxarray.sort()
    let shuffledword=""
    for  (index = 0; index < wordxarray.length; index++) {
        shuffledword+=wordxarray[index]
    }
    return shuffledword
}
console.log(sortalphabetical(wordx))

const tripleword = "Web Development Tutorial"

function splitwordsarray(tripleword){
   let wordsarray=tripleword.split(" ")
   console.log(wordsarray)
   let longestword=""
   for (index=0; index<wordsarray.length; index++){
        if (index==0){
            longestword=wordsarray[index]
        }
        if (longestword.length<wordsarray[index].length){

            longestword=wordsarray[index]
        }
   }
   return longestword
}
console.log(splitwordsarray(tripleword))

let wordtobereplaced="Javascript"

function replacer(wordtobereplaced){
    let newword=wordtobereplaced.replaceAll("a","1")
    return newword
}
console.log(replacer(wordtobereplaced))

let sentencelow="prince of persia"

function uppercaser(sentencelow){
    sentencelowarray=sentencelow.split(" ")
    console.log(sentencelowarray)
    let uppercasestring=""
    for (index=0;index<sentencelowarray.length; index+=1){
    let newword=(sentencelowarray[index])[0].toUpperCase()+sentencelowarray[index].slice(1)
    uppercasestring+=newword+" "
}
return uppercasestring
}
console.log(uppercaser(sentencelow))

function allevennumbersbefore(number){
    for (index=0;index<number;index++){
        if (index%2==0){
            console.log(index)
        }
}}
let number=13
allevennumbersbefore(number)
function alloddnumbersinbetween(number1,number2){
    for (index=number1;index<number2;index++){
        if (index%2!=0){
            console.log(index)
        }
}}
alloddnumbersinbetween(2,13)

let arrayofnumberswithdoubles=[3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100];

function printdoubles(array){
    let arrayiterated=[]
    for(index=0;index<array.length;index++){
        if(arrayiterated.includes(array[index])){
            console.log(array[index])
        }else{
            arrayiterated.push(array[index])
        }

    }

}
printdoubles(arrayofnumberswithdoubles)
const divband=document.getElementById("listband")

function myBandList(bands){
    for(i=0;i<bands.length; i++){
        let newtext=document.createElement("div")
        newtext.innerHTML=bands[i]
        divband.appendChild(newtext)
    }
}
arrayBands=["Daft Punk","Foo Figthers"]

myBandList(arrayBands)

function addMultTable(a,b){
    let tablebase=document.createElement("table")
    for (i=0;i<a;i++){
        let tablerow=document.createElement("tr")
        for (j=0;j<b;j++){
            console.log(j)
            let tablecell=document.createElement("td")
            tablecell.style.backgroundColor = "black";
            tablecell.style.height = "300px";
            tablecell.style.width = "300px";

            tablerow.appendChild(tablecell)
        }
        tablebase.append(tablerow)
        
    }
    divband.appendChild(tablebase)

}
addMultTable(2,3)