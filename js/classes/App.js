
import {appointmentData,newAppointment} from '../functions.js';
import {
    petInput,
    ownerInput,
    phoneInput,
    dateInput,
    timeInput,
    symptomsInput,
    form
} from '../selectors.js';

export default class App {
    constructor(){
        this.initApp();
    }
    initApp(){
        petInput.addEventListener('input', appointmentData);
        ownerInput.addEventListener('input', appointmentData);
        phoneInput.addEventListener('input', appointmentData);
        dateInput.addEventListener('input', appointmentData);
        symptomsInput.addEventListener('input', appointmentData);
        timeInput.addEventListener('input', appointmentData);
        form.addEventListener('submit',newAppointment)
    }
}