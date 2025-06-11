import React from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';

const WelcomeModal = ({visible, onClose}) => {
    return (
            <Modal visible={visible}  
            animationType='slide'
            presentationStyle='pageSheet'
            >
                <View style={styles.overlay}>
                    <StatusBar barStyle={"light-content"}/>
                     <FontAwesome5 name="recycle" size={60} color="#00ff88" />
                        <Text style={styles.title}>Welcome to the oSENSE APP</Text>
                        <Text style={styles.subtitle}>
                            Smart waste management solutions for efficient collection and environmental sustainability
                        </Text>

                        <View style={styles.features}>
                            <View style={styles.featureItem}>
                                <MaterialIcons name= "route" size={24} color={"#00ff88"} />
                                <Text style={styles.featureText}>Smart Routing</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <MaterialIcons name= "monitor" size={24} color={"#00ff88"} />
                                <Text style={styles.featureText}>Real-time Monitoring</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <FontAwesome5 name= "leaf" size={24} color={"#00ff88"} />
                                <Text style={styles.featureText}>Eco-friendly</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Get Started</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.guestText}>Continue as Guest</Text>
                        </TouchableOpacity>

                    {/* <View style={styles.modal}></View> */}
                </View>

            </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex:1,
        backgroundColor: '#fffff0',
        justifyContent: "center",
        alignItems: 'center',
        padding: scale(10)
    },
    title: {
        color: '#000',
        fontSize: scale(30),
        fontWeight: 'bold',
        marginVertical: verticalScale(10),
        textAlign: "center"
    },
    subtitle: {
        color: '#000',
        fontSize: scale(15),
        textAlign: 'center',
        marginBottom: verticalScale(200)
    },
    features: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        marginBottom: verticalScale(25)
    },
    featureItem: {
        alignItems: 'center',
        flex: 1,
    },
    featureText: {
        color: '#000',
        fontSize: scale(11),
        marginTop: verticalScale(5),
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#00ff88',
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(100),
        borderRadius: scale(8),
        marginBottom: verticalScale(10),
    },
    guestText: {
        color: '#888',
        textDecorationLine: 'underline',
        fontSize: scale(12)
    },
    buttonText: {
        color : '#000',
        fontWeight: "bold",
        textAlign: 'center'
    }

})

export default WelcomeModal;