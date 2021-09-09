import { serverRequest } from "./makeServerRequest"
import { dateCountdown } from "./date"
import { updateUI } from "./updateUI"

const handleSubmit = (event) => {
    event.preventDefault()
    serverRequest(getFormData())
    .then(data => updateUI(data))
}

// Get user input from form
const getFormData = () => {
    const destination = document.getElementById('destination').value
    const date = document.getElementById('date').value
    return {
        destination: destination,
        date: date,
        countDown: dateCountdown(date)
    }
}

export { handleSubmit }
