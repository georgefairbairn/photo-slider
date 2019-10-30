import React from "react";
import { StyleSheet, Button, View, SafeAreaView, FlatList, Image } from "react-native";

class App extends React.Component {
  state = {
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
      PHOTO_LIST: data
    });
  };

  componentDidMount() {
    this.getPhotos();
  }

  render() {
    let photos = this.state.PHOTO_LIST;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.flatlist}>
        {photos && photos.length > 0 && (
          <FlatList
            data={photos.slice(0, 10)}
            renderItem={({ item }) => <Item photoUrl={item.url} />}
            keyExtractor={item => `${item.id}`}
            horizontal
          />
        )}
        </View>
        <View style={styles.shuffle}>
          <Button title="Shuffle Photos" />
        </View>
        {/* <View style={{backgroundColor: 'black', height: 400, width: 400}}></View> */}
      </SafeAreaView>
    );
  }
}

const Item = ({ photoUrl }) => {
  return (
    <View style={styles.photoContainer}>
      <Image style={styles.photo} source={{uri: `${photoUrl}`}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatlist: {
    flex: 3,
    flexGrow: 1,
    justifyContent: 'center'
  },
  shuffle: {
    flex: 1
  },
  photoContainer: {
    flex: 1,
    height: 400,
    width: 400,

  },
  photo: {
    flex: 1
  },
  photoText: {
    
  }
});

export default App;
