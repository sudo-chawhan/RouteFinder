function bfs(s, e, graph, m, n){
    newGraph = graph;
    visited = new Array(m*n);
    for(i=0;i<m*n;i++){
        visited[i] = false;
    }
    var step = 0;
    queue = [];
    queue.push(s);
    queue.push(null);
    
    visited[s[0]*n + s[1]] = true;

    while(queue.length!=0){
        // temp = queue;
        step += 1;
        // console.log("new");
        
        while(queue[0]!=null){
            first = queue.shift();
            // console.log(first);
            
            var fi = first[0];
            var fj = first[1];
            if(fi==e[0] && fj==e[1]){
                // found node
                newGraph[fi*n + fj]=100;
                return newGraph;
            }
            
            // add new elements
            var ni, nj;
            if(fi!=0 && fj!=0){
                ni = fi-1;
                nj = fj-1;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            if(fj!=0){
                ni = fi;
                nj = fj-1;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            if(fi!=0){
                ni = fi-1;
                nj = fj;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            if(fi!=m-1 && fj!=n-1){
                ni = fi+1;
                nj = fj+1;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            if(fi!=m-1){
                ni = fi+1;
                nj = fj;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            if(fj!=n-1){
                ni = fi;
                nj = fj+1;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            if(fi!=0 && fj!=n-1){
                ni = fi-1;
                nj = fj+1;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            if(fi!=m-1 && fj!=0){
                ni = fi+1;
                nj = fj-1;
                if(!visited[ni*n + nj]){
                    queue.push([ni,nj]);

                    visited[ni*n + nj] = true;
                    newGraph[ni*n + nj]=step;    // visited
                }
            }
            // if !visited
            //      add vertex
        }
        queue.shift();
        queue.push(null);
    }

    return newGraph;
}

// exports.bfs = bfs;
n=5,m=6;
gr = new Array(m*n);
for(i=0; i<m*n; i++){
    gr[i] = 0;
}
bfs([0,0], [1,2], gr, m, n);

for(i=0; i<m; i++){
    a = [];
    for(j=0; j<n; j++){
        a.push(gr[i*n+j]);
    }
    console.log(a);
    
}