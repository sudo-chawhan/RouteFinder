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
    console.log(m,n);
    
    var step = 0;
    queue = [];
    queue.push([s[0], s[1]]);
    queue.push(null);
    
    visited[s[0]*n + s[1]] = true;
    var found = false;

    while(queue.length!=0 && !found){
        // temp = queue;
        step += 1;
        console.log("new");
        
        while(queue[0]!=null && !found){
            first = queue.shift();
            console.log(first);
            
            var fi = first[0];
            var fj = first[1];
            if(fi==e[0] && fj==e[1]){
                // found node
                console.log(fi*n + fj);
                
                newGraph[fi*n + fj]=100;
                // return newGraph;
                found = true;
            }
            
            // add new elements
            var ni, nj;
            // if(fi!=0 && fj!=0){
            //     ni = fi-1;
            //     nj = fj-1;
            //     if(!visited[ni*n + nj]){
            //         queue.push([ni,nj]);
            //         parent[ni*n + nj] = [fi, fj];

            //         visited[ni*n + nj] = true;
            //         newGraph[ni*n + nj]=step;    // visited
            //     }
            // }
            if(fj!=0){
                ni = fi;
                nj = fj-1;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);
                    parent[ni*n + nj] = [fi, fj];

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            if(fi!=0){
                ni = fi-1;
                nj = fj;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);
                    parent[ni*n + nj] = [fi, fj];

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            // if(fi!=m-1 && fj!=n-1){
            //     ni = fi+1;
            //     nj = fj+1;
            //     if(!visited[ni*n + nj]){
            //         queue.push([ni,nj]);
            //         parent[ni*n + nj] = [fi, fj];

            //         visited[ni*n + nj] = true;
            //         newGraph[ni*n + nj]=step;    // visited
            //     }
            // }
            if(fi!=m-1){
                ni = fi+1;
                nj = fj;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);
                    parent[ni*n + nj] = [fi, fj];

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            if(fj!=n-1){
                ni = fi;
                nj = fj+1;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);
                    parent[ni*n + nj] = [fi, fj];

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            // if(fi!=0 && fj!=n-1){
            //     ni = fi-1;
            //     nj = fj+1;
            //     if(!visited[ni*n + nj]){
            //         queue.push([ni,nj]);
            //         parent[ni*n + nj] = [fi, fj];

            //         visited[ni*n + nj] = true;
            //         newGraph[ni*n + nj]=step;    // visited
            //     }
            // }
            // if(fi!=m-1 && fj!=0){
            //     ni = fi+1;
            //     nj = fj-1;
            //     if(!visited[ni*n + nj]){
            //         queue.push([ni,nj]);
            //         parent[ni*n + nj] = [fi, fj];

            //         visited[ni*n + nj] = true;
            //         newGraph[ni*n + nj]=step;    // visited
            //     }
            // }
            // if !visited
            //      add vertex
        }
        queue.shift();
        queue.push(null);
    }

    pathnodes = e;
    while(parent[pathnodes[0]*n + pathnodes[1]]!=null){
        pathnodes = parent[pathnodes[0]*n + pathnodes[1]];
        newGraph[pathnodes[0]*n + pathnodes[1]] = 600;      // set as path node
    }
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
    update:function(){
        // console.log("first", this.grid);
        this.refresh();
        
        this.grid = bfs(this.start, this.end, this.grid, this.rows, this.columns);
        // console.log("new", this.grid);
        console.log(this.grid[123]);
        this.display.render(this.grid, this.rows, this.columns);
    },
    refresh:function(){
        for(i=0;i<this.rows;i++){
            for(j=0;j<this.columns;j++){
                this.grid[i*this.columns+j]=0;
            }
        }
        this.grid[this.start[0]*this.columns+this.start[1]]=700;
        this.grid[this.end[0]*this.columns+this.end[1]]=100;
    }
};

// gr = new Array(m*n);
// for(i=0; i<m*n; i++){
//     gr[i] = 0;
// }
// console.log(bfs.bfs([0,0], [3,2], gr, 5, 5));