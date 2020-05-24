Display = function(gridDiv){
    this.toggle = false;
    this.gridview = gridDiv;
};

toggle = false;

Display.prototype = {
    constructor: Display,
    // handling mouse input

    onMouseOver:function(){    
        
        if(toggle){
            var temp = document.getElementById(this.id);
            temp.classList.add("squareSelected");
        }
    },
    onMouseUp:function(){
        toggle = false;
    },
    onMouseDown:function(){
        toggle = true;

        if(toggle){
            var temp = document.getElementById(this.id);
            temp.classList.add("squareSelected");
        }
    },
    

    // handling display
    make_button:function(h, w, id){
        var button = document.createElement("button");
        button.setAttribute("class", "square");
        button.style.height = h;
        button.style.width = w;
        button.setAttribute("id", id);
        return button;
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
        this.addMouseEvents(r,c);
    },

    addMouseEvents:function(r,c){
        for(i=0;i<r;i++){
            for(j=0;j<c;j++){
                id = String(i)+","+String(j);
                var temp = document.getElementById(id);
                temp.onmousedown = this.onMouseDown;
                temp.onmouseup = this.onMouseUp;
                temp.onmouseover = this.onMouseOver;
            }
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