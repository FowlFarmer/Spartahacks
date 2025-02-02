import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CameraComponent = () => {
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [pictureSizes, setPictureSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getSizes() {
      if (permission?.granted && cameraRef.current) {
        const sizes = await cameraRef.current.getAvailablePictureSizesAsync();
        setPictureSizes(sizes);
      }
    }
    getSizes();
  }, [permission, cameraRef]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo) {
      alert(`Photo captured with dimensions: ${photo.width} x ${photo.height}`);
      console.log(JSON.stringify(photo));
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          pictureSize={selectedSize}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>

      <View style={{ flex: 1 }}>
        <Button title="Take Picture" onPress={takePicture} />
        <View style={{ height: 1, backgroundColor: "#eee", marginVertical: 20 }} />
        {pictureSizes.map((size) => (
          <Button key={size} title={size} onPress={() => setSelectedSize(size)} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default CameraComponent;
