require("regenerator-runtime/runtime")

// POST form data to server and wait for travel and return travel info
const serverRequest = async (data) => {

    // Set options object for fetch request
    const postInfo = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    }
    const response = await fetch('http://localhost:8082/travel-info', postInfo)

    try {
        return await response.json()
    } catch (error) {
        console.log('error', error)
    }
}

export {
    serverRequest
}