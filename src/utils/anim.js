const fadeOut = (el) => {
  el.animate([ // keyframes
      { opacity: 1 },
      { opacity: 0 }
    ], { // options
      duration: 200, 
      fill: 'forwards',
    }
  );
}

const fadeIn = (el) => {
  el.animate([ // keyframes
      { opacity: 0 },
      { opacity: 1 }
    ], { // options
      duration: 200, 
      fill: 'forwards',
    }
  );
}

export { fadeOut, fadeIn }