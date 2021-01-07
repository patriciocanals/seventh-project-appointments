import Appointments from './classes/Appointments.js';
import UI from './classes/UI.js';
import {
    petInput,
    ownerInput,
    phoneInput,
    dateInput,
    timeInput,
    symptomsInput,
    form
} from './selectors.js';

const manageAppointments = new Appointments();
const ui = new UI();
//Main object
const appointmentObj = {
    pet: '',
    owner: '',
    phone: '',
    date: '',
    time: '',
    symptoms: ''
}
let editing = false;

//Main object filler function
export function appointmentData(e){
    appointmentObj[e.target.name] = e.target.value;
}

//Validates and add new appointments to appointments class
export function newAppointment(e){
    e.preventDefault();
    const {pet,owner,phone,date,time,symptoms} = appointmentObj;
    if(pet === '' || owner === '' || phone === '' || date === '' || time === '' || symptoms === ''){
        ui.printAlert('All fields are required','error');
        return;
    };
    if(editing){
        ui.printAlert('Changed correctly');
        manageAppointments.editAppointment({...appointmentObj})
        form.querySelector('button[type="submit"]').textContent = 'Create appointment';
        editing = false;
    } else {
        //ID generator
        appointmentObj.id = Date.now();
        //Add
        manageAppointments.addAppointment({...appointmentObj});
        ui.printAlert('Added correctly');
    }
    
    //Reset obj and form
    resetObj();
    form.reset();

    //DOM
    ui.printAppointments(manageAppointments);
}
export function resetObj(){
    appointmentObj.pet = '';
    appointmentObj.owner = '';
    appointmentObj.phone = '';
    appointmentObj.date = '';
    appointmentObj.time = '';
    appointmentObj.symptoms = '';
};
export function deleteAppointment(id){
    manageAppointments.deleteAppointment(id);
    ui.printAlert('Appointment deleted');
    ui.printAppointments(manageAppointments);
};
export function edit(appointment){
    const {pet,owner,phone,date,time,symptoms,id} = appointment;
    petInput.value = pet;
    ownerInput.value = owner;
    phoneInput.value = phone;
    dateInput.value = date;
    timeInput.value = time;
    symptomsInput.value = symptoms;

    appointmentObj.pet = pet;
    appointmentObj.owner = owner;
    appointmentObj.phone = phone;
    appointmentObj.date = date;
    appointmentObj.time = time;
    appointmentObj.symptoms = symptoms;
    appointmentObj.id = id;

    form.querySelector('button[type="submit"]').textContent = 'Save Changes'

    editing = true;
}