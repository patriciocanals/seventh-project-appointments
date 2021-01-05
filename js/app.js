//Input fields
const petInput = document.querySelector('#pet');
const ownerInput = document.querySelector('#owner');
const phoneInput = document.querySelector('#phone');
const dateInput = document.querySelector('#date');
const symptomsInput = document.querySelector('#symptoms');
const timeInput = document.querySelector('#time');

//UI
const form = document.querySelector('#new-appointment');
const appointmentsUL = document.querySelector('#appointments');

//Event Listeners
eventListeners();
function eventListeners(){
    petInput.addEventListener('input', appointmentData);
    ownerInput.addEventListener('input', appointmentData);
    phoneInput.addEventListener('input', appointmentData);
    dateInput.addEventListener('input', appointmentData);
    symptomsInput.addEventListener('input', appointmentData);
    timeInput.addEventListener('input', appointmentData);
    form.addEventListener('submit',newAppointment)
}
let editing;
class Appointments {
    constructor(){
        this.appointments = [];
    }
    addAppointment(apmnt){
        this.appointments = [...this.appointments,apmnt];
    }
    deleteAppointment(id){
        this.appointments = this.appointments.filter(appointment => appointment.id !== id)
    }
    editAppointment(apmnt){
        this.appointments = this.appointments.map(appointment => appointment.id === apmnt.id ? apmnt : appointment)
    }
}
class UI {
    printAlert(message,type){
        const divAlert = document.createElement('div');
        divAlert.classList.add('text-center','alert','d-block','col-12');
        if(type === 'error'){
            divAlert.classList.add('alert-danger');
        } else {
            divAlert.classList.add('alert-success');
        };
        divAlert.textContent = message;
        //DOM
        document.querySelector('#content').insertBefore(divAlert,document.querySelector('.add-appointment'));
        setTimeout(() =>{
            divAlert.remove();
        },5000);
    }
    printAppointments(apmnts){
        this.cleanHTML();
        const {appointments} = apmnts;
        appointments.forEach(appointment => {
            const {pet,owner,phone,date,time,symptoms,id} = appointment;
            const divApmnt = document.createElement('div');
            divApmnt.classList.add('appointment');
            divApmnt.dataset.id = id;

            //Scripting
            const petTitle = document.createElement('h2');            
            petTitle.classList.add('card-title','font-weight-bolder');
            petTitle.textContent = pet;
            
            const ownerTitle = document.createElement('p');
            ownerTitle.innerHTML = `
                <span class="font-weight-bolder">Owner: </span>${owner}
            `;
            const phoneTitle = document.createElement('p');
            phoneTitle.innerHTML = `
                <span class="font-weight-bolder">Phone: </span>${phone}
            `;
            const dateTitle = document.createElement('p');
            dateTitle.innerHTML = `
                <span class="font-weight-bolder">Date: </span>${date}
            `;
            const timeTitle = document.createElement('p');
            timeTitle.innerHTML = `
                <span class="font-weight-bolder">Time: </span>${time}
            `;
            const symptomsTitle = document.createElement('p');
            symptomsTitle.innerHTML = `
                <span class="font-weight-bolder">Symptoms: </span>${symptoms}
            `;

            //Delete button for each appointment
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn','btn-danger','mr-2');
            btnDelete.innerHTML = 'Delete <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
            btnDelete.onclick = () => deleteAppointment(id);
            //Edit button for each appointment
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn','btn-warning','mr-2');
            btnEdit.innerHTML = 'Edit <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'
            btnEdit.onclick = () => edit(appointment);

            //DOM
            divApmnt.appendChild(petTitle);
            divApmnt.appendChild(ownerTitle);
            divApmnt.appendChild(phoneTitle);
            divApmnt.appendChild(dateTitle);
            divApmnt.appendChild(timeTitle);
            divApmnt.appendChild(symptomsTitle);
            divApmnt.appendChild(btnDelete);
            divApmnt.appendChild(btnEdit);
            appointmentsUL.appendChild(divApmnt);
        })
        
    }
    cleanHTML(){
        while(appointmentsUL.firstChild){
            appointmentsUL.removeChild(appointmentsUL.firstChild)
        }
    }
}
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

//Main object filler function
function appointmentData(e){
    appointmentObj[e.target.name] = e.target.value;
}
//Validates and add new appointments to appointments class
function newAppointment(e){
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

function resetObj(){
    appointmentObj.pet = '';
    appointmentObj.owner = '';
    appointmentObj.phone = '';
    appointmentObj.date = '';
    appointmentObj.time = '';
    appointmentObj.symptoms = '';
};

function deleteAppointment(id){
    manageAppointments.deleteAppointment(id);
    ui.printAlert('Appointment deleted');
    ui.printAppointments(manageAppointments);
};

function edit(appointment){
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