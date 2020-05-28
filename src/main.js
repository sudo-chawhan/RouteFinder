var grid_div = document.getElementById("griddiv");
n = 60
m = 30
h = window.innerHeight;
w = window.innerWidth;

var display = new Display(grid_div);

display.make_grids(m, n, String((h/m))+"px", String((w/n))+"px");

// making a new logics file
logic = new Logic(display, m, n);
logic.refreshScreen();

// handling mouse input
// might need access to grid state therefore we'll put this in main
{
    var mouseC = {  // mouse controllers
        togglec : false,
        startc : false,
        startcON: false,
        endc : false,
        endcON:false,
        wallc: true,
        wallcON: false,
    };
    var onMouseOver = function(){    
        if(logic.running)
            return;
            
        // handle start
        if(mouseC.startc || mouseC.endc)
            return;
        
        // handle wall
        if(mouseC.togglec){
            if(mouseC.startcON){
                logic.updateStart(this.id);
                logic.update(false);
            }
            else if(mouseC.endcON){
                logic.updateEnd(this.id);
                logic.update(false);
            }
            else if(mouseC.wallcON){
                logic.addWall(this.id);
            }
        }
    };
    var onMouseUp = function(){
        if(logic.running)
            return;

        // handle start
        if(mouseC.startc || mouseC.endc)
            return;

        // hanlde wall
        mouseC.togglec = false;
        mouseC.startcON = false;
        mouseC.endcON = false;
        mouseC.wallcON  =false;
    };
    var onMouseDown = function(){
        if(logic.running)
            return;
            
        // handle start
        if(mouseC.startc || mouseC.endc)
            return;

        // handle wall
        mouseC.togglec = true;
        if(mouseC.togglec){
            if(logic.isStart(this.id)){
                mouseC.startcON = true;
            }
            else if(logic.isEnd(this.id)){
                mouseC.endcON = true;
            }
            else if(mouseC.wallc){
                logic.addWall(this.id);
                mouseC.wallcON = true;
            }
        }
    };
    var onMouseClick = function(){
        if(logic.running)
            return;
        
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
        if(logic.running)
            return;
        logic.update(true);
    };
    var startButton = document.getElementById("startnode");
    startButton.onclick = ()=>{
        mouseC.startc = true;
        mouseC.endc = false;
        mouseC.togglec = false;
        
    };
    var endButton = document.getElementById("endnode");
    endButton.onclick = ()=>{
        mouseC.startc = false;
        mouseC.endc = true;
        mouseC.togglec = false;
    };
}
// end of mouse handlers

var resize = function(){   
    h = window.innerHeight;
    w = window.innerWidth;
    display.resize_grid(m, n, String((h/m))+"px", String((w/n))+"px");
};

window.addEventListener("resize", resize);


