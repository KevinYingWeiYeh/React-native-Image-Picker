import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Button 
} from 'react-native';
import { ImagePicker, 
  Permissions } from 'expo';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  state = {
    isImage : false,
    image: 'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png',
  };

  _pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri, isImage: true });
    }
  };


  animation(){
    if(!this.state.isImage) {
      this.view.pulse(800);
    }
  }

  nextPage(){
    this.titl.fadeOutRight(1000)
  }

  componentDidUpdate(){
    if(this.state.isImage) {
      this.icon.bounceInLeft(800);
    }
  }

  componentDidMount(){
    setInterval(() => this.animation(), 4000);
  }

  handleViewRef = ref => this.view = ref;
  handleIconRef = ref => this.icon = ref;
  handleBtnRef = ref => this.btn = ref;
  handleTitlRef = ref => this.titl = ref;

  render() {
    let { image, isImage } = this.state;

    return (
      <Animatable.View 
        style={styles.container} 
        ref={this.handleTitlRef} 
        duration={1000} 
        animation="fadeInLeft" 
        iterationCount= {1}
      >
        <TouchableOpacity 
          onPress={this._pickImage}
        >
          <Animatable.View 
            ref={this.handleViewRef} 
            delay={300} duration={2000} 
            animation="fadeInLeft" 
            iterationCount= {1} 
          >
            <Image 
              source={{ uri: image }} 
              style={{ width: 200, height: 200, borderWidth: 1 }}
            />
          </Animatable.View>
        </TouchableOpacity>
        <Animatable.Text 
          ref={this.handleTitlRef} 
          delay={500} 
          style={{fontSize: 20, color: '#fff', paddingTop: 50}} 
          duration={2000} 
          animation="fadeInLeft" 
          iterationCount= {1}
        >
          Choose your profile picture
        </Animatable.Text>
        <Animatable.View 
          ref={this.handleIconRef} 
          style={{paddingTop: 50}} 
        >
          <Ionicons 
            name="md-checkmark-circle" 
            size={32} 
            color={isImage ? "green" : "#333"} 
          />
        </Animatable.View>
        <Animatable.View 
          ref={this.handleBtnRef}  
          delay={700} duration={2000} 
          animation="fadeInLeft" 
          iterationCount= {1} 
          style={isImage ? styles.activeBtn : styles.negtiveBtn}>
          <Button 
            title="Next" 
            color="#fff" 
            onPress={() => this.nextPage()} 
            disabled={isImage ? false : true}
          />
        </Animatable.View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBtn: {
    backgroundColor: 'blue',
    borderRadius: 10, 
    padding: 10,
  },
  negtiveBtn: {
    backgroundColor: '#555',
    borderRadius: 10, 
    padding: 10,
  },
});
