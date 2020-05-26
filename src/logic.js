// const bfs = require('../algos/bfs')
function bfs(s, e, graph, m, n){
    newGraph = graph;
    parent = new Array(m*n);
    visited = new Array(m*n);
    for(i=0;i<m*n;i++){
        visited[i] = false;
        parent[i] = null;
    }

    newGraph[s[0]*n + s[1]] = 400;
    
    var step = 0;
    queue = [];
    queue.push([s[0], s[1]]);
    queue.push(null);
    
    visited[s[0]*n + s[1]] = true;
    var found = false;

    while(queue.length!=0 && !found){
        step += 1;
        
        while(queue[0]!=null && !found){
            first = queue.shift();
            
            var fi = first[0];
            var fj = first[1];
            if(fi==e[0] && fj==e[1]){
                // found node
                console.log(fi*n + fj);
                
                newGraph[fi*n + fj]=globalcodes.END;
                found = true;
            }
            
            // add new elements
            var ni, nj;

            if(fj!=0){
                ni = fi;
                nj = fj-1;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);
                    parent[ni*n + nj] = [fi, fj];

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=globalcodes.VISITED;    // visited
                }
            }
            if(fi!=0){
                ni = fi-1;
                nj = fj;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);
                    parent[ni*n + nj] = [fi, fj];

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=globalcodes.VISITED;    // visited
                }
            }
            if(fi!=m-1){
                ni = fi+1;
                nj = fj;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);
                    parent[ni*n + nj] = [fi, fj];

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=globalcodes.VISITED;    // visited
                }
            }
            if(fj!=n-1){
                ni = fi;
                nj = fj+1;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);
                    parent[ni*n + nj] = [fi, fj];

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=globalcodes.VISITED;    // visited
                }
            }
        }
        queue.shift();
        queue.push(null);
    }

    pathnodes = e;
    while(parent[pathnodes[0]*n + pathnodes[1]]!=null){
        pathnodes = parent[pathnodes[0]*n + pathnodes[1]];
        newGraph[pathnodes[0]*n + pathnodes[1]] = globalcodes.PATH;      // set as path node
    }
    newGraph[s[0]*n + s[1]] = globalcodes.START;
    return newGraph;
}

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
    updateStart:function(id_){

        id = id_.split(',');
        this.start = [parseInt(id[0]), parseInt(id[1])];
        this.display.make_start(id_);
    },
    updateEnd:function(id_){
        
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
    }
};

// gr = new Array(m*n);
// for(i=0; i<m*n; i++){
//     gr[i] = 0;
// }
// console.log(bfs.bfs([0,0], [3,2], gr, 5, 5));