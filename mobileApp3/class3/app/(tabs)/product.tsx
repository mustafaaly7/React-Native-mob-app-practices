import { ThemedButton } from "@/components/Themebutton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Category, Product } from "@/constants/interface";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View,RefreshControl } from "react-native";

export default function AllProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setcategories] = useState<Category[]>([])
    const [chosenCategory, setchosenCategory] = useState<string>("")
    const [limit, setlimit] = useState<number>(20)
    const [skip, setskip] = useState<number>(20)
    const [Loader, setLoader] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [refreshing, setRefreshing] = useState<boolean>(false)


    //full pull to refresh 
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getProducts()
      }, []);



    useEffect(() => {
        getProducts()
    }, [limit, skip, chosenCategory])
    useEffect(() => {
        getCategories()
    }, [])

    async function getCategories() {
        let data: any = await fetch('https://dummyjson.com/products/categories')
        data = await data.json()
        setcategories(data)
    }
    async function getProducts() {
        let url = chosenCategory && chosenCategory !== "all" ? `https://dummyjson.com/products/category/${chosenCategory}` : 'https://dummyjson.com/products'
        // &skip=${skip}
        let data: any = await fetch(`${url}?limit=${limit}`)
        data = await data.json()
        setProducts(data.products)
        setTotal(data.total)
        setRefreshing(false)
    }

    console.log("products", products);
    console.log("categories", categories.length);
    console.log("total", total);


    return (
        <View style={{ flex: 1, padding: 10 }} >

            <FlatList
            
            stickyHeaderIndices={[0]} // to make first flatlist sticky like header
            ListHeaderComponent={ // ye flatlist ky andar horizontal flatlist chlaiga
                <ThemedView>
                    <FlatList data={[{ slug: "all", name: "All" }, ...categories]}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.slug}
                        contentContainerStyle={{ gap: 10 }}
                        horizontal={true}
                        renderItem={({ item, index }) => {
                            let isChosen = chosenCategory == item.slug
                            return (
                                <ThemedButton txt={item.name} onPress={() => setchosenCategory(item.slug)} txtColor={isChosen ? "black" : "white"} bgColor={isChosen ? "gray" : "black"} />
                            )
                        }}
                    />
                    </ThemedView>
                }
//vertical scroll bar show na krne ky liye 
                showsVerticalScrollIndicator={false}
                //for pull to refresh 
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                //typescript thats why we've to convert it into string or number
                data={products} keyExtractor={(data) => data.id.toString()}
                numColumns={2} // aik line mai do colums
                onEndReachedThreshold={0.8} // means end anay wala ho products ka tou ye limit abhi 20 hai tou 16 pr call hojaiga 20 ka 80%
                onEndReached={()=>{
                    if(limit < total){
                        setlimit(limit+20)
                    }
                }} // or ye 16 pr cal hojaiga 
                renderItem={({ item, index }) => {

                    return (
                        <View style={styles.Card}>
                            {/* <Image source={{uri:item?.thumbnail}} style={{height:150 , resizeMode:"contain"}} /> */}
                            <Image source={{ uri: item.thumbnail }} style={{ height: 150, width: 80, resizeMode: "contain" }} />
                            <View style={styles.info}>
                                <ThemedText type="title" darkColor="true" numberOfLines={1}>{item.title}</ThemedText>
                                <ThemedText type="default" darkColor="true" numberOfLines={2}>{item.description}</ThemedText>
                            </View>

                        </View>
                    )
                }}


            />
        </View>

    )


}

const styles = StyleSheet.create({
    Card: {
        flex: 1,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 12,
        margin: 10,
        // flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        overflow: "hidden",
        elevation: 1


    }
    , info: {
        gap: 10,
        justifyContent: "center"
        // paddingBottom:15,
        // flexWrap:"wrap"
    }
})