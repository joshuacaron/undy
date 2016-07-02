let value = 'value'

let undefinedHandler = staticHandlerGenerator(undefined)

function staticHandlerGenerator(staticVal) {
  return {
    get: function(target, property, receiver) {
      if (property === value) {
        return staticVal
      } else {
        return new Proxy({}, undefinedHandler)
      }
    },
  }
}

let handler = {
  get: function(target, property, receiver) {
    if (property === value) {
      return target
    } else if (typeof target[property] === 'object') {
      return new Proxy(Reflect.get(target, property, receiver), handler)
    } else if (target[property] !== undefined) {
      return new Proxy({}, staticHandlerGenerator(target[property]))
    } else {
      return new Proxy({}, undefinedHandler)
    }
  },
}

function undy(instance) {
  if (typeof instance === 'object') {
    return new Proxy(instance, handler)
  } else if (instance === undefined) {
    return new Proxy({}, undefinedHandler)
  }
  return new Proxy({}, staticHandlerGenerator(instance))
}

undy.configure = function configure(newValue) {
  value = newValue
}

export default undy