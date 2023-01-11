import { Menu, Button, VStack, Select, CheckIcon, Center, NativeBaseProvider, View, Text, Pressable } from "native-base";
import React, {useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import {faArrowUp } from "@fortawesome/free-solid-svg-icons";

function HelpInfo() {

    const [changeArrow, setChangeArrow] = useState(true);
    const [changeArrow1, setChangeArrow1] = useState(true);
    const [changeArrow2, setChangeArrow2] = useState(true);
    const [shouldOverlapWithTrigger] = React.useState(false);
    const [position, setPosition] = React.useState("auto");
     
   


    return (
        <View  height="100%" >
          <VStack  marginBottom="16" marginTop="5" alignSelf="flex-start" w="100%">
                  <Button  width="50%" alignSelf="center" backgroundColor="gray.200">
          <Pressable onPress={() => setChangeArrow(!changeArrow)} >
               <View flexDirection="row" >
                 <Text marginRight="3" >Hur fungerar det?</Text> 
                 <View justifyContent="end" >
                 {changeArrow ? ( 
                   <FontAwesomeIcon backgroundColor="black" icon={faArrowDown} />
                   ) : (
                    <>
                   <FontAwesomeIcon icon={faArrowUp} />
                     <View  width="90%"  shouldOverlapWithTrigger={shouldOverlapWithTrigger}>
      
                  <Text>Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                      </Text>
                       <Text>Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                     </Text>
                </View>
                </>
                     )}
                 </View>
                </View>
                </Pressable>
              </Button>

         </VStack>
         <VStack  marginBottom="16" marginTop="5" alignSelf="flex-start" w="100%">
                  <Button  width="50%" alignSelf="center" backgroundColor="gray.200">
          <Pressable onPress={() => setChangeArrow1(!changeArrow1)} >
               <View flexDirection="row" >
                 <Text marginRight="3" >Hur fungerar det?</Text> 
                 <View justifyContent="end" >
                 {changeArrow1 ? ( 
                   <FontAwesomeIcon backgroundColor="black" icon={faArrowDown} />
                   ) : (
                    <>
                   <FontAwesomeIcon icon={faArrowUp} />
                     <View  width="90%" justifyContent="center" shouldOverlapWithTrigger={shouldOverlapWithTrigger}>
      
                  <Text>Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                      </Text>
                       <Text>Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                     </Text>
                </View>
                </>
                     )}
                 </View>
                </View>
                </Pressable>
              </Button>

         </VStack>
         <VStack  marginBottom="16" marginTop="5" alignSelf="flex-start" w="100%">
                  <Button  width="50%" alignSelf="center" backgroundColor="gray.200">
          <Pressable onPress={() => setChangeArrow(!changeArrow2)} >
               <View flexDirection="row" >
                 <Text marginRight="3" >Hur fungerar det?</Text> 
                 <View justifyContent="end" >
                 {changeArrow2 ? ( 
                   <FontAwesomeIcon backgroundColor="black" icon={faArrowDown} />
                   ) : (
                    <>
                   <FontAwesomeIcon icon={faArrowUp} />
                     <View  width="90%"  shouldOverlapWithTrigger={shouldOverlapWithTrigger}>
      
                  <Text>Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                      </Text>
                       <Text>Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                Hur fungerar våran app, vart loggar man in och hur loggar man ut?  
                     </Text>
                </View>
                </>
                     )}
                 </View>
                </View>
                </Pressable>
              </Button>

         </VStack>
        </View>
    )
}

export default HelpInfo;