# Photo-Slider

:iphone: A simple mobile-app with the following features:

* When the app starts, it fetches `/photos` JSON data from the [jsonplaceholder.typicode.com](jsonplaceholder.typicode.com) website

* It then creates a horizontally, smooth scrolling list of photos, representing the fetched data. Each photo has the “title” text is written diagonally across it, as well as rounded corners, a border, and a drop shadow.

* The photos that are downloaded are cached such that when the app is terminated, the next session does not download previously downloaded images again.

* A button sits below the photos that reorders the list of photos in a completely random order. The button calls a recursive function in order to reorder the list.

### :bulb: Key Decisions

* A `FlatList` was used instead of a `ScrollView` component when displaying the photos to optimize performance of the app
* Photo height and width is set dynamically by accessing the `Dimensions` of the screen running the application
* When shuffling the photos recursively, an `async()` function is used in order to `await` the resolution of the `Promise` preventing the `Maximum call stack size exceeded` error
* `expo-file-system` library methods (e.g. `FileSystem.downloadAsync()`) were used to implement caching of images

### :link: Expo Link To Project

[https://expo.io/@neon-flights/photo-slider](https://expo.io/@neon-flights/photo-slider)
