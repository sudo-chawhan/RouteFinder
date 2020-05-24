function bfs(s, e, graph, m, n){
    queue = [];
    queue.push(s);
    newGraph = graph;
    visited = new Array[m*n];
    while(queue.length!=0){
        temp = queue;
        while(temp.length!=0){
            first = temp.shift();
            var fi = first[0];
            var fj = first[1];
            if(fi==e[0] && fj==e[1]){
                // found node
                newGraph[fi][fj]=100;
                return newGraph;
            }
            
            // add new elements

        }
    }

    return newGraph;
}
