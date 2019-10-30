import React from "react";
import { StyleSheet, Button, View, SafeAreaView, FlatList } from "react-native";
import CacheImage from './components/cache-image.component';
import { shuffle } from 'lodash';

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

  shufflePhotos = (array, currentIndex=0) => {
    if (currentIndex >= array.length) {
      return array;
    }

    let randomIndex = Math.floor(Math.random() * currentIndex);

    let tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
    let newIndex = currentIndex += 1;
    return this.shufflePhotos(array, newIndex);
  }

  shufflePhotosLodash = (array) => {
    return shuffle(array);
  }

  handleShuffle = async () => {
    const shuffledPhotos = await this.shufflePhotosLodash(this.state.PHOTO_LIST);
    // const shuffledPhotos = await this.shufflePhotos([1, 2, 3, 4, 5, 6]);
    // console.log(shuffledPhotos);
    this.setState({
      PHOTO_LIST: shuffledPhotos
    });
  }

  componentDidMount() {
    this.getPhotos();
  }

  render() {
    let photos = this.state.PHOTO_LIST;
    return (
      <SafeAreaView style={styles.container}>
        {photos && photos.length > 0 && (
        <View style={styles.flatlist}>
          <FlatList
            data={photos}
            renderItem={({ item }) => <Item photoUrl={item.url} />}
            keyExtractor={item => `${item.id}`}
            horizontal
          />
          <Button title="Shuffle Photos" onPress={this.handleShuffle} />
        </View>
        )}
      </SafeAreaView>
    );
  }
}

const Item = ({ photoUrl }) => {
  return (
    <View style={styles.photoContainer}>
      {/* <Image style={styles.photo} source={{uri: `${photoUrl}`, cache: 'only-if-cached'}} /> */}
      <CacheImage style={styles.photo} uri={photoUrl} />
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
