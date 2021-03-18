//Need to add api keys
const api_key = ''

import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

const reverseGeocoding = (lat, lng) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}`)
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            return jsonResponse.results[0].formatted_address;
        })
        .catch(error => console.log(error));
};

export const CurrentLocation = {

    currentLocation(callback) {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            .then(granted => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        position => {
                            console.log(position)
                            reverseGeocoding(position.coords.latitude, position.coords.longitude)
                                .then(response => {
                                    let location = {
                                        address: response,
                                        latitude: position.coords.latitude,
                                        longitude: position.coords.longitude
                                    }
                                    callback(location);
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        },
                        error => console.log(error),
                        { enableHighAccuracy: false, timeout: 10000, maximumAge: 100000 }
                    )
                } else {
                    console.log("location permission denied")
                    alert("Location permission denied");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

}