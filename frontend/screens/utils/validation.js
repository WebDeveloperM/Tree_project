import {Alert} from "react-native";

export const validateData = (cardNumber, cardDate, cardCvv) => {
    if (cardNumber.trim().length !== 19) {
        Alert.alert('Card number is required');
        return false;
    }

    if (cardDate.trim().length !== 5) {
        Alert.alert('Card date is required');
        return false;
    }

    if (cardCvv.trim().length !== 3) {
        Alert.alert('CVV number is required');
        return false;
    }
    return true;
};