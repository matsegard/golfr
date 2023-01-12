import { View} from "native-base";
import HelpInfo from "../components/HelpPageComponent/HelpInfo";
import Navbar from "../components/bars/Navbar";

function HelpPage() {
    return (
        <View>
          <HelpInfo />
          <Navbar />
        </View>
    )
}
export default HelpPage;