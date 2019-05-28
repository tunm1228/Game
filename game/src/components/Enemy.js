import React, { Component } from 'react';
import { View, Text, Animated, Image } from 'react-native';

class Enemy extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Animated.Image 
      source={this.props.enemyImg} 
      style={{
          height: 100,
          width: 100,
          position: 'absolute',
          resizeMode: 'stretch',
          left: this.props.enemyStartposX,
          transform: [
              {
                  translateY: this.props.moveEnemyval
              }
          ]
      }}
      >
      </Animated.Image>
    );
  }
}

export default Enemy;
