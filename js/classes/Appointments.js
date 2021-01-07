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

export default Appointments;