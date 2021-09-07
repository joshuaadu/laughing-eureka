// Use Constraint Validation API
const checkDestinationInput = () => {
    const destination = document.getElementById('destination')
    destination.addEventListener('input', () => {
        destination.setCustomValidity('')
        destination.checkValidity()
        console.log('destination valid')
    })
    
    destination.addEventListener('invalid', () => {
        if (!destination.validity.valid) destination.setCustomValidity('Please enter your destination')
        console.log('destination invalid')
    })
}

    export {checkDestinationInput}