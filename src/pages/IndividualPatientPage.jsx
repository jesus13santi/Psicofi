import IndividualPatient from "../components/IndividualPatient/IndividualPatient";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../utils/firebaseConfig";
import Loading from "../components/Loading/Loading";

const IndividualPatientPage = () => {

    const params = useParams();
    const [patient, setPatient] = useState(null);
  
    const fetchPatient = async () => {
        db.collection("users")
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
                incidencias={patient.incidencias}
                />
            ) : (
                <Loading />
            )}
        </>
    );
};

export default IndividualPatientPage;
