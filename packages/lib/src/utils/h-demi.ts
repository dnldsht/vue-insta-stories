import { h as hDemi, isVue2 } from 'vue-demi'

interface Options {
  // class?: Object
  // style?: Object
  props?: Object,
  domProps?: Object
  on?: Object
}

const h = (type: String | Object, options: Options & any = {}, chidren?: any) => {
  if (isVue2) {
    return hDemi(type, options, chidren)
  }

  const { props, domProps, on } = options
  const params = { ...options, ...props, ...domProps, ...on }
  return hDemi(type, params, chidren)
}

export default h