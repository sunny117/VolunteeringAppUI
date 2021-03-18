import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export const VA_Location = props => {
    return (
        <GooglePlacesAutocomplete
            ref={props.childRef}
            placeholder="Enter Location"
            minLength={2}
            autoFocus={false}
            fetchDetails={true}
            multiline
            numberOfLines={5}
            onPress={(data, details = null) => {
                this.props.onSelect(data.description, details.geometry.location.lng, details.geometry.location.lat);
            }}
            query={{
                key: '',
                language: 'en'
            }}
            styles={{
                description: {
                    fontWeight: 'bold',
                },
                listView: {
                    top: -5,
                },
                row: {
                    flexGrow: 1,
                    paddingLeft: 30,
                    width: '85%',
                    height: 'auto',
                },
                textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    alignItems: 'center',
                    paddingLeft: 5,
                },
                textInput: {
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    height: 35,
                    color: '#5d5d5d',
                    fontSize: 15,
                    borderRadius: 0,
                }
            }}
            enablePoweredByContainer={false}
            onFail={(error) => console.log(error)}
        />
    )
}
