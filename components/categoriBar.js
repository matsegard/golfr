import { View, Pressable, Text } from "native-base"

const CategoriBar = () => {
    return (
        <View  flexDirection="row" justifyContent="space-between" width="90%" margin="5" >
            <Pressable  onPress={() => console.log("Klubbor kategori")}>
              <Text fontSize="xl"  >Klubbor</Text>    
            </Pressable> 

            <Pressable onPress={() => console.log("Golfset kategori")}>
              <Text fontSize="xl" >Golfset</Text>    
            </Pressable> 

            <Pressable onPress={() => console.log("Golfset Vagn")} >
              <Text fontSize="xl" >Vagn</Text>    
            </Pressable>

            <Pressable onPress={() => console.log("Golfset Golfbil")} >
              <Text fontSize="xl" >Golfbil</Text>    
            </Pressable> 

            <Pressable onPress={() => console.log("Golfset Övrigt")} >
              <Text fontSize="xl" >Övrigt</Text>    
            </Pressable> 
        </View>
    )
}
export default CategoriBar;