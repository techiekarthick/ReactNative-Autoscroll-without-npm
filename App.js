/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Text, Image } from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import variables from '@variables';
import colors from '@styles/colors';
import images from '@globals/utils/images';
import ImageLoader from '@components/ImageLoader';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  positionRelative: {
    position: 'relative',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  eventImage: {
    height: 50,
    width: deviceWidth - 40,
    borderRadius: 10,
  },
  positionAbsolute: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewEventsText: {
    fontFamily: variables.fontFamily.bold,
    fontSize: variables.fontSize.font18,
    color: colors.white,
    width: '80%',
    textAlign: 'center',
  },
  imageHeader: {
    height: 50,
    width: deviceWidth - 40,
    borderRadius: 10,
  },
  blur: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: deviceWidth - 40,
    opacity: 0.3,
    borderRadius: 10,
    backgroundColor: colors.black,
  },
  circleDiv: {
    // position: "absolute",
    bottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 10,
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: '#fff',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount = () => {
    const { eventList } = this.props;
    let count = 0;
    setInterval(() => {
      this.setState(
        (prev) => ({
          selectedIndex:
            prev.selectedIndex === eventList.length - 1
              ? 0
              : prev.selectedIndex + 1,
        }),
        () => {
          count = count === eventList.length - 1 ? 0 : count + 1;
          this.scrollRef.current.scrollTo({
            animated: true,
            x: deviceWidth * count,
            y: 0,
          });
        },
      );
    }, 3000);
  };

  setSelectedIndex = (event) => {
    const { contentOffset } = event.nativeEvent;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ selectedIndex });
  };

  render = () => {
    const { navigatePopularEvents, eventList } = this.props;
    const { selectedIndex } = this.state;
    
     // eventList = [
     // {
     //   id: 1,
     //   coverPhoto: 'imagePath',
     //   title: 'Karthick'
     // }
     // ] 
    return (
      <>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.setSelectedIndex}
          ref={this.scrollRef}
        >
          {eventList.map((value, index) => (
            <View
              style={styles.positionRelative}
              key={index}
              active={index === selectedIndex}
            >
              <View style={styles.imageHeader}>
                {value.id === null ? (
                  <Image
                    source={images.uselessImage}
                    style={styles.eventImage}
                    PlaceholderContent={<ImageLoader size="small" />}
                  />
                ) : (
                  <Image
                    source={{ uri: value.coverPhoto }}
                    style={styles.eventImage}
                    PlaceholderContent={<ImageLoader size="small" />}
                  />
                )}
              </View>
              <TouchableOpacity
                style={styles.blur}
                onPress={() => navigatePopularEvents(value.id)}
                activeOpacity={0.9}
              />
              <View style={styles.positionAbsolute}>
                <Text
                  style={styles.viewEventsText}
                  onPress={() => navigatePopularEvents(value.id)}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {value.title}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </>
    );
  };
}

export default App;
