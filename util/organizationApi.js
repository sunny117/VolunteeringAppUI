import api from './apiExports';

const OrganizationApi = {

    createActivity(activity) {
        return fetch(`${api.serverAddress}/organization/activity`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(activity)
        })
        .then(response => response.json())
        .then(data => data)
    },

    getOrganization(email) {
        return fetch(`${api.serverAddress}/organization/user_details/${encodeURIComponent(email)}`)
            .then(response => {
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse;
            }).catch(error => console.log(error));
    },

    createOrganization(obj) {
        return fetch(`${api.serverAddress}/organization/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse;
        }).catch(error => console.log(error));
    },

    getActivities(id) {
        return fetch(`${api.serverAddress}/organization/my_activities/${id}`)
            .then(response => {
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse;
            }).catch(error => console.log(error));
    },

    getVolunteers(activityId) {
        return fetch(`${api.serverAddress}/organization/olunteers/${activityId}`)
            .then(response => {
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse;
            }).catch(error => console.log(error));
    }

};

export default OrganizationApi;