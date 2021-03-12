import React from 'react'
import { Picker } from '@react-native-community/picker'

export const VA_DropDown = (props) => {
    return (
        <Picker
            mode='dropdown'
            {...props}
        >
            <Picker.Item color="#a6a6a6" label="-- select --" value="" />
            <Picker.Item label="Move-in" value="Move-in" />
            <Picker.Item label="Environment" value="Environment" />
            <Picker.Item label="Elderly Care" value="Elderly Care" />
            <Picker.Item label="Other" value="Other" />
        </Picker>
    )
}