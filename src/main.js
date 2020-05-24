var grid_div = document.getElementById("griddiv");
toggle = false;
function onHover(){
    console.log("hover");
    
    if(toggle){
        var temp = document.getElementById(this.id);
        temp.classList.add("squareSelected");
    // console.log(event.srcElement.id);
    }
}

function onClick(){
    toggle = true;
    if(toggle){
        var temp = document.getElementById(this.id);
        temp.classList.add("squareSelected");
    // console.log(event.srcElement.id);
    }
}

function onRelease(){
    console.log("release");
    
    toggle = false;
}

var make_button = function(h, w, id){
    var button = document.createElement("button");
    button.setAttribute("class", "square");
    button.style.height = h;
    button.style.width = w;
    button.setAttribute("id", id);
    return button;
};

var make_grids = function(g, r, c, h, w){
    // console.log(w);
    
    for(i=0;i<r;i++){
        var divi = document.createElement("div");
        divi.setAttribute("class", "board-row");
        for(j=0;j<c;j++){
            id = String(i)+","+String(j);
            divi.appendChild(make_button(h, w, id));
        }
        g.appendChild(divi);
        for(j=0;j<c;j++){
            id = String(i)+","+String(j);
            var temp = document.getElementById(this.id);
            temp.onmousedown = onClick;
            temp.onmouseup = onRelease;
            temp.onmouseover = onHover;
        }
    }
    // g.appendChild(make_button("20px","20px"));
};
// grid_div.appendChild(make_button("20px","20px"));
n = 40
m = 20
h = window.innerHeight;
w = window.innerWidth;
// w = document.body.offsetWidth;
console.log(w, h);

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

make_grids(grid_div, m, n, String((h/m))+"px", String((w/n))+"px");
// var temp = document.getElementById("1,1");
// temp.classList.add("squareSelected");

resize_grid = function(r, c, h, w){
    for(i=0;i<r;i++){
        // var divi = document.createElement("div");
        // divi.setAttribute("class", "board-row");
        for(j=0;j<c;j++){
            id = String(i)+","+String(j);
            
            var temp = document.getElementById(id);
            temp.style.height = h;
            temp.style.width = w;
            // divi.appendChild(make_button(h, w, id));
        }
        // g.appendChild(divi);
    }
};

resize = function(){    
    // n = 40
    // m = 20
    h = window.innerHeight;
    w = window.innerWidth;
    resize_grid(m, n, String((h/m))+"px", String((w/n))+"px");
};

window.addEventListener("resize", resize);