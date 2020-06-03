// const globalcolors = {
//     EMPTY:'rgb(245,173,92)',
//     START:'green',
//     END:'red',
//     PATH:'yellow',
//     WALL:'brown',
//     VISITED:"rgb(92, 80, 255)",
    
// };

// const globalcodes = {
//     EMPTY:0,
//     START:100,
//     END:200,
//     PATHLR:300,
//     PATHUD:301,
//     PATHLU:302,
//     PATHLD:303,
//     PATHRU:304,
//     PATHRD:305,
//     VISITED:400,
//     WALL:500,
//     isPath:function(code){
//         if(code>=300 && code<=305)
//             return true;
//         return false;
//     }
// };

// const helper = {
//     // gives the direction from a ([,]) to c ([,]) via b ([,])
//     getDirection:function(a,b,c){
        
//         if(Math.abs(a[1]-c[1])==2){
//             return globalcodes.PATHLR;
//         }
//         if(Math.abs(a[0]-c[0])==2){
//             return globalcodes.PATHUD;
//         }
//         if((a[1]-c[1])*(a[0]-c[0])==-1){
//             // either lu or rd
//             if((a[1]-b[1])==-1 || (c[1]-b[1])==-1){
//                 return globalcodes.PATHLU;
//             }else{
//                 return globalcodes.PATHRD;
//             }

//         }
//         if((a[0]-c[0])*(a[1]-c[1])==1){
//             // either ld or ru
//             if((a[1]-b[1])==-1 || (c[1]-b[1])==-1){
//                 return globalcodes.PATHLD;
//             }else{
//                 return globalcodes.PATHRU;
//             }
//         }

//         return undefined;
//     }
// };


// class Node {
//     constructor(val, priority) {
//       this.val = val;
//       this.priority = priority;
//     }
//   }
  
//   class PriorityQ {
//     constructor() {
//       this.values = [];
//     }
  
//     empty(){
//       return this.values.length==0;
//     }
//     enqueue(val, priority) {
//       let newNode = new Node(val, priority);
//       this.values.push(newNode);
//       let index = this.values.length - 1;
//       const current = this.values[index];
  
//       while (index > 0) {
//         let parentIndex = Math.floor((index - 1) / 2);
//         let parent = this.values[parentIndex];
  
//         if (parent.priority <= current.priority) {
//           this.values[parentIndex] = current;
//           this.values[index] = parent;
//           index = parentIndex;
//         } else break;
//       }
//     }
//     dequeue() {
//       const max = this.values[0];
//       const end = this.values.pop();
//       this.values[0] = end;
  
//       let index = 0;
//       const length = this.values.length;
//       const current = this.values[0];
//       while (true) {
//         let leftChildIndex = 2 * index + 1;
//         let rightChildIndex = 2 * index + 2;
//         let leftChild, rightChild;
//         let swap = null;
  
//         if (leftChildIndex < length) {
//           leftChild = this.values[leftChildIndex];
//           if (leftChild.priority > current.priority) swap = leftChildIndex;
//         }
//         if (rightChildIndex < length) {
//           rightChild = this.values[rightChildIndex];
//           if (
//             (swap === null && rightChild.priority > current.priority) ||
//             (swap !== null && rightChild.priority > leftChild.priority)
//           )
//             swap = rightChildIndex;
//         }
  
//         if (swap === null) break;
//         this.values[index] = this.values[swap];
//         this.values[swap] = current;
//         index = swap;
//       }
  
//       return max;
//     }
//   }

  /////

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

// m=n=5;
// gr = [0,0,0,0,0,
//       0,0,0,0,0,
//      0,0,0,0,0,
//         0,0,0,0,0,
//     0,0,0,0,0];
// s=[0,0];
// e=[2,3];
// dijkstra(s, e, gr, m, n, null, false);
// for(i=0;i<m;i++){
//     x = [];
//     for(j=0;j<n;j++){
//         x.push(gr[i*n+j]);
//     }
//     console.log(x);
    
// }
// console.log(gr);

