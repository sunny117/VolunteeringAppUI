import React from 'react'
import { Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const API_KEY = 'AIzaSyCy9AUmnuP--uqM0iHMA3xB-3vIfr1yaoU'

class Location extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View>
				<Text>Location</Text>
				<View>
				<GooglePlacesAutocomplete
						placeholder='Search here'
						minLength={2}
						autoFocus={false}
						fetchDetails={true}
						multiline
						numberOfLines={5}
						onPress={(data, details = null) => {
							console.log(data, details)
							// this.props.onSelect(data.description, details.geometry.location.lng, details.geometry.location.lat);
						}}
						query={{
							key: API_KEY,
							language: 'en'
						}}
						enablePoweredByContainer={false}
						onFail={(error) => console.log(error)}
					/>

				</View>
			</View>
		)
	}
}

export default Location