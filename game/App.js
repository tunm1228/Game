import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, Animated, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Enemy from './src/components/Enemy';

const imageBackground = require('./src/assets/image_backgroud.png');
const imageCard = require('./src/assets/car.jpeg');
const imageCard1 = require('./src/assets/car1.jpg');
const imageCard2 = require('./src/assets/car2.jpg');

const imgArr = [
  { image: require('./src/assets/car.jpeg') },
  { image: require('./src/assets/car1.jpg') },
  { image: require('./src/assets/car2.jpg') }
]
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movePlayerVal: new Animated.Value(40),
      playerSide: 'left',
      points: 0,
      moveEnemyval: new Animated.Value(0),
      enemyStartposX: 0,
      enemySide: 'left',
      enemySpeed: 4200,
      gameOver: false
    }
  }

  componentDidMount() {
    this.animateEnemy();
  }

  animateEnemy() {
    this.state.moveEnemyval.setValue(-10);
    var windownH = Dimensions.get('window').height;
    var r = Math.floor(Math.random() * 2);
    if (r == 0) {
      r = 40;
      this.setState({ enemySide: 'left' })
    } else {
      r = Dimensions.get('window').width - 140;
      this.setState({ enemySide: 'right' })
    }
    this.setState({ enemyStartposX: r });
    var refreshIntervaId;
    refreshIntervaId = setInterval(() => {

      if (this.state.moveEnemyval._value > windownH - 280
        && this.state.moveEnemyval._value < windownH - 180
        && this.state.playerSide == this.state.enemySide) {
        clearInterval(refreshIntervaId);
        this.setState({ gameOver: true });
        this.gameOver();

      }
    }, 50)

    //Increase enemy speed
    setInterval(() => {
      this.setState({ enemySpeed: this.state.enemySpeed - 50 })
    }, 20000)
    // Animate the enemy
    Animated.timing(this.state.moveEnemyval,
      {
        toValue: Dimensions.get('window').height,
        duration: this.state.enemySpeed
      }
    ).start(event => {
      if (event.finished && this.state.gameOver == false) {
        clearInterval(refreshIntervaId);
        this.setState({ points: ++this.state.points });
        this.animateEnemy();
      }
    })
  }
  gameOver() {
    Alert.alert('Game over', 'Do you want to play again?', [{
      text: 'Yes', onPress: () => {
        this.setState({ gameOver: false, points: 0 })
        this.animateEnemy();

      }
    }, { text: 'No', onPress: () => this.setState({ points: 0 }) }], { cancelable: false })
  }
  movePlayerVal(direction) {
    if (direction == 'right') {
      this.setState({ playerSide: 'right' })
      Animated.spring(this.state.movePlayerVal, {
        toValue: Dimensions.get('window').width - 140,
        tension: 120
      }).start();
    } else if (direction == 'left') {
      this.setState({ playerSide: 'left' })
      Animated.spring(this.state.movePlayerVal, {
        toValue: 40,
        tension: 120
      }).start();
    }
  }
  render() {
    return (
      <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={imageBackground} >

        <View style={{ flex: 1, marginTop: 50, alignItems: 'center' }} >
          <View style={{ backgroundColor: '#fff', width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }} >
            <Text style={{ color: 'red', fontSize: 24, fontWeight: 'bold' }} >{this.state.points}</Text>
          </View>
        </View>
        <Animated.Image
          source={this.state.imageRand}
          style={{
            height: 100,
            width: 100,
            position: 'absolute',
            zIndex: 1,
            bottom: 50,
            resizeMode: 'stretch',
            transform: [
              {
                translateX: this.state.movePlayerVal
              }
            ]
          }}
        >
        </Animated.Image>
        <Enemy
          enemyImg={imageCard1}
          enemyStartposX={this.state.enemyStartposX}
          moveEnemyval={this.state.moveEnemyval}
        />

        <View style={styles.controls} >
          <TouchableOpacity
            onPress={() => this.movePlayerVal('left')}
            style={{
              flex: 1,
            }}
          >
            <Text style={styles.left} >{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.movePlayerVal('right')}
            style={{
              flex: 1,
            }}
          >
            <Text style={styles.right} >{'>'}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 200
  },
  left: {
    textAlign: 'left',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff'
  },
  right: {
    flex: 1,
    textAlign: 'right',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff'
  }
});
