document.body.style.backgroundColor = "black";
var c = document.createElement("canvas");
if (window.innerWidth > window.innerHeight) {
    c.width = window.innerHeight;
    c.height = window.innerHeight;
    var spread = (window.innerWidth-c.width)/2
} else {
    c.width = window.innerWidth;
    c.height = window.innerWidth;
    var spread = (window.innerHeight-c.height)/2
}
c.id = "canvas";
c.style = "position: absolute; top: 50%; left: 50%; transform:translate(-50%,-50%); background-color: #1f1f1f; box-shadow: 0px 0px " + spread + (spread/2) + "px " + spread + "px rgb(100,100,100);";
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

function blend_colors(color1, color2, percentage)
{
    color1 = color1 || '#000000';
    color2 = color2 || '#ffffff';
    percentage = percentage || 0.5;
    if (color1.length != 4 && color1.length != 7)
        throw new error('colors must be provided as hexes');
    if (color2.length != 4 && color2.length != 7)
        throw new error('colors must be provided as hexes');    
    if (percentage > 1 || percentage < 0)
        throw new error('percentage must be between 0 and 1');
    if (color1.length == 4)
        color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];
    else
        color1 = color1.substring(1);
    if (color2.length == 4)
        color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];
    else
        color2 = color2.substring(1);   
    color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)];
    color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];
    var color3 = [ 
        (1 - percentage) * color1[0] + percentage * color2[0], 
        (1 - percentage) * color1[1] + percentage * color2[1], 
        (1 - percentage) * color1[2] + percentage * color2[2]
    ];
    color3 = '#' + int_to_hex(color3[0]) + int_to_hex(color3[1]) + int_to_hex(color3[2]);
    return color3;
}

var cs = document.createElement("canvas");
cs.width = "10";
cs.height = "10";
cs.style = "background-color: rgb(31,31,31)";

function theCircle(x,y,radius,color){
var faded = blend_colors(color, '#111111', .5)
var ctxs = cs.getContext("2d");
ctxs.beginPath();
ctxs.arc(x, y, radius, 0, 2 * Math.PI);
ctxs.strokeStyle = color;
ctxs.stroke();
ctxs.beginPath();
ctxs.arc(x, y, radius-1, 0, 2 * Math.PI);
ctxs.strokeStyle = faded;
ctxs.stroke();

var xrun = 0;
var yrun = 0;
while(xrun < 10){
while(yrun < 10){
datapix = ctxs.getImageData(xrun,yrun, 1, 1).data;
var datapix = datapix.toString();
var runt = 0;
var runty = 0;
while(runt < datapix.length){
if(datapix.substring(runt,runt+1) === ","){
if(runty == 0){
var r = datapix.substring(0,runt);
runty += 1;
}else if(runty == 1){
var g = datapix.substring(r.length+1,runt);
runty += 1;
datapix = datapix.substring(runt+1,datapix.length);
}
}
runt = runt + 1;
}
var runt = 0;
while(runt < datapix.length){
if(datapix.substring(runt,runt+1) === ","){
var b = datapix.substring(0,runt);
var a = datapix.substring(b.length+1,datapix.length);
}
runt += 1;
}

if(a == 0){
var r = 31;
var g = 31;
var b = 31;
var a = 255;
}

myColor(xrun + 1, yrun + 1, r, g, b, a);

var yrun = yrun + 1;
}
var yrun = 0;
var xrun = xrun + 1;
}
}
function int_to_hex(num)
{
    var hex = Math.round(num).toString(16);
    if (hex.length == 1)
        hex = '0' + hex;
    return hex;
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

function drawCirc(px,py,col){
var width = 1;
var runinter = setInterval(function(){
if(width > 15){
clearInterval(runinter);
console.log("done");
}
ctx.clearRect(0, 0, c.width, c.height);
theCircle(px,py,width,col);
width += 1;
},200);
}

function restOscript() {

drawCirc(5,5,"#00FFFF");

}
