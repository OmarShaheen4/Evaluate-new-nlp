import { checkForRightURL } from './js/checkForRightURL'
import { handleSubmit } from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'


// console.log(checkForRightURL);


// TODO: get the button for submit
// TODO: add event listener to it when the click to call handleSubmit function
/**
 * TODO: Get Value of the input for URL
 *  TODO: Check if it's URL or not
 *      yes
 *          send it to the backend
 *      no
 *          show user message it's not valid URL
 */

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const submit = document.getElementById('btnSubmit')
    submit.addEventListener('click', (event) => {
        event.preventDefault()
        handleSubmit()
    })
});

alert("I EXIST")
console.log("client index.js says ... Hi!!");

export {
    checkForRightURL,
    handleSubmit
}
