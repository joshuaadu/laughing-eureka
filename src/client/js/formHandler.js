import { serverRequest } from "./makeServerRequest"

const handleSubmit = (event) => {
    event.preventDefault()
    serverRequest(getFormData())
    .then(data => console.log(data))
}

// Get user input from form
const getFormData = () => {
    return {
        destination: document.getElementById('destination').value,
        date: document.getElementById('date').value
    }
}

export { handleSubmit }
