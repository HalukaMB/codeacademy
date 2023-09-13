let base =1
document.getElementById("test").innerHTML="HELLO WORLD"
console.log("hey")
const keys_file=fetch("discogs.keys")
.then((res) => res.text())
.then((text) => console.log(text))

