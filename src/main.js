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
    wall = false;
    start = false;
    end = false;
    var onMouseOver = function(){    
        // handle start
        if(start || end)
            return;
        
        // handle wall
        if(wall){
            display.make_wall(this.id);
        }
    };
    var onMouseUp = function(){
        // handle start
        if(start || end)
            return;

        // hanlde wall
        wall = false;
    };
    var onMouseDown = function(){
        // handle start
        if(start || end)
            return;

        // handle wall
        wall = true;
        if(wall){
            display.make_wall(this.id);
        }
    };
    var onMouseClick = function(){
        
        if(start){
            logic.updateStart(this.id);
            start = false;
        }else if(end){
            logic.updateEnd(this.id);
            end = false;
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
        start = true;
        end = false;
        toggle = false;
        
    };
    var endButton = document.getElementById("endnode");
    endButton.onclick = ()=>{
        start = false;
        end = true;
        toggle = false;
    };
}
// end of mouse handlers

var resize = function(){   
    h = window.innerHeight;
    w = window.innerWidth;
    display.resize_grid(m, n, String((h/m))+"px", String((w/n))+"px");
};

window.addEventListener("resize", resize);


