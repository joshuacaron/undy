import assert from 'assert'
import undy, {configure} from '../index.js'

describe('undy', () => {
  it('should return the original value if calling .value immediately', () => {
    let obj = {a: 'b'}
    let primitive = 'test'
    let undef = undefined

    assert.equal(obj, undy(obj).value)
    assert.equal(primitive, undy(primitive).value)
    assert.equal(undefined, undy(undef).value)
  })

  it('should return the nested value if it exists', () => {
    let x = {a: {b: {c: 'd'}}}

    assert.equal(x.a, undy(x).a.value)
    assert.equal(x.a.b, undy(x).a.b.value)
    assert.equal(x.a.b.c, undy(x).a.b.c.value)
  })

  it('should return undefined for any values not in an object chain', () => {
    let x = {a: {b: {c: 'd'}}}

    assert.equal(undefined, undy(x).z.value)
    assert.equal(undefined, undy(x).a.c.value)
    assert.equal(undefined, undy(x).a.b.c.d.value)
  })

  it('should return undefined for property access on primitive values', () => {
    let primitive = 'hi'
    let undef = undefined

    assert.equal(undefined, undy(primitive).hello.value)
    assert.equal(undefined, undy(undef).test.value)
  })

  it('should set values properly on the original object', () => {
    let x = {a: {b: {c: 'd'}}}
    let wrapped = undy(x)

    wrapped.a = 'testing'

    assert.equal('testing', wrapped.a.value)
    assert.equal('testing', x.a)
  })
})

describe('undy.configure', () => {
  it('should change .value to whatever is set in configure', () => {
    let x = {a: 'b', value: 'hello'}

    const unWrap = Symbol.for('undy')

    configure(unWrap)

    assert.equal(x, undy(x)[unWrap])
    assert.equal('b', undy(x).a[unWrap])
    assert.equal(undefined, undy(x).b.a[unWrap])
  })

  it('should not bind on .value once changed', () => {
    let x = {a: 'b', value: 'hello'}

    const unWrap = Symbol.for('undy')

    configure(unWrap)

    assert.equal('hello', undy(x).value[unWrap])
    assert.equal(undefined, undy(x).a.value[unWrap])
  })
})
