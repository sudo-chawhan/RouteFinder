const globalcolors = {
    EMPTY:'rgb(245,173,92)',
    START:'green',
    END:'red',
    PATH:'yellow',
    WALL:'brown',
    VISITED:"rgb(92, 80, 255)",
    
};

const globalcodes = {
    EMPTY:0,
    START:100,
    END:200,
    PATHLR:300,
    PATHUD:301,
    PATHLU:302,
    PATHLD:303,
    PATHRU:304,
    PATHRD:305,
    VISITED:400,
    WALL:500,
    isPath:function(code){
        if(code>=300 && code<=305)
            return true;
        return false;
    }
};

const helper = {
    // gives the direction from a ([,]) to c ([,]) via b ([,])
    getDirection:function(a,b,c){
        
        if(Math.abs(a[1]-c[1])==2){
            return globalcodes.PATHLR;
        }
        if(Math.abs(a[0]-c[0])==2){
            return globalcodes.PATHUD;
        }
        if((a[1]-c[1])*(a[0]-c[0])==-1){
            // either lu or rd
            if((a[1]-b[1])==-1 || (c[1]-b[1])==-1){
                return globalcodes.PATHLU;
            }else{
                return globalcodes.PATHRD;
            }

        }
        if((a[0]-c[0])*(a[1]-c[1])==1){
            // either ld or ru
            if((a[1]-b[1])==-1 || (c[1]-b[1])==-1){
                return globalcodes.PATHLD;
            }else{
                return globalcodes.PATHRU;
            }
        }

        return undefined;
    }
};


