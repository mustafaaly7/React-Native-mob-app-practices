import { ThemedButton } from "@/components/Themebutton";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Products(){
return(
<View style={{flex:1, justifyContent:"center",alignItems:"center"}}>
    <View style={{flex:1, justifyContent:"center",alignItems:"center"}}>

    <Text>
        PRODUCTS
    </Text>
    <ThemedButton onPress={()=> router.push("/")} txt="GO back" txtColor="white"/>
    </View>
</View>

)


}