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
    updateStart:function(id_){

        // set old start as empty
        this.display.make_empty(String(this.start[0])+','+String(this.start[1]));
        // set new start
        id = id_.split(',');
        this.start = [parseInt(id[0]), parseInt(id[1])];
        this.display.make_start(id_);
    },
    updateEnd:function(id_){
        
        // set old end as empty
        this.display.make_empty(String(this.end[0])+','+String(this.end[1]));
        // set new end
        id = id_.split(',');
        this.end = [parseInt(id[0]), parseInt(id[1])];
        this.display.make_end(id_);
    },
    update:function(){
        this.refresh();
        
        this.grid = bfs(this.start, this.end, this.grid, this.rows, this.columns);
        this.display.render(this.grid, this.rows, this.columns);
    },
    refresh:function(){
        for(i=0;i<this.rows;i++){
            for(j=0;j<this.columns;j++){
                this.grid[i*this.columns+j]=globalcodes.EMPTY;
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