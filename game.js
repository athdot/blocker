document.body.style.backgroundColor = "black";
var c = document.createElement("canvas");
if (window.innerWidth > window.innerHeight) {
    c.width = window.innerHeight;
    c.height = window.innerHeight;
} else {
    c.width = window.innerWidth;
    c.height = window.innerWidth;
}
c.style = "position: absolute; top: 50%; left: 50%; transform:translate(-50%,-50%); background-color: #1f1f1f";
var ctx = c.getContext("2d");
var linerunner = 1;
while (linerunner <= 9) {
    ctx.fillRect((c.width / 10) * linerunner, 0, 1, window.innerHeight);
    var linerunner = linerunner + 1;
}
var linerunner = 1;
while (linerunner <= 9) {
    ctx.fillRect(0, (c.height / 10) * linerunner, window.innerHeight, 1);
    var linerunner = linerunner + 1;
}
document.body.appendChild(c);
var w = 1;
var h = 1;
while (w < 11) {
    while (h < 11) {
        var square = w + "-" + h;
        var red = document.createElement("div");
        red.style = "display:none; width: 0; height: 0;";
        red.id = "red" + square;
        red.innerHTML = "31";
        var green = document.createElement("div");
        green.style = "display:none; width: 0; height: 0;";
        green.id = "green" + square;
        green.innerHTML = "31";
        var blue = document.createElement("div");
        blue.style = "display:none; width: 0; height: 0;";
        blue.id = "blue" + square;
        blue.innerHTML = "31";
        var opacity = document.createElement("div");
        opacity.style = "display:none; width: 0; height: 0;";
        opacity.id = "opacity" + square;
        opacity.innerHTML = "255";
        document.body.appendChild(red);
        document.body.appendChild(green);
        document.body.appendChild(blue);
        document.body.appendChild(opacity);
        var h = h + 1;
    }
    var h = 1;
    var w = w + 1;
}

function myColor(place, placey, colred, colgrn, colblu, opacit) {
    document.getElementById("red" + place + "-" + placey).innerHTML = colred;
    document.getElementById("blue" + place + "-" + placey).innerHTML = colblu;
    document.getElementById("green" + place + "-" + placey).innerHTML = colgrn;
    document.getElementById("opacity" + place + "-" + placey).innerHTML = opacit;
    ctx.fillStyle = "rgba(" + document.getElementById("red" + place + "-" + placey).innerHTML + "," + document.getElementById("green" + place + "-" + placey).innerHTML + "," + document.getElementById("blue" + place + "-" + placey).innerHTML + "," + document.getElementById("opacity" + place + "-" + placey).innerHTML + ")"
    ctx.fillRect((c.width / 10 * (place - 1)) + c.width / 1000, (c.height / 10 * (placey - 1)) + c.width / 1000, c.width / 10 - c.width / 500, c.width / 10 - c.width / 500);
}
setTimeout(restOscript, 1500);

function restOscript() {
    myColor(5, 5, 255, 255, 255, 255);
    myColor(5, 6, 255, 255, 255, 255);
    myColor(6, 6, 255, 255, 255, 255);
    myColor(6, 5, 255, 255, 255, 255);
}
