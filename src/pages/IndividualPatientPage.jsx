import React from "react";
import IndividualPatient from "../components/IndividualPatient/IndividualPatient";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebaseConfig";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading/Loading";

const IndividualPatientPage = () => {

    const params = useParams();
    const {user}= useContext(UserContext);
    const [patient, setPatient] = useState(null);
    const [isLoading, setLoading] = useState(true);
  
    const fetchPatient = async () => {
    const listaPatients = db.collection("users")
        .doc(params.uid)
        .get()
        .then((user) => {
            const datos = user.data();
            setPatient(datos)
        });
    };
  
    useEffect(() => {
      fetchPatient()
    }, []);

    return (
        <>
            {!!patient ? (
                <IndividualPatient
                id={params.uid}
                name={patient.name}
                email={patient.email}
                pais={patient.pais}
                number={patient.number}
                photo={patient.photo}
                />
            ) : (
                <Loading />
            )}
        </>
    );
};

export default IndividualPatientPage;
