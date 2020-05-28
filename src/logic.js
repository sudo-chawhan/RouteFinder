// const bfs = require('../algos/bfs')
Logic = function(display, m, n){
    this.display = display;
    this.rows = m;
    this.columns = n;
    gr = new Array(m*n);
    for(i=0; i<m*n; i++){
        gr[i] = 0;
    }
    this.grid = gr;
    this.start = [5,5];
    this.end = [10,10];
    this.running = false;
};

Logic.prototype = {
    constructor: Logic,
    isStart:function(id_){
        id = id_.split(',');
        s = [parseInt(id[0]), parseInt(id[1])];
        return this.start[0]==s[0] && this.start[1]==s[1];
    },
    isEnd:function(id_){
        id = id_.split(',');
        e = [parseInt(id[0]), parseInt(id[1])];
        return this.end[0]==e[0] && this.end[1]==e[1];
    },
    isWall:function(id_){
        id = id_.split(',');
        return this.grid[parseInt(id[0])*this.columns + parseInt(id[1])] == globalcodes.WALL;
    },
    addWall: function(id_){
        // set new start
        id = id_.split(',');
        this.grid[parseInt(id[0])*this.columns + parseInt(id[1])] = globalcodes.WALL;
        this.display.make_wall(id_);
    },
    deleteWall: function(id_){
        // set new start
        id = id_.split(',');
        this.grid[parseInt(id[0])*this.columns + parseInt(id[1])] = globalcodes.EMPTY;
        this.display.delete_wall(id_);
    },
    updateStart:function(id_){

        // set old start as empty
        startId = String(this.start[0])+','+String(this.start[1]);
        this.display.delete_start(startId);
        this.display.make_empty(startId);
        // set new start
        id = id_.split(',');
        this.start = [parseInt(id[0]), parseInt(id[1])];
        this.display.make_start(id_);
    },
    updateEnd:function(id_){
        
        // set old end as empty
        endId = String(this.end[0])+','+String(this.end[1]);
        this.display.delete_start(endId);
        this.display.make_empty(endId);
        // set new end
        id = id_.split(',');
        this.end = [parseInt(id[0]), parseInt(id[1])];
        this.display.make_end(id_);
    },
    update:async function(animate){      
        this.running = true;
        this.refreshScreen();  
        await bfs(this.start, this.end, this.grid, this.rows, this.columns, this.display, animate);
        this.display.render(this.grid, this.rows, this.columns);
        this.running = false;
    },
    refresh:function(){
        for(i=0;i<this.rows;i++){
            for(j=0;j<this.columns;j++){
                id = String(i)+','+String(j);
                switch(this.grid[i*this.columns+j]){
                    case globalcodes.START: this.display.delete_start(id); this.grid[i*this.columns+j]=globalcodes.EMPTY; break;
                    case globalcodes.END: this.display.delete_end(id); this.grid[i*this.columns+j]=globalcodes.EMPTY; break;
                    case globalcodes.PATH: this.display.delete_path(id); this.grid[i*this.columns+j]=globalcodes.EMPTY; break;
                    case globalcodes.VISITED: this.display.delete_visited(id); this.grid[i*this.columns+j]=globalcodes.EMPTY;  break;
                    case globalcodes.EMPTY: break;
                }
            }
        }
        this.grid[this.start[0]*this.columns+this.start[1]]=globalcodes.START;
        this.grid[this.end[0]*this.columns+this.end[1]]=globalcodes.END;
        
    },
    refreshScreen:function(){
        this.refresh();
        this.display.render(this.grid, this.rows, this.columns);

    }
};

// gr = new Array(m*n);
// for(i=0; i<m*n; i++){
//     gr[i] = 0;
// }
// console.log(bfs.bfs([0,0], [3,2], gr, 5, 5));