import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      {showGallery ? (
        <GalleryScreen photos={photos} />
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
      </CameraView>
      )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setShowGallery(!showGallery)}>
            <Text style={styles.text}>{showGallery ? "Show Cameradsdsds" : "Show Gallery"}</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: { flex: 1, alignSelf: "flex-end", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold", color: "white" },
});

export default CameraComponent;




// type CameraComponentProps = {
//   onPhotoTaken: (uri: string) => void;
// };

// const CameraComponent = ({ onPhotoTaken }: CameraComponentProps) => {
//   const cameraRef = useRef<CameraView>(null);
//   const [facing, setFacing] = useState<CameraType>('back');
//   const [permission, requestPermission] = useCameraPermissions();

//   if (!permission) return <View />;
//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: "center" }}>
//           We need your permission to show the camera
//         </Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   const toggleCameraFacing = () => {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   };

//   const takePicture = async () => {
//     const photo = await cameraRef.current?.takePictureAsync();
//     if (photo) {
//       const fileUri = `${FileSystem.cacheDirectory}photo_${Date.now()}.jpg`;
//       console.log(JSON.stringify(photo));
//       await FileSystem.moveAsync({ from: photo.uri, to: fileUri });
//       onPhotoTaken(fileUri);
//     }
//   };

//   return (
//     <View style={styles.container}>
      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center" },
//   camera: { flex: 1 },
//   buttonContainer: { flex: 1, flexDirection: "row", backgroundColor: "transparent", margin: 64 },
//   button: { flex: 1, alignSelf: "flex-end", alignItems: "center" },
//   text: { fontSize: 24, fontWeight: "bold", color: "white" },
// });

// export default CameraComponent;
