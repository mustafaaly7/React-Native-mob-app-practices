import { ThemedButton } from "@/components/Themebutton";
import { ThemedText } from "@/components/ThemedText";
import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


export default function Home() {

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ThemedText type="title" darkColor="true">
                    HOME SCREEN
                </ThemedText>
                
<ThemedButton  txt="see Products" txtColor="white" onPress={()=>router.push('/(tabs)/product')} />
            </View>

        </View>
    )
}