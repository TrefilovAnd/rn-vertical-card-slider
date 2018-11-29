import * as React from 'react';
import { Text, View, StyleSheet, Animated, ScrollView, Dimensions } from 'react-native';
import { Constants } from 'expo';

const { height, width } = Dimensions.get('window')

const data = [1,2,3,4,5,6,7,8,9,10]

export default class App extends React.Component {
  state = {
    page: 0
  }

  page = 0

  scroll = new Animated.Value(0)
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          {this.card()}
        </View>
        <ScrollView
          decelerationRate={'fast'}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scroll } } }])}
          scrollEventThrottle={16}
          snapToInterval={height}
          showsVerticalScrollIndicator={false}
        >
          {data.map(() => (
            <View key={`${Math.random()}`} style={{ width, height }} />
          ))}
        </ScrollView>
      </View>
    );
  }

  card = () => {
    return data.map((item, index) => {
      const inputRange = [height * (index - 2), height * (index - 1), height * index, height * (index + 1)]
      const startOut = index > 2 ? 50 : 25 * index
      const secondOut = index > 1 ? 25 : 25 * index

      const translateY = this.scroll.interpolate({
        inputRange,
        outputRange: [startOut, secondOut, 0, -(height / 1.5)],
        extrapolate: 'clamp'
      })

      let scaleX = 1

      if (index !== 0) {
        scaleX = this.scroll.interpolate({
          inputRange,
          outputRange: [0.8, 0.9, 1, 1],
          extrapolate: 'clamp'
        })
      }

      const opacity = this.scroll.interpolate({
        inputRange: [height * (index - 3), ...inputRange],
        outputRange: [0, 1, 1, 1, 1],
        extrapolate: 'clamp'
      })

      return (
        <Animated.View
          key={`${Math.random()}`}
          style={[
            styles.card,
            {
              opacity,
              transform: [
                { translateY },
                { scaleX }
              ],
              zIndex: -index
            }
          ]}
        />
      )
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  card: {
    height: height / 2,
    width: height / 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    position: 'absolute',
    borderRadius: 6
  },
  box: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    position: 'absolute'
  }
});
