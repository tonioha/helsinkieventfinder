import axios from "axios";

const BASE_URL = "https://open-api.myhelsinki.fi/";

const get = async (path, locale) => {
    const url = BASE_URL + path + "?language_filter=" + locale;
    console.log(url);

    try {
        const resp = await axios.get(url, {
            headers: {
                Accept: "application/json",
            },
        });
        return (resp.data);

    } catch (err) {
        throw "Error with the api request: " + err.message;
    }
};

const getWithTypeAndId = async (type, id, locale) => {
    let url = BASE_URL;
    if (type === "events") { url += "v1/event/" + id + "?language_filter=" + locale };
    if (type === "places") { url += "v2/place/" + id + "?language_filter=" + locale };
    if (type === "activities") { url += "v1/activity/" + id + "?language_filter=" + locale };

    //console.log(url);

    try {
        const resp = await axios.get(url, {
            headers: {
                Accept: "application/json",
            },
        });
        let respData = [resp.data];
        const typeObj = { type: type }

        return (Object.assign({}, respData[0], typeObj));

    } catch (err) {
        throw "Error with the api request: " + err.message;
    }


};

const getMultipleWithId = async (data, locale) => {
    let queryData = [];
    //console.log(locale);
    for (const item of data) {
        const returnedData = await getWithTypeAndId(item.type, item.id, locale);
        queryData.push(returnedData);
    }

    //console.log(queryData);

    return queryData;

};

module.exports = {
    get,
    getMultipleWithId,
};