import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};
let token = JSON.parse(localStorage.getItem('token'));
let email = JSON.parse(localStorage.getItem('email'));
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"email":username,"password":password,"rememberMe":true})
    };

    return fetch(`https://sigviewauth.sigmoid.io/signIn`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(user.token));
            localStorage.setItem('email', JSON.stringify(username));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
}
function getChart1Service(url,startDate,endDate,chartNumber){
    let bgc = [
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
      ];
    let chart1body = [
        {
          _id: "dashboard1516252439345",
          emailId: email,
          orgViewReq: { organization: "DemoTest", view: "Auction" },
          chartObject: {
            metadata: {
              title: "chartobject:1516252439345",
              img_thumbnail: "../img/chart.png",
              chartType: "table",
              dataLimit: 50,
            },
            requestParam: {
              granularity: "hour",
              timeZone: { name: "UTC (+00:00)", location: "UTC" },
              dateRange: {
                startDate: startDate.toString(),
                endDate: endDate.toString(),
              },
              xAxis: ["D044"],
              yAxis: ["M002"],
              approxCountDistinct: [],
              specialCalculation: [],
              filter: [],
              orderBy: { metricOrdByList: [{ id: "M002", desc: true }] },
              percentCalList: [],
            },
          },
        },
      ];
    let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "x-auth-token":token,
        },
  
        body: JSON.stringify(chart1body[0]),
      };

    return fetch(url, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}