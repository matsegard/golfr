import React from "react";
import { Button, Image, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function ImageUpload({ currentImage, newImage, setNewImage }) {

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FontAwesomeIcon size={30} color="#828282" icon={faCamera} />
      <Button title="Ladda upp en bild" onPress={pickImage} />
      {newImage ? (
        <Image
          source={{
            uri: newImage,
          }}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <Image
          source={{
            uri: currentImage,
          }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
}
