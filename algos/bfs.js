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