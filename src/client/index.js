import { setDateInputAttributes, checkDateInput } from './js/date'
import { checkDestinationInput } from './js/destination'
import { handleSubmit } from './js/formHandler'

import './style.scss'

// Set custom date input attributes
setDateInputAttributes()
// Set date input constraint
checkDateInput()
// Set destination input constraint
checkDestinationInput()

const form = document.querySelector('.travel-info-form')
const button = document.querySelector('.form-button')

// onsubmit event of form
form.addEventListener('submit', (e) => {
    console.log('submit working')
    if (form.checkValidity()) handleSubmit(e)
})

// onsubmit event of button
button.addEventListener('submit', (e) => {
    if (form.checkValidity()) handleSubmit(e)
    console.log('submit working')

})

// onclick event of button
button.addEventListener('click', (e) => {
    if (form.checkValidity()) (handleSubmit(e))
    console.log('click working')

})



