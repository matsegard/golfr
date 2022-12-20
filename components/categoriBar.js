import { View, Pressable, Text } from "native-base"

const CategoriBar = () => {
    return (
        <View  flexDirection="row" justifyContent="space-between" >
            <Pressable>
              <Text>Klubbor</Text>    
            </Pressable> 
            <Pressable>
              <Text>Golfset</Text>    
            </Pressable> 
            <Pressable>
              <Text>Vagn</Text>    
            </Pressable> 
            <Pressable>
              <Text>Golfbil</Text>    
            </Pressable> 
            <Pressable>
              <Text>Övrigt</Text>    
            </Pressable> 
        </View>
    )
}
export default CategoriBar;