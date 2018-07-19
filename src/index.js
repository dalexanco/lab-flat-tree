const {
  propEq,
  pipe,
  slice,
  filter,
  map,
  findLast,
  prop,
  flatten,
  takeWhile,
  curry,
  append,
  last,
} = require('ramda')

const getParent = curry((data, item) => {
  const itemIndex = data.indexOf(item)

  return pipe(
    slice(0, itemIndex),
    findLast(propEq('depth', item.depth - 1)),
  )(data)
})

const getChildrens = curry((data, item) => {
  const itemIndex = data.indexOf(item)

  return pipe(
    slice(itemIndex + 1, Infinity),
    takeWhile(({ depth: childDepth }) => childDepth > item.depth),
    filter(propEq('depth', item.depth + 1))
  )(data)
})

const pathToRoot = (item, data, acc = []) => {
  if (item.depth === 0) return [...acc, item]
  const parent = getParent(data, item)

  return pathToRoot(parent, data, [...acc, item])
}

module.exports = function openItem(key, data) {
  const item = data.find(propEq('key', key))
  const path = pathToRoot(item, data)

  return pipe(
    map(getChildrens(data)),
    flatten,
    append(last(path)),
    map(prop('key')),
  )(path)
}
