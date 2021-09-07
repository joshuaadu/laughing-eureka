

const dateInput = document.getElementById('date')

// Set the max, min, and value attribute of the date input element
const setDateInputAttributes = () => {
    const date = new Date()
                const [day, month, year] = [String(date.getDate()).padStart(2, 0),
                                            String(date.getMonth() + 1).padStart(2, 0),
                                            date.getFullYear()]
            
    dateInput.setAttribute('min', `${year}-${month}-${day}`)
    dateInput.setAttribute('max', '2100-01-01')
    dateInput.setAttribute('pattern', '\d{4}-\d{2}-\d{2}')
    dateInput.value = `${month}/${day}/${year}`
    console.log('custom date set')
}

// Use Constraint Validation API
const checkDateInput = () => {
    dateInput.addEventListener('input', () => {
        destination.setCustomValidity('')
        destination.checkValidity()
        console.log('date valid')
    })
}

export {
    setDateInputAttributes,
    checkDateInput
}