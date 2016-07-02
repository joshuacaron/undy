undy.js
#######

undy is a small Javascript library to enable better handling for undefined values in deeply nested objects, similar to the null-conditional operator in other languages such as C#. This lets you write what you mean, and deal with undefined values only at the end instead of constantly checking for undefined values at every level of your object.

undy comprises of a single function that wraps your variable in a Proxy. All values retrieved from the new object are similarly wrapped. Call `.value` to retrieve your raw object back at any point in the chain.

Get Started
-----------

To install run `npm install undy`.

Include it in your project and use it as follows:

    import undy from 'undy'

    var a = {b: {c: {d: 'e'}}}

    // Returns either the value or undefined if somewhere in the chain an object doesn't exist
    let val = undy(a).b.c.d.value // 'e'
    val = undy(a).value // {b: {c: {d: 'e'}}}
    val = undy(a).b.x.y.z.value // undefined
    val = undy(a).b.value // {c: {d: 'e'}}

    // Mutating an object wrapped by undy updates the underlying object
    var wrapped = undy(a)
    wrapped.b.c.d = 'hello'
    console.log(a.b.c.d) // 'hello'

    // Primitives return undefined for all property access except directly calling .value
    var primitive = undy('hello')
    val = primitive.a.value // undefined
    val = primitive.a.b.c.value // undefined
    val = primitive.value // 'hello'

Compatability
-------------

undy works in all evergreen browsers, and in the latest version of Node.js. However since undy relies on ES2015 proxies, it does not work in IE 11 and below.