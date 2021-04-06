const getNodes = (slot, args = null) => {
  // slots are functions in vue 3
  if (typeof slot == "function") {
    return slot(args)
      .filter(({ type }) => {
        if (typeof type == "symbol")
          // filters comments in slot
          return !["Symbol(Comment)"].includes(type.toString());
        return true;
      })
      .map((n) => (n.children instanceof Array ? n.children : [n]))
      .reduce((nodes, n) => [...nodes, ...n], []);
  }

  return slot;
}

export { getNodes }