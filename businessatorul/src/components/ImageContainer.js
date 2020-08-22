import React from 'react';
import { ImageBackground, View,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ImageContainer = ({ children }) => {

    return (
        <View style={styles.container}>
        <ImageBackground
            source={require('../../assets/background.jpg')}
            style={styles.image}
            >
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: `rgba(255, 255, 255, 0.3)`
                }}>
                {children}
            </SafeAreaView>
        </ImageBackground>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      height:'100%',
      justifyContent: "center"
    },
    text: {
      color: "grey",
      fontSize: 30,
      fontWeight: "bold"
    }
  });

export default ImageContainer;
