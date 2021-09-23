const omit = (obj, list) => {
  if (!obj || !list || list.length <= 0) {
    return obj
  }
  let newObj = { ...obj }
  list.forEach(key => {
    newObj[key] = undefined
  });
  return newObj
}

export {
    omit
}