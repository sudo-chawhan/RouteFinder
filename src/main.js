var grid_div = document.getElementById("griddiv");
n = 60
m = 30
h = window.innerHeight;
w = window.innerWidth-100;

var display = new Display(grid_div);

display.make_grids(m, n, String((h/m))+"px", String((w/n))+"px");

// making a new logics file
logic = new Logic(display, m, n);

// handling mouse input
// might need access to grid state therefore we'll put this in main
{
    var mouseC = {  // mouse controllers
        wallc : false,
        startc : false,
        endc : false
    };
    var onMouseOver = function(){    
        // handle start
        if(mouseC.startc || mouseC.endc)
            return;
        
        // handle wall
        if(mouseC.wallc){
            display.make_wall(this.id);
        }
    };
    var onMouseUp = function(){
        // handle start
        if(mouseC.startc || mouseC.endc)
            return;

        // hanlde wall
        mouseC.wallc = false;
    };
    var onMouseDown = function(){
        // handle start
        if(mouseC.startc || mouseC.endc)
            return;

        // handle wall
        mouseC.wallc = true;
        if(mouseC.wallc){
            display.make_wall(this.id);
        }
    };
    var onMouseClick = function(){
        
        if(mouseC.startc){
            logic.updateStart(this.id);
            mouseC.startc = false;
        }else if(mouseC.endc){
            logic.updateEnd(this.id);
            mouseC.endc = false;
        }
    };

    var addMouseEvents = function(r,c){
        for(i=0;i<r;i++){
            for(j=0;j<c;j++){
                id = String(i)+","+String(j);
                var temp = document.getElementById(id);
                temp.onmousedown = onMouseDown;
                temp.onmouseup = onMouseUp;
                temp.onmouseover = onMouseOver;
                temp.onclick = onMouseClick;
            }
        }
    };

    // logic.update();
    addMouseEvents(m,n);

    // to start the route finder
    var runButton = document.getElementById("run");
    runButton.onclick = ()=>{
        logic.update();
    };
    var startButton = document.getElementById("startnode");
    startButton.onclick = ()=>{
        mouseC.startc = true;
        mouseC.endc = false;
        mouseC.wallc = false;
        
    };
    var endButton = document.getElementById("endnode");
    endButton.onclick = ()=>{
        mouseC.startc = false;
        mouseC.endc = true;
        mouseC.wallc = false;
    };
}
// end of mouse handlers

var resize = function(){   
    h = window.innerHeight;
    w = window.innerWidth;
    display.resize_grid(m, n, String((h/m))+"px", String((w/n))+"px");
};

window.addEventListener("resize", resize);


