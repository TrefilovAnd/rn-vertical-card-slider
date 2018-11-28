import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  LayoutAnimation,
} from 'react-native';

export default class App extends React.Component {
  state = {
    list: [
      { top: 0, text: 1 },
      { top: 0, text: 2 },
      { top: 0, text: 3 },
      { top: 0, text: 4 },
      { top: 0, text: 5 },
      { top: 0, text: 6 },
      { top: 0, text: 7 },
      { top: 0, text: 8 },
      { top: 0, text: 9 },
      { top: 0, text: 10 },
      { top: 0, text: 11 },
      { top: 0, text: 12 },
      { top: 0, text: 'Конец' },
    ],
    curIndex: 0,
  }

  way = ''

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut()
  }

  renderBlock = (e, eIndex) => {
    const index = this.state.curIndex
    const p = (PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => { },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => { },
      onPanResponderGrant: () => { },
      onPanResponderMove: (evt, gestureState) => {
        const { list } = this.state
        const result = list.slice()

        if (this.way === '') {
          if (gestureState.dy > 0) {
            this.way = 'down'
          } else {
            this.way = 'up'
          }
        }
  
        if (eIndex !== index) {
          return
        }
  
        if (this.way === 'up' && e.top <= 0 && eIndex !== list.length - 1) {
          result[index].top = result[index].top + gestureState.dy
        }

        if (
          this.way === 'down'
          && result[index - 1]
          && result[index - 1].top >= -225
          && result[index - 1].top <= 0
        ) {
          result[index - 1].top = result[index - 1].top + gestureState.dy
        }
  
        this.setState({ list: result })
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { list } = this.state
        const result = list.slice()
        if (this.way === 'up') {
          if (result[index].top < -200 * 0.3) {
            result[index].top = -220
            this.setState({ curIndex: index + 1, list: result })
          } else {
            result[index].top = 0
    
            this.setState({ list: result })
          }
        }

        if (this.way === 'down' && result[index - 1]) {
          if (result[index - 1].top > -200 * 0.7) {
            result[index - 1].top = 0
            this.setState({ curIndex: index - 1, list: result })
          } else {
            result[index - 1].top = -220
    
            this.setState({ list: result })
          }
        }

        this.way = ''
      },
      onPanResponderTerminate: (evt, gestureState) => { },
      onShouldBlockNativeResponder: () => false,
    }))
    return (
      <View
        {...p.panHandlers}
        style={[styles.block, {
          top: (eIndex - index) * 10 + e.top,
          zIndex: (eIndex - index) * -1,
          width: 200,
          transform: [{ scaleX: (1 - 0.1 * (eIndex - index)) }],
          opacity: (eIndex - index) < 3 ? 1 : 0
        }]}
        key={eIndex}
      >
        <Text>{e.text}</Text>
      </View>
    )
  }

  render() {
    const { list } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {
            list.map((e, index) => this.renderBlock(e, index))
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    overflow: 'hidden',
    paddingTop: 20,
    height: 240,
    width: 202,
  },
  block: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
