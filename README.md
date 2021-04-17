<h1 align="center">vue-insta-stories</h1>

<p align="center">
  Vue component for Instagram stories
</p>

<br/>
<img height="600" src="https://i.imgur.com/gyX0XFw.png"/>

## Install
```bash
yarn add vue-insta-stories # work with vue 2/3
```

## Simple usage
```vue
<template>
  <Stories :stories="items" />
</template>

<script>
import { Stories } from "vue-insta-stories";
export default {
  components: { Stories },
  data: () => ({
    items: [
      "https://picsum.photos/350/200/",
      "https://picsum.photos/400/201/",
      {
        url: "https://file-examples-com.github.io/5mb.mp4",
        type: "video",
      },
    ]
  })
};
</script>
```

### Props
| Property          | Type             | Default  | Description                                                        |
|-------------------|------------------|----------|--------------------------------------------------------------------|
| `stories`         | [String/Object]  | required | An array of image urls or array of story objects (more info below) |
| `interval`        | Number           | 2000     | Story duration in milliseconds                                     |
| `isPaused`        | Boolean          | false    | Toggle the playing state                                           |
| `currentIndex`    | Number           | 0        | Set the current story index                                        |
| **Events**        |                  |          |                                                                    |
| `onStoryStart`    | Function(Number) | -        | Callback when a story starts                                       |
| `onStoryEnd`      | Function(Number) | -        | Callback when a story ends                                         |
| `onAllStoriesEnd` | Function()       | -        | Callback when all stories in the array have ended                  |

### Story Object
| Property   | Description                                                     |
|------------|-----------------------------------------------------------------|
| `url`      | The url of the resource, image or video.                        |
| `type`     | Optional. Type of the story. 'image'\|'video'                   |
| `duration` | Optional. Duration for which a story should persist.            |
| `template` | Optional. Renders story in a different template see more below. |

## With header
```vue
<template>
  <Stories :stories="items">
    <template #header>
      <story-header />
    </template>
  </Stories>
</template>

<script>
import { Stories } from "vue-insta-stories";
export default {
  components: { Stories },
  data: () => ({
    items: [ "https://picsum.photos/350/200/"]
  })
};
</script>
```

## With custom slot
```vue
<template>
  <Stories :stories="items">
    <template #pool="{story}">
        <pool-story :story="story" class="flex-grow"></pool-story>
    </template>
  </Stories>
</template>

<script>
import { Stories } from "vue-insta-stories";
export default {
  components: { Stories },
  data: () => ({
    items: [{ poolId: 23, template: "pool" }]
  })
};
</script>
```

## Credits
This project was inspired by @kayue [work](https://github.com/kayue/vue-story-example)

## Features
- Timer and timeline on the top
- Hold to pause current slide
- Tap to navigate between slides

## License
MIT - Copyright (c) 2021 Uneven Software
