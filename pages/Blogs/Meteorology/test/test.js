const form = document.getElementById("FirstValue");

let a = 1

function math() {
    let b = a++;
    return b;
                
}
function print(){
    document.getElementById("demo").innerHTML = math();
}