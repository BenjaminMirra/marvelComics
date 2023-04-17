import { SyntheticEvent, forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import DataUserForm from "../../Form/DataUserForm";
import DataAddressForm from "../../Form/DataAddressForm";
import DataCardForm from "../../Form/DataCardForm";
import { FormControl, Snackbar } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { useBuyContext } from "../../Provider/BuyProvider";
import { useRouter } from "next/router";
import styles from './CheckoutForm.module.css'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ['Datos Personales', 'Datos de Entrega', 'Datos de Tarjeta'];

const schema = yup.object({
    name: yup.string().required("El Nombre es requerido."),
    surname: yup.string().required("El Apellido es requerido."),
    email: yup.string().email("Debe contener un formato correcto.").required("El Email es requerido."),
    direccion: yup.string().required("La Dirección es requerida."),
    departamento: yup.string(),
    ciudad: yup.string().required("La Ciudad es requerida."),
    provincia: yup.string().required("La Provincia es requerida."),
    codigoPostal: yup.string().required("El Código Postal es requerido."),
    numeroTarjeta: yup.string().required("El Número de la Tarjeta es requerido, tendría que ser: 42424242 4242 4242."),
    nombreTarjeta: yup.string().required("El Nombre de la Tarjeta es requerido."),
    fechaExpiracion: yup.string().required("La Fecha de Expiración es requerida."),
    codigoSeguridad: yup.string().required("El Código de Seguridad es requerido."),
}).required();

const CheckoutForm = () => {

    const { setCustomer } = useBuyContext()
    const router = useRouter()

    const { formState: { errors }, control, watch, trigger, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("")
    const [severityMessage, setSeverityMessage] = useState<AlertColor | any>("success")

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
        setActiveStep(1)
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

    const onValidSubmit = async () => {
        if (await checkThirdStep()) {
            const postData = {
                customer: {
                    name: watch().name,
                    lastname: watch().surname,
                    email: watch().email,
                    address: {
                        address1: watch().direccion,
                        address2: watch().departamento,
                        city: watch().ciudad,
                        state: watch().provincia,
                        zipCode: watch().codigoPostal
                    }
                },
                card: {
                    number: watch().numeroTarjeta,
                    cvc: watch().codigoSeguridad,
                    expDate: watch().fechaExpiracion,
                    nameOnCard: watch().nombreTarjeta
                }
            }
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            const response = await res.json()
            if (response?.error) {
                setAlertMessage(JSON.stringify(response?.message))
                setSeverityMessage("error")
            }
            else {
                setAlertMessage(`"Compra realizada"`)
                setSeverityMessage("success")
                setCustomer(postData.customer)
                router.push("/confirmacion-compra")
            };
            handleClick()
        }
    }
    return (
        <Box className={styles.container} sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <FormControl sx={{ width: "100%", padding: 5 }} onSubmit={handleSubmit(onValidSubmit)}>
                {activeStep === 0 && <DataUserForm checkFirstStep={checkFirstStep} control={control} errors={errors} />}
                {activeStep === 1 && <DataAddressForm checkSecondStep={checkSecondStep} gotBackStepOne={gotBackStepOne} control={control} errors={errors} />}
                {activeStep === 2 && <DataCardForm onValidSubmit={onValidSubmit} gotBackStepTwo={gotBackStepTwo} control={control} errors={errors} />}
            </FormControl>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severityMessage} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default CheckoutForm