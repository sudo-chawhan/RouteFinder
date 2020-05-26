Display = function(gridDiv){
    // this.toggle = false;
    this.gridview = gridDiv;
};

Display.prototype = {
    constructor: Display,
    // handling display
    make_button:function(h, w, id){
        var button = document.createElement("button");
        button.setAttribute("class", "square");
        button.style.height = h;
        button.style.width = w;
        button.setAttribute("id", id);
        return button;
    },
    make_start:function(id){
        var temp = document.getElementById(id);
        temp.style.backgroundColor = globalcolors.START;
    },
    make_end:function(id){
        var temp = document.getElementById(id);
        temp.style.backgroundColor = globalcolors.END;
    },
    make_wall:function(id){  
        var temp = document.getElementById(id);
        temp.style.backgroundColor = globalcolors.WALL;
    },
    render:function(gridstate, r, c){
        for(i=0;i<r;i++){
            for(j=0;j<c;j++){
                id = String(i)+","+String(j);
                var temp = document.getElementById(id);
                state = gridstate[i*c + j];

                switch(state){
                    case globalcodes.START: temp.style.backgroundColor=globalcolors.START; break;
                    case globalcodes.END: temp.style.backgroundColor=globalcolors.END; break;
                    case globalcodes.PATH: temp.style.backgroundColor=globalcolors.PATH; break;
                    case globalcodes.VISITED: temp.style.backgroundColor=globalcolors.VISITED; break;
                    case globalcodes.EMPTY: temp.style.backgroundColor=globalcolors.EMPTY; break;
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