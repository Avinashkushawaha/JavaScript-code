const obj = {
    values: [1, 2, 3],
    [Symbol.iterator]: function() {
        let index = 0;
        const values = this.values;
        return {
            next : function () {
                if (index < values.length) {
                    return { values: values[index++], done: false };
                } else {
                    return {done : true };
                    
                }
            }
        }
    }
};

for ( const value of obj) {
    console.log(value);
}