import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Button
} from "react-native";
import PhotoContainer from "./components/photo-container.component";

export default class App extends React.Component {

  // Initial state set to false to activate loading animation
  state = {
    ready: false,
    PHOTO_LIST: null
  };

  // Fetches photos from external source and uopdates the state
  getPhotos = () => {
    let photosUrl = "http://jsonplaceholder.typicode.com/photos";
    fetch(photosUrl)
      .then(response => response.json())
      .then(data =>
        this.setState({
          ready: true,
          PHOTO_LIST: data
        })
      )
      .catch(err => console.log(err.message));
  };

  // Recursive function to shuffle the photos array
  shufflePhotos = async (array, currentIndex = 0) => {
    if (currentIndex >= array.length) {
      return array;
    }
    let randomIndex = Math.floor(Math.random() * currentIndex);

    let tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
    let newIndex = (currentIndex += 1);

    await new Promise(resolve => resolve());

    return this.shufflePhotos(array, newIndex);
  };

  // Shuffles the photos and updates the state to trigger re-render
  handleShuffle = () => {
    this.setState({ ready: false });

    this.shufflePhotos(this.state.PHOTO_LIST).then(shuffledPhotos => {
      this.setState({
        ready: true,
        PHOTO_LIST: shuffledPhotos
      });
    });
  };

  // Triggers fetch of the photos only once the component has mounted
  componentDidMount() {
    this.getPhotos();
  }

  render() {
    // Depending on ready state component is rendered
    return !this.state.ready ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <SafeAreaView style={styles.loadedContainer}>
        <View style={styles.flatlistContainer}>
          <FlatList
            data={this.state.PHOTO_LIST}
            renderItem={({ item }) => (
              <PhotoContainer photoUrl={item.url} title={item.title} />
            )}
            keyExtractor={item => `${item.id}`}
            horizontal
            extraData={this.state}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="SHUFFLE PHOTOS" color="#0000ff" onPress={this.handleShuffle} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center"
  },
  loadedContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  flatlistContainer: {
    justifyContent: "center",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.2
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});