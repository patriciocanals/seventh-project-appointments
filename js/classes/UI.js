import {deleteAppointment,edit} from '../functions.js';
import {appointmentsUL} from '../selectors.js';

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

export default UI;