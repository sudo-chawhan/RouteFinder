function main(){
    var grid_div = document.getElementById("griddiv");
    n = 40
    m = 20
    h = window.innerHeight;
    w = window.innerWidth;

    var display = new Display(grid_div);

    display.make_grids(m, n, String((h/m))+"px", String((w/n))+"px");
   
    // handling mouse input
    // might need access to grid state therefore we'll put this in main
    toggle = false;
    var onMouseOver = function(){    
        console.log("hover");
        
        if(toggle){
            var temp = document.getElementById(this.id);
            temp.classList.add("squareSelected");
        }
    };
    var onMouseUp = function(){
        toggle = false;
    };
    var onMouseDown = function(){
        toggle = true;

        if(toggle){
            var temp = document.getElementById(this.id);
            temp.classList.add("squareSelected");
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
            }
        }
    };

    logic = new Logic();

    addMouseEvents(m,n);

    var resize = function(){   
        console.log(toggle); 
        h = window.innerHeight;
        w = window.innerWidth;
        display.resize_grid(m, n, String((h/m))+"px", String((w/n))+"px");
    };

    window.addEventListener("resize", resize);
}

main();