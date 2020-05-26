function main(){
    var grid_div = document.getElementById("griddiv");
    n = 60
    m = 30
    h = window.innerHeight;
    w = window.innerWidth-100;

    var display = new Display(grid_div);

    display.make_grids(m, n, String((h/m))+"px", String((w/n))+"px");
   
    // handling mouse input
    // might need access to grid state therefore we'll put this in main
    wall = false;
    start = false;
    end = false;
    var onMouseOver = function(){    
        // handle start
        if(start || end)
            return;
        
        // handle wall
        if(wall){
            var temp = document.getElementById(this.id);
            temp.style.backgroundColor = "rgb(92, 80, 255)";
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
            var temp = document.getElementById(this.id);
            temp.style.backgroundColor = "rgb(92, 80, 255)";
            // temp.classList.add("squareSelected");
        }
    };
    var onMouseClick = function(){
        console.log(start);
        console.log(end);
        
        if(start){
            id = (this.id).split(',');
            logic.start = [parseInt(id[0]), parseInt(id[1])];
            var temp = document.getElementById(this.id);
            temp.style.backgroundColor = "pink";
            start = false;
        }else if(end){
            id = (this.id).split(',');
            logic.end = [parseInt(id[0]), parseInt(id[1])];
            var temp = document.getElementById(this.id);
            temp.style.backgroundColor = "red";
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

    logic = new Logic(display, m, n);
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
        console.log(start , end);
        
    };
    var endButton = document.getElementById("endnode");
    endButton.onclick = ()=>{
        start = false;
        end = true;
        toggle = false;
    };

    var resize = function(){   
        h = window.innerHeight;
        w = window.innerWidth;
        display.resize_grid(m, n, String((h/m))+"px", String((w/n))+"px");
    };

    window.addEventListener("resize", resize);
}

main();