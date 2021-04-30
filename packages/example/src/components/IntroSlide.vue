<template>
  <div class="bg-green-500 text-lg text-white p-4 pt-20">
    <h1 class="text-5xl font-semibold">vue insta stories</h1>
    <p class="mt-4">Renders vue components right into your stories.</p>
    <p class="mt-4">Possibilities are endless, here is an image!</p>
    <div class="mt-4 rounded-1">
      <img class="rounded-lg" src="https://picsum.photos/350/200/" />
    </div>
    <p class="mt-4">Or here, a text input!</p>

    <div
      style="width: 280px"
      class="mt-4 text-center bg-gray-900 p-4 rounded-lg flex flex-col"
    >
      <h1 class="text-lg font-semibold">Ask me anything!</h1>
      <input
        placeholder="Type something... "
        class="mt-4 text-center bg-gray-800 p-4 rounded-lg"
      />
    </div>
  </div>
</template>