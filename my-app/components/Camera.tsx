import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from "react-native";
import * as FileSystem from "expo-file-system";
import GalleryScreen from "./Gallery";

type CameraComponentProps = {};

const CameraComponent = ({}: CameraComponentProps) => {
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
      });
      if (photo) {
        const fileUri = `${FileSystem.cacheDirectory}photo_${Date.now()}.jpg`;
        await FileSystem.moveAsync({ from: photo.uri, to: fileUri });
        setPhotos((prev) => [fileUri, ...prev]); // Store photos in state
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('@/assets/images/developing.png')} style={styles.bg}>
        {showGallery ? (
          <GalleryScreen photos={photos} />
        ) : (
          <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            {/* {showGallery && ( */}
              <Image style={styles.boundariesbutton} source={require('@/assets/images/flip.png')} />
            {/* )} */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Image source={require('@/assets/images/FFLogoCircle.png')} style={styles.logoCircle} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => setShowGallery(!showGallery)}>
            {showGallery ? (
              <Image style={styles.boundariesbutton} source={require('@/assets/images/camera-icon.png')} />
            ) : (
              <Image style={styles.boundariesbutton} source={require('@/assets/icons/dashboardicon.png')} />
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, justifyContent: "center" },
  cameraContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  camera: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'transparent', // Maintain transparency for camera
  },
  
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10, // Add some padding to prevent button from being clipped

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButtonContainer: {
  },
  boundariesbutton: {
  
    height: 30,
    width: 30,
    minHeight: 20,
    minWidth: 20,
  },
  logoCircle: {
    height: 140,
    width: 140,
    borderRadius: 40,
  },
  text: { fontSize: 24, fontWeight: "bold", color: "white" },
});

export default CameraComponent;
