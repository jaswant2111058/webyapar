import { StyleSheet, View, Image } from 'react-native';


export default function Loader() {

    return (
        <>
            <View style={styles.loading}>
                <Image
                    style={styles.loadingGif}
                    source={require('../assets/images/loading.gif')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    loading: {
        width:30,
        height:30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    loadingGif: {
        width: 30,
        height: 30
    },

});