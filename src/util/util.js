import axios from "axios";
export async function fetchData (url, accessToken) {
    const response = await axios({
        method: 'GET',
        headers: {
            Authorization: accessToken
        },
        url,
    });
    console.log(response);
    return response;
};

export async function postData (url, accessToken, data) {
    try {
        const response = await axios({
            method: 'POST',
            headers: {
                Authorization: accessToken
            },
            data,
            url
        })
        console.log(response);
        return response;
    } catch (e) {
        return e;
    }
}

