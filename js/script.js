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
        },
        name: 'John',
    };
    
    const deepFreeze = function(obj) {
        const allProps = Object.getOwnPropertyNames(obj);

        for (const keyName in obj) {
            let prop = obj[keyName];
            if(typeof prop === 'object') {
                deepFreeze(prop);
            }
        }

        for(const prop of allProps) {
            Object.defineProperty(obj, prop, {
                writable: false,
                enumerable: false,
                configurable: false
            });
        }
    }

    console.log (user.data.d.d1.c2); // 3
    user.data.d.d1.c2 = 134;
    console.log (user.data.d.d1.c2); // 134
    
    deepFreeze(user);
    
    user.data.d.d1.c2 = 3; // TypeError
    console.log (user.data.d.d1.c2);

})();

