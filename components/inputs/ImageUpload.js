import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function ImageUpload({ currentImage }) {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FontAwesomeIcon size={30} color="#828282" icon={faCamera} />
      <Button title="Ladda upp en bild" onPress={pickImage} />
      {image ? (
        <Image
          source={{
            uri: image.uri,
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
