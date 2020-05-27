Display = function(gridDiv){
    // this.toggle = false;
    this.gridview = gridDiv;
};

Display.prototype = {
    constructor: Display,
    // handling display
    make_button:function(h, w, id){
        var button = document.createElement("button");
        button.classList.add("square");
        button.classList.add("fa");
        button.style.height = h;
        button.style.width = w;
        button.id = id;
        return button;
    },
    make_start:function(id){
        var temp = document.getElementById(id);
        
        temp.style.backgroundImage = "url(../files/imgs/target.png)";
        temp.classList.add("popout-effect");
    },
    delete_start:function(id){
        var temp = document.getElementById(id);
        
        temp.style.backgroundImage = "none";
        temp.classList.remove("popout-effect");
    },
    make_end:function(id){
        var temp = document.getElementById(id);
        
        temp.style.backgroundImage = "url(../files/imgs/target.png)";
        temp.classList.add("popout-effect");
    },
    delete_end:function(id){
        var temp = document.getElementById(id);
        
        temp.style.backgroundImage = "none";
        temp.classList.remove("popout-effect");
    },
    make_wall:function(id){  
        var temp = document.getElementById(id);
        // temp.classList.add("noborder");
        temp.style.backgroundImage = "url(../files/imgs/mountain.png)";
        temp.classList.add("popout-effect");
        // temp.style.backgroundColor = globalcolors.WALL;
    },
    delete_wall:function(id){
        var temp = document.getElementById(id);
        
        temp.style.backgroundImage = "none";
        temp.classList.remove("popout-effect");
    },
    make_path:function(id){
        var temp = document.getElementById(id);
        temp.classList.add("noborder");

        temp.style.backgroundImage = "url(../files/imgs/green-circle.png)";
        temp.classList.add("bubble-effect");
    },
    delete_path:function(id){
        var temp = document.getElementById(id);
        
        temp.style.backgroundImage = "none";
        temp.classList.remove("bubble-effect");
        temp.classList.remove("noborder");

    },
    make_empty:function(id){
        var temp = document.getElementById(id);
        temp.style.backgroundColor = globalcolors.EMPTY;  
    },
    make_visited:function(id){
        var temp = document.getElementById(id);
        temp.classList.add("lightborder");
        temp.style.backgroundColor = globalcolors.VISITED;  
    },
    render:function(gridstate, r, c){
        for(i=0;i<r;i++){
            for(j=0;j<c;j++){
                id = String(i)+","+String(j);
                // var temp = document.getElementById(id);
                state = gridstate[i*c + j];

                switch(state){
                    case globalcodes.START: this.make_start(id); break;
                    case globalcodes.END: this.make_end(id); break;
                    case globalcodes.PATH: this.make_path(id); break;
                    case globalcodes.VISITED: this.make_visited(id); break;
                    case globalcodes.EMPTY: this.make_empty(id); break;
                }
            }
        }
    },
    make_grids:function(r, c, h, w){
        
        for(i=0;i<r;i++){
            var divi = document.createElement("div");
            divi.setAttribute("class", "board-row");
            for(j=0;j<c;j++){
                id = String(i)+","+String(j);
                divi.appendChild(this.make_button(h, w, id));
            }
            this.gridview.appendChild(divi);
        }
    },

    resize_grid:function(r, c, h, w){
        for(i=0;i<r;i++){
            for(j=0;j<c;j++){
                id = String(i)+","+String(j);
                
                var temp = document.getElementById(id);
                temp.style.height = h;
                temp.style.width = w;
            }
        }
    }
};