// Use Constraint Validation API
const checkDestinationInput = () => {
    destination.addEventListener('input', () => {
        destination.setCustomValidity('')
        destination.checkValidity()
    })
    
    destination.addEventListener('invalid', () => {
        if (!destination.validity.valid) destination.setCustomValidity('Please enter your destination')
    
    })
}

    export {checkDestinationInput}