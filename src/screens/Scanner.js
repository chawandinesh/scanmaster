import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Share from 'react-native-share';
import {BottomSheet, Icon, ListItem} from 'react-native-elements';
// import ImageCropper from 'react-native-simple-image-cropper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SignatureCapture from 'react-native-signature-capture';
import RNImageFilter from 'react-native-image-filter';

const {height, width} = Dimensions.get('window');
export default class ScannerApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
      isVisible: false,
      showFilterIcons: false,
      cropperParams: {},
      croppedImage: '',
    };
  }
  list = [
    {title: 'List Item 1'},
    {title: 'List Item 2'},
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red', alignItems: 'center'},
      titleStyle: {color: 'white'},
      onPress: () => {
        this.setState({isVisible: false});
      },
    },
  ];
  getFilter = () => {
    RNImageFilterimageUrl.getSourceImage(
      {
        imageSource: this.state.imageUrl,
        dataType: 'Base6',
        filterType: 1,
      },
      source => {
        // console.log()
        // this.setState((imgBase64: source.base64));
        console.log('SOURCE', source);
        // source returns the height, width and the Base64 string of the image.
      },
    );
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerRight: () => (
        <View
          style={{
            marginRight: 10,
            flexDirection: 'row',
            // width: width * 0.15,
            justifyContent: 'space-between',
          }}>
          <Icon
            name="settings"
            type="feather"
            onPress={() => this.setState({isVisible: true})}
          />
          {/* <Icon
            name="menu"
            type="entypo"
            color="#000"
            onPress={() =>
              this.setState({
                showFilterIcons: !this.state.showFilterIcons,
              })
            }
            style={{fontSize: height * 0.07}}
          /> */}
        </View>
      ),
    });
  }
  shareImage = async () => {
    const url = 'https://awesome.contents.com/';
    const title = 'Awesome Contents';
    const message = 'Please check this out.';

    const shareOptions = {
      title: 'Share file',
      // url: `data:image/png;base64,${this.state.imageUrl}`,
      url: this.state.imageUrl,
      subject: title,
      failOnCancel: false,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  takeFromGallery = () => {
    const options = {
      mediaType: 'photo',
      maxHeight: height * 0.7,
      maxWidth: width * 0.95,
      quality: 1,
      base64: true,
    };
    launchImageLibrary(options, e => {
      this.setState({
        imageUrl: e.uri,
        isVisible: true,
      });
    });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: false};
      const data = await this.camera.takePictureAsync(options);
      this.setState({imageUrl: data.uri, isVisible: true});
    }
  };

  render() {
    console.log(this.state.imageUrl);
    return (
      <View style={styles.container}>
        {this.state.imageUrl ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            {/* <SignatureCapture
              style={{flex: 1}}
              // style={[{flex:1},styles.signature]}
              style={{height: height, width: width}}
              ref="sign"
              // onSaveEvent={this._onSaveEvent}
              // onDragEvent={this._onDragEvent}
              // saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              backgroundColor="transparent"
              strokeColor="#ffffff"
              minStrokeWidth={4}
              maxStrokeWidth={4}
              viewMode={'portrait'}>
            </SignatureCapture> */}
            <Image
              source={{uri: this.state.imageUrl}}
              style={{height: height * 0.7, width: width * 0.95}}
            />
            {/* {this.state.croppedImage ? (
              <Image
                style={{width: 100, height: 100}}
                source={{uri: croppedImage}}
              />
            ) : null} */}
          </View>
        ) : (
          <>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              onTextRecognized={e =>
                e.textBlocks.length ? this.takePicture() : null
              }
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onGoogleVisionBarcodesDetected={({barcodes}) => {
                // console.log(barcodes);
              }}
            />
          </>
        )}
        <BottomSheet
          isVisible={this.state.isVisible}
          containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({isVisible: false});
            }}
            style={{
              width: width,
              justifyContent: 'center',
              height: height * 0.06,
              backgroundColor: '#23527C',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: height * 0.03,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({isVisible: false});
              this.shareImage();
            }}
            style={{
              width: width,
              justifyContent: 'center',
              height: height * 0.06,
              backgroundColor: '#db88d4',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: height * 0.03,
              }}>
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({isVisible: false});
              this.takeFromGallery();
            }}
            style={{
              width: width,
              justifyContent: 'center',
              height: height * 0.06,
              backgroundColor: '#9f8',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: height * 0.03,
              }}>
              Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({isVisible: false, showFilterIcons: true});
            }}
            style={{
              width: width,
              justifyContent: 'center',
              height: height * 0.06,
              backgroundColor: '#FF6666',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: height * 0.03,
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </BottomSheet>
        {this.state.showFilterIcons ? (
          <View
            style={{
              position: 'absolute',
              right: 0,
              height: height * 0.8,
              width: width * 0.2,
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: '#067',
              borderBottomLeftRadius: height * 0.02,
              borderWidth: 4,
              borderColor: '#f98',
            }}>
            <TouchableOpacity
              style={{
                borderColor: '#87f',
                padding: 5,
                borderWidth: 3,
                borderRadius: 5,
              }}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>Crop</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.getFilter()}
              style={{
                borderColor: '#87f',
                padding: 5,
                borderWidth: 3,
                borderRadius: 5,
              }}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: '#87f',
                padding: 5,
                borderWidth: 3,
                borderRadius: 5,
              }}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>Sign</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.shareImage();
                this.setState({
                  showFilterIcons: false,
                });
              }}
              style={{
                borderColor: '#87f',
                padding: 5,
                borderWidth: 3,
                borderRadius: 5,
              }}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showFilterIcons: !this.state.showFilterIcons,
                });
              }}
              style={{
                borderColor: '#87f',
                padding: 5,
                borderWidth: 3,
                borderRadius: 5,
              }}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    height: height * 0.6,
    width: width,
    alignSelf: 'center',
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
