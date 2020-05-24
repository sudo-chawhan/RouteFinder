function main(){
    var grid_div = document.getElementById("griddiv");
    n = 40
    m = 20
    h = window.innerHeight;
    w = window.innerWidth;

    var display = new Display(grid_div);

    display.make_grids(m, n, String((h/m))+"px", String((w/n))+"px");

    var resize = function(){    
        h = window.innerHeight;
        w = window.innerWidth;
        display.resize_grid(m, n, String((h/m))+"px", String((w/n))+"px");
    };

    window.addEventListener("resize", resize);
}

main();