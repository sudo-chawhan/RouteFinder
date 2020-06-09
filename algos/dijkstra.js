async function dijkstra(s, e, graph, m, n, display, animate){
    parent = new Array(m*n);
    dist = new Array(m*n);
    visited = new Array(m*n);
    for(i=0;i<m*n;i++){
        if(graph[i]==globalcodes.WALL)
            visited[i] = true;
        else
            visited[i] = false;
        parent[i] = null;
        dist[i] = Infinity;
    }

    graph[s[0]*n + s[1]] = globalcodes.START;
    console.log(visited[s[0]*n + s[1]]);
    dist[s[0]*n+s[1]]=0;

    var PQ = new PriorityQ();
    
    PQ.enqueue(null, -1*Infinity);
    PQ.enqueue([s,null], 0);

    animateSpeed = 2;
    animateVar = 0;
    while(!PQ.empty()){
        var top = null;
        console.log(PQ.values);
        
        while(!PQ.empty()){
            top = PQ.dequeue();
            
            if(!visited[top.val[0][0]*n + top.val[0][1]]){
                // console.log(top.val[0]);
                break;
            } 
        }

        if(top==null)
            break;
        // console.log(top);
        
        fi = top.val[0][0]; fj = top.val[0][1];
        parent[fi*n + fj] = top.val[1];
        if(fi==e[0] && fj==e[1]){
            
            graph[fi*n + fj]=globalcodes.END;
            break;
        }
        visited[fi*n + fj] = true;

        if(fj!=0){
            ni = fi;
            nj = fj-1;
            if(!visited[ni*n + nj] && dist[ni*n+nj] > dist[fi*n+fj] + 1){
                dist[ni*n+nj] = dist[fi*n+fj] + 1;
                PQ.enqueue([[ni,nj], [fi,fj]] , -1*dist[ni*n+nj]);

                graph[ni*n + nj]=globalcodes.VISITED;    // visited
            }
        }
        if(fi!=0){
            ni = fi-1;
            nj = fj;
            if(!visited[ni*n + nj] && dist[ni*n+nj] > dist[fi*n+fj] + 1){
                dist[ni*n+nj] = dist[fi*n+fj] + 1;
                PQ.enqueue([[ni,nj], [fi,fj]] , -1*dist[ni*n+nj]);

                graph[ni*n + nj]=globalcodes.VISITED;    // visited
            }
        }
        if(fi!=m-1){
            ni = fi+1;
            nj = fj;
            if(!visited[ni*n + nj] && dist[ni*n+nj] > dist[fi*n+fj] + 1){
                dist[ni*n+nj] = dist[fi*n+fj] + 1;
                PQ.enqueue([[ni,nj], [fi,fj]] , -1*dist[ni*n+nj]);

                graph[ni*n + nj]=globalcodes.VISITED;    // visited
            }
        }
        if(fj!=n-1){
            ni = fi;
            nj = fj+1;
            if(!visited[ni*n + nj] && dist[ni*n+nj] > dist[fi*n+fj] + 1){
                dist[ni*n+nj] = dist[fi*n+fj] + 1;
                PQ.enqueue([[ni,nj], [fi,fj]] , -1*dist[ni*n+nj]);

                graph[ni*n + nj]=globalcodes.VISITED;    // visited
            }
        }

        
        if(animate && animateVar==0){
            await sleep(5);
            display.render(graph, m, n);
        }
        animateVar = (animateVar+1)%animateSpeed;
    }

    if(animate){
        await sleep(5);
        display.render(graph, m, n);
    }

    pathnodes = e;
    path = [e]; // path: [e, ...., s]
    while(parent[pathnodes[0]*n + pathnodes[1]]!=null){
        
        pathnodes = parent[pathnodes[0]*n + pathnodes[1]];
        // graph[pathnodes[0]*n + pathnodes[1]] = globalcodes.PATH;       // set as path node
        path.push(pathnodes);
        console.log(pathnodes);
        
        // if(animate){
        //     await sleep(50);
        //     display.render(graph, m, n);
        // }
    }

    first = path[path.length-1];
    for(i=path.length-2;i>=1;i--){
        second = path[i];
        third = path[i-1];
        console.log(first, second, third);
        
        dir = helper.getDirection(first, second, third);
        if(dir==undefined)  // error
        {
            console.log("error");
            
            return graph;
        }
        graph[second[0]*n + second[1]] = dir;
        if(animate){
            await sleep(50);
            display.make_path(String(second[0])+","+String(second[1]), dir);
        }
        first = second;
    }
    graph[s[0]*n + s[1]] = globalcodes.START;
    return graph;

}
