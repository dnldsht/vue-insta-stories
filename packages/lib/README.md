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
| `loop`            | Boolean          | false    | Loop through stories                                               |
| `currentIndex`    | Number           | 0        | Set the current story index                                        |
| **Events**      |                    |          |                                                                    |
| `storyStart`    | Function(Number)   | -        | Callback when a story starts                                       |
| `storyEnd`      | Function(Number)   | -        | Callback when a story ends                                         |
| `allStoriesEnd` | Function()         | -        | Callback when all stories in the array have ended                  |

### Story Object
| Property   | Description                                                          |
|------------|----------------------------------------------------------------------|
| `url`      | The url of the resource, image or video.                             |
| `type`     | Optional. Type of the story. `'image' \| 'video'`                    |
| `duration` | Optional. Duration for which a story should persist.                 |
| `template` | Optional. Renders story in a different template see more below.      |
| `seeMore`  | Optional. Enable see more on story (`true \| { label: 'See more!' }` |

## Style
```scss
/** full screen on mobile & fixed size on desktop **/
.ig-stories {
  position: absolute;
  height: 100vh;
  height: -webkit-fill-available;
  width: 100vw;
  top: 0;
}

@media (min-width: 768px) {
  .ig-stories {
    position: relative;
    height: 730px;
    width: 420px;
  }
}
```
if you are using tailwind you can write 
```html
<Stories class="absolute top-0 h-100vh w-100vw md:(h-730px w-420px relative)" />
```

## With header
```vue
<template>
  <Stories :stories="items">
    <template #header="{story}" >
      <story-header :story="story" />
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