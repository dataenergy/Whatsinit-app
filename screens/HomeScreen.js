import React from 'react'
import {View, StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import SelectAPictureTile from '../components/SelectAPictureTile'
import TakeAPictureTile from '../components/TakeAPictureTile'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Whatsinit',
    headerTitleStyle: {
      color: '#fff',
    },
    headerStyle: {
      backgroundColor: '#666',
    },
  }

  // Opens the system UI to choose an image from the phone's library
  handleSelectPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    })
    // Navigate to 'AnalyzeScreen' after an image is selected
    if (!result.cancelled) {
      this.props.navigation.navigate('Analyze', {
        imageUri: result.uri,
        encodedImage: result.base64,
        aspectRatio: result.width / result.height
      })
    }
  }

  // Opens the system UI to take a photo with the camera
  handleTakePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    })
    // Navigate to 'AnalyzeScreen' after an image is captured
    if (!result.cancelled) {
      this.props.navigation.navigate('Analyze', {
        imageUri: result.uri,
        encodedImage: result.base64,
        aspectRatio: result.width / result.height
      })
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <SelectAPictureTile source={require('../assets/photo_image.png')} onSelectPicture={this.handleSelectPicture} />
        <TakeAPictureTile source={require('../assets/camera_image.png')} onSelectPicture={this.handleTakePicture} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
