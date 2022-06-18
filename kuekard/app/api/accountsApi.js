import client from './client'

const webTokenEndpoint = '/api/get-users';
const postNewUserEndpoint = '/api/create-users';
const getUserInfoEndpoint = '/api/get-users/me';
const getOrSetMediaUserEndpoint = '/api/get-create-media-users';
const updateUserEndpoint = '/kuekard/api/update-users';
const updateMediaUserEndpoint = '/kuekard/api/update-media-users';
const getDataEndpoint = '/kuekard/api/data';

const source = "kuekard";

const getUser = (email, password) => client.post(webTokenEndpoint, { email: String(email).toLowerCase(), password: password, source: source });
const postNewAccount = (name, email, password) => client.post(postNewUserEndpoint, { name: name, email: String(email).toLowerCase(), password: password, source: source });
const confirmUserEmail = email => client.post(getUserInfoEndpoint, { email: String(email).toLowerCase(), source: source });
const getSetMediaUser = (name, id, type) => client.post(getOrSetMediaUserEndpoint, { name: name, media_id: id, type: type, source: source });
const setUserObject = (email, data) => client.post(updateUserEndpoint, { email: String(email).toLowerCase(), source: source, data: data });
const setMediaUserObject = (email, data) => client.post(updateMediaUserEndpoint, { email: String(email).toLowerCase(), source: source, data: data });
//Get card data from a sql database.
const getData = (set) => client.post(getDataEndpoint, { language: "french", set: set });

export default {
    getUser,
    postNewAccount,
    confirmUserEmail,
    getSetMediaUser,
    setUserObject,
    setMediaUserObject,
    getData
}