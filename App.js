import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Button,
  Text
} from "react-native";
import CacheImage from "./components/cache-image.component";

class App extends React.Component {
  state = {
    ready: false,
    PHOTO_LIST: null
  };

  getPhotos = () => {
    let photosUrl = "http://jsonplaceholder.typicode.com/photos";
    fetch(photosUrl)
      .then(response => response.json())
      .then(data => this.displayPhotos(data))
      .catch(err => console.log(err.message));
  };

  displayPhotos = data => {
    this.setState({
      ready: true,
      PHOTO_LIST: data
    });
  };

  shufflePhotos = array => {
    let currentIndex = array.length,
      tempValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }
    return array;
  };

  handleShuffle = async () => {
    this.setState({ ready: false });
    const shuffledPhotos = await this.shufflePhotos(this.state.PHOTO_LIST);
    this.setState({
      ready: true,
      PHOTO_LIST: shuffledPhotos
    });
  };

  componentDidMount() {
    this.getPhotos();
  }

  render() {
    return !this.state.ready ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <SafeAreaView style={styles.loadedContainer}>
        <View style={styles.flatlist}>
          <FlatList
            data={this.state.PHOTO_LIST}
            renderItem={({ item }) => (
              <Item photoUrl={item.url} title={item.title} />
            )}
            keyExtractor={item => `${item.id}`}
            horizontal
            extraData={this.state}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="SHUFFLE PHOTOS" onPress={this.handleShuffle} />
        </View>
      </SafeAreaView>
    );
  }
}

const Item = ({ photoUrl, title }) => {
  return (
    <View style={styles.photoContainer}>
      <CacheImage style={styles.photo} uri={photoUrl} />
      <View style={styles.photoTextContainer}>
        <Text style={styles.photoText}>{title}</Text>
      </View>
    </View>
  );
};

const screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center"
  },
  loadedContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  flatlist: {
    justifyContent: "center"
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  photoContainer: {
    flex: 1,
    height: screenWidth,
    width: screenWidth,
    shadowOffset: { width: 7, height: 7 },
    shadowColor: "black",
    shadowOpacity: 1.0
  },
  photo: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 20,
    margin: 10
  },
  photoTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: '-45deg'}]
  },
  photoText: {
    textAlign: 'center',
    fontSize: 40
  }
});

export default App;
