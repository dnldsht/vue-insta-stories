// export * from './slots'
export * from './anim'


const getX = (e: MouseEvent | TouchEvent) => {
  if (e instanceof MouseEvent)
    return e.clientX
  const touch = e.touches[0] ?? e.changedTouches[0]
  return touch.clientX
}

export { getX }