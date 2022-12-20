import { View, Pressable, Text } from "native-base"

const CategoriBar = () => {
    return (
        <View  flexDirection="row" justifyContent="space-between" width="90%" margin="5" >
            <Pressable>
              <Text fontSize="xl"  >Klubbor</Text>    
            </Pressable> 
            <Pressable>
              <Text fontSize="xl" >Golfset</Text>    
            </Pressable> 
            <Pressable>
              <Text fontSize="xl" >Vagn</Text>    
            </Pressable> 
            <Pressable>
              <Text fontSize="xl" >Golfbil</Text>    
            </Pressable> 
            <Pressable>
              <Text fontSize="xl" >Övrigt</Text>    
            </Pressable> 
        </View>
    )
}
export default CategoriBar;