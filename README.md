<h1 align="center">vue-insta-stories</h1>

<p align="center">
  Vue component for Instagram stories
</p>

## Install
```bash
yarn add vue-insta-stories 
```

## Usage
```vue
<template>
  <Story>
    <div class="slide">
      I'm the first story :)
    </div>
    <div class="slide">
      <img src="https://pic.com/113122.png"/>
    </div>
    <!-- Any component can appear in a story -->
  </Story>
</template>

<script>
import Story from "vue-insta-stories";
export default {
  components: { Story },
};
</script>
<style scoped>
.slide {
  /* Take the rest of the page */
  flex-grow: 1;

  /* Center align */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

## Credits
This project was inspired by @kayue [work](https://github.com/kayue/vue-story-example)

## Features
- Timer and timeline on the top
- Hold to pause current slide
- Tap to navigate between slides
- Swipe to navigate between stories

## License
MIT - Copyright (c) 2021 Uneven Software
