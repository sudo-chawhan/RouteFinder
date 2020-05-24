Logic = function(display, m, n){
    this.display = display;
    this.rows = m;
    this.columns = n;
    this.grid = new Array(m*n);
};

Logic.prototype = {
    constructor: Logic
};