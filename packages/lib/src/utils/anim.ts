const fadeOut = (el: HTMLElement) => {
  el.animate([ // keyframes
    // { opacity: 1 },
    { opacity: 0 }
  ], { // options
    duration: 200,
    fill: 'forwards',
  }
  );
}

const fadeIn = (el: HTMLElement) => {
  el.animate([ // keyframes
    //{ opacity: 0 },
    { opacity: 1 }
  ], { // options
    duration: 200,
    fill: 'forwards',
  }
  );
}

export { fadeOut, fadeIn }