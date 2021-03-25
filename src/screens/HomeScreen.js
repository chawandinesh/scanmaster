import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
const {height, width} = Dimensions.get('window');
export default function HomeScreen(props) {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: () => (
        <Text
          style={{
            fontSize: height * 0.04,
            borderBottomWidth: 3,
            borderRadius: 10,
            fontWeight: 'bold',
            fontFamily: 'cursive',
          }}>
          Scan master
        </Text>
      ),
    });
  }, [props.navigation]);
  return (
    <View style={{height, width, backgroundColor: '#4cd9c1'}}>
      <View
        style={{
          height: height * 0.8,
          width,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: height * 0.2,
            width: width * 0.9,
            borderWidth: 3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: height * 0.03,
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: height * 0.035,
              fontWeight: 'bold',
            }}>
            Nothing in the Library.{'\n'} Click on{' '}
            <Icon name="plus" type="entypo" /> to add data{' '}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: height * 0.15,
          right: height * 0.04,
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ScannerScreen')}>
          <Icon raised color="blue" name="plus" type="entypo" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
