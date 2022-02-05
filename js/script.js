'use strict';

(() => {

    let user = {
        data: {
            a: 1,
            b: 2,
            c: 3,
            d: {
                a1: 1,
                b1: 2,
                c1: 3,
                d1: {
                    a2: 3,
                    b2: 3,
                    c2: 3,
                }
            },
        }
    };
    
    const deepFreeze = function(obj) {

        const propKeys = Object.getOwnPropertyNames(obj);
        
        propKeys.forEach( key => {
            const prop = obj[key];
            if(typeof prop === 'object' && prop !== null) {
                deepFreeze(prop);
            };
        });
        
        return Object.freeze(obj);
    }

    console.log (user.data.d.d1.c2); // 3
    user.data.d.d1.c2 = 134;
    console.log (user.data.d.d1.c2); // 134

    deepFreeze(user);

    user.data.d.d1.c2 = 3; // TypeError
    console.log (user.data.d.d1.c2);

})();

