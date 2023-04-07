import {  useState } from "react";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import DataUserForm from "../Form/DataUserForm";
import DataAddressForm from "../Form/DataAddressForm";
import DataCardForm from "../Form/DataCardForm";
import { FormControl } from "@mui/material";

const steps = ['Datos Personales', 'Datos de Entrega', 'Datos de Tarjeta'];

const schema = yup.object({
    name: yup.string().required("El Nombre es requerido."),
    surname: yup.string().required("El Apellido es requerido."),
    email: yup.string().email("Debe contener un formato correcto.").required("El Email es requerido."),
    direccion: yup.string().required("La Dirección es requerida."),
    departamento: yup.string(),
    ciudad: yup.string().required("La Ciudad es requerida."),
    provincia: yup.string().required("La Provincia es requerida."),
    codigoPostal: yup.number().required("El Código Postal es requerido."),
    numeroTarjeta: yup.number().required("El Número de la Tarjeta es requerido."),
    nombreTarjeta: yup.number().required("El Nombre de la Tarjeta es requerido."),
    fechaExpiracion: yup.number().required("La Fecha de Expiración es requerida."),
    codigoSeguridad: yup.number().required("El Código de Seguridad es requerido."),
}).required();

const CheckoutForm = () => {

    const { formState: { errors }, control,watch, trigger, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const [activeStep, setActiveStep] = useState(0);

    const checkFirstStep = async (e: any) => {
        e.preventDefault()
        const nameIsValid = await trigger("name")
        const surnameIsValid = await trigger("surname")
        const emailIsValid = await trigger("email")
        if (nameIsValid && surnameIsValid && emailIsValid) {
            setActiveStep(1)
        }
    }
    const checkSecondStep = async () => {
        const direccionIsValid = await trigger("direccion")
        const departamentoIsValid = await trigger("departamento")
        const ciudadIsValid = await trigger("ciudad")
        const provinciaIsValid = await trigger("provincia")
        const codigoPostalIsValid = await trigger("codigoPostal")
        if (direccionIsValid && departamentoIsValid && ciudadIsValid && provinciaIsValid && codigoPostalIsValid) {
            setActiveStep(2)
        }
    }
    const gotBackStepOne = async () => {
        setActiveStep(0)
    }

    const gotBackStepTwo = async () => {
        setActiveStep(0)
    }

    const checkThirdStep = async () => {
        const numeroTarjeta = await trigger("numeroTarjeta")
        const nombreTarjeta = await trigger("nombreTarjeta")
        const fechaExpiracion = await trigger("fechaExpiracion")
        const codigoSeguridad = await trigger("codigoSeguridad")
        if (numeroTarjeta && nombreTarjeta && fechaExpiracion && codigoSeguridad) {
            return true;
        } else {
            return false;
        }
    }

    const onValidSubmit = async (data: any) => {
        if(await checkThirdStep()){
            console.log(data);
        }else{
            console.log("hay errores baby");
        }
    }
    
    console.log("watch", watch())

    return (
        <Box sx={{ width: '100%', paddingRight: 5 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <FormControl sx={{width: "100%", padding: 5}} onSubmit={handleSubmit(onValidSubmit)}>
                {activeStep === 0 && <DataUserForm checkFirstStep={checkFirstStep} control={control} errors={errors} />}
                {activeStep === 1 && <DataAddressForm checkSecondStep={checkSecondStep} gotBackStepOne={gotBackStepOne} control={control} errors={errors} />}
                {activeStep === 2 && <DataCardForm onValidSubmit={onValidSubmit} gotBackStepTwo={gotBackStepTwo} control={control} errors={errors} />}
            </FormControl>
        </Box>
    );
}

export default CheckoutForm