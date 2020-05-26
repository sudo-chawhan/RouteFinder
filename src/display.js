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
    render:function(gridstate, r, c){
        for(i=0;i<r;i++){
            for(j=0;j<c;j++){
                id = String(i)+","+String(j);
                var temp = document.getElementById(id);
                state = gridstate[i*c + j];
                if(state == 100){   // end
                    temp.style.backgroundColor = 'red';
                }else if(state < 100 && state>0){   // visited
                    temp.style.backgroundColor = 'rgb(0,'+String(10*state)+',0)';
                }else if(state==600){   // path
                    temp.style.backgroundColor = 'yellow';
                }else if(state==700){   // start
                    temp.style.backgroundColor = 'pink';
                }
                else{
                    temp.style.backgroundColor = 'white';
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