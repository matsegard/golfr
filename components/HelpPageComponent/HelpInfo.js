import { Menu, Button, VStack, Select, CheckIcon, Center, NativeBaseProvider, View, Text } from "native-base";
import PrimaryButton from "../inputs/PrimaryButton.js";
import React, {useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


function HelpInfo() {

  
    const [shouldOverlapWithTrigger] = React.useState(false);
    const [position, setPosition] = React.useState("auto");
    return (
        <View  height="100%" >
          <VStack  marginBottom="16" marginTop="5" alignSelf="flex-start" w="100%">
            <Menu width="90%"  shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
               placement={position == "auto" ? undefined : position} trigger={triggerProps => {
        return <Button width="50%" alignSelf="center" variant="solid" backgroundColor="gray.200" {...triggerProps}>
              <Text>Hur fungerar det?</Text> 
             
            </Button>;
        }}>
          <Text>Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
          
         </Text>
          <Text>Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
          
         </Text>
          </Menu>

         </VStack>
          <VStack marginBottom="16"  alignSelf="flex-start" w="100%">
            <Menu width="90%" shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
               placement={position == "auto" ? undefined : position} trigger={triggerProps => {
        return <Button width="50%" alignSelf="center" variant="solid" backgroundColor="gray.200" {...triggerProps}>
              <Text>Kontakt</Text> 
            </Button>;
        }}>
          <Text>Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                 
          </Text>
          </Menu>

         </VStack>
          <VStack marginBottom="16" alignSelf="flex-start" w="100%">
            <Menu width="90%" shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
               placement={position == "auto" ? undefined : position} trigger={triggerProps => {
        return <Button width="50%" alignSelf="center" variant="solid" backgroundColor="gray.200" {...triggerProps}>
              <Text>Regler</Text> 
            </Button>;
        }}>
          <Text>Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                 
          </Text>
          </Menu>

         </VStack>
        </View>
    )
}

export default HelpInfo;