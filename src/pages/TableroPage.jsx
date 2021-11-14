import React from 'react'
import EspecialistaTab from '../components/Tableros/TableroEspecialista/EspecialistaTab'
import PacienteTab from '../components/Tableros/TableroPaciente/PacienteTab'


const TableroPage = () =>{
    /*
    if (activeUser.role == "especialista"){
        return <EspecialistaTab/>
    }else if (activeUser.role == "paciente"){
        return<PacienteTab />>
    }
    return(<EspecialistaProf />)
    */
   return (<EspecialistaTab />)
}
export default TableroPage