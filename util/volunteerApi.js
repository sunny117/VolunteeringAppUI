import api from './apiExports';

const VolunteerApi = {

    searchActivity( filter ) {
		return fetch(`${api.serverAddress}/volunteer/get_activities`, {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json'
			 },
			body: JSON.stringify(filter)
		})
		.then(response => response.json())
		.then(data => data)
		.then(error => {
			console.log(error)
		})
	},

    getVolunteer(email) {
        return fetch(`${api.serverAddress}/volunteer/user_details/${encodeURIComponent(email)}`)
            .then(response => {
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse;
            }).catch(error => console.log(error));
    },

    createVolunteer(obj) {
        return fetch(`${api.serverAddress}/volunteer/user`, {
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
        return fetch(`${api.serverAddress}/volunteer/my_activities/${id}`)
            .then(response => {
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse;
            }).catch(error => console.log(error));
    }
};

export default VolunteerApi;