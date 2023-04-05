import { Stack, AlertProps } from "@mui/material";
import Input from "dh-marvel/components/Input/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import StepContent from '@mui/material/StepContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomizedSnackbars from "../StackBar/StackBar";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './CheckoutForm.module.css'
import { useBuyContext } from "../Provider/BuyProvider";

const steps = ['Datos Personales', 'Datos de Entrega', 'Datos de Tarjeta'];

const schema = yup.object({
    name: yup.string().required("El Nombre es requerido."),
    surname: yup.string().required("El Apellido es requerido."),
    email: yup.string().email("Debe contener un formato correcto.").required("El Email es requerido."),
    // direccion: yup.string().min(5, "es minimo").required("El Dirección es requerida."),
    // departamento: yup.string(),
    // ciudad: yup.string().required("La Ciudad es requerida."),
    // provincia: yup.string().required("La Pronvicina es requerida."),
    // codigoPostal: yup.number().required("El Código Postal es requerido."),
    // numeroTarjeta: yup.number().required("El Número de la Tarjeta es requerido."),
    // nombreTarjeta: yup.number().required("El Nombre de la Tarjeta es requerido."),
    // fechaExpiracion: yup.number().required("La Fecha de Expiración es requerida."),
    // codigoSeguridad: yup.number().required("El Código de Seguridad es requerido."),
}).required();

const CheckoutForm = ({ comic }: any) => {


    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    });
    const [openAlert, setOpenAlert] = useState(false);
    const [alertCode, setAlertCode] = useState(200);
    const [alertMessage, setAlertMessage] = useState('');

    const { customer, addBuyer, card, order } = useBuyContext();

    const onSubmit = async (data: any) => {
        addBuyer({
            name: data.name,
            lastname: data.surname,
            email: data.email,
            address: {
                address1: data.direccion,
                address2: data.departamento,
                city: data.ciudad,
                state: data.provincia,
                zipCode: data.codigoPostal
            }
        }, {
            number: data.numeroTarjeta,
            cvc: data.codigoSeguridad,
            expDate: data.fechaExpiracion,
            nameOnCard: data.nombreTarjeta
        })
        console.log(customer);
        console.log(card);
        console.log(order);


        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            console.log(res.status)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            if (res.status === 200) {
                setAlertCode(200)
                setAlertMessage('Compra realizada');
                setOpenAlert(true);
                window.location.href = `/confirmacion-compra/${comic.id}`
            } else if (res.status === 401) {
                setAlertCode(400);
                setAlertMessage('Incorrecta dirección!');
                setOpenAlert(true);
            } else if (res.status === 402) {
                setAlertCode(400);
                setAlertMessage('Tarjeta sin fondos disponibles!');
                setOpenAlert(true);
            }
            else if (res.status === 403) {
                setAlertCode(400);
                setAlertMessage('Tarjeta sin autorización!');
                setOpenAlert(true);
            }
            else if (res.status === 400) {
                setAlertCode(400);
                setAlertMessage('Error en el sistema!');
                setOpenAlert(true);
            }
        } catch (error) {
            setAlertMessage('Error al comprar');
            setOpenAlert(true);
        }
    }

    const steps = [
        {
            label: 'Datos Personales',
            description:
                <Stack gap={3}>
                    <Box>
                        <Input
                            label="Nombre"
                            control={control}
                            name="name"
                            type="text"
                            rules={{ required: true }}
                        />
                        <p className={styles.errorMessage}>{errors.name?.message?.toString()}</p>
                    </Box>
                    <Box>
                        <Input
                            label="Apellido"
                            control={control}
                            name="surname"
                            type="text"
                            rules={{ required: true }}
                        />
                        <p className={styles.errorMessage}>{errors.surname?.message?.toString()}</p>
                    </Box>
                    <Box>
                        <Input
                            label="Correo Electrónico"
                            control={control}
                            name="email"
                            type="text"
                            rules={{ required: true }}
                        />
                        <p className={styles.errorMessage}>{errors.email?.message?.toString()}</p>
                    </Box>
                </Stack>,
        },
        {
            label: 'Datos para Entrega',
            description:
                <Stack gap={3}>
                    <Box>
                        <Input
                            label="Dirección"
                            control={control}
                            name="direccion"
                            type="text"
                            rules={{ required: true }}
                        />
                        <p>{errors.control?.message?.toString()}</p>
                    </Box>
                    <Box>
                        <Input
                            label="Departamento"
                            control={control}
                            name="departamento"
                            type="text"
                            rules={{ required: false }}
                        />
                        <p>{errors.departamento?.message?.toString()}</p>
                    </Box>
                    <Box>
                        <Input
                            label="Ciudad"
                            control={control}
                            name="ciudad"
                            type="text"
                            rules={{ required: true }}
                        />
                        <p>{errors.ciudad?.message?.toString()}</p>
                    </Box>
                    <Box>
                        <Input
                            label="Provincia"
                            control={control}
                            name="provincia"
                            type="text"
                            rules={{ required: true }}
                        />
                        <p>{errors.provincia?.message?.toString()}</p>
                    </Box>
                    <Box>
                        <Input
                            label="Código Postal"
                            control={control}
                            name="codigoPostal"
                            type="text"
                            rules={{ required: true }}
                        />
                        <p>{errors.codigoPostal?.message?.toString()}</p>
                    </Box>
                </Stack>,
        },
        {
            label: 'Datos de Tarjeta',
            description: <Stack gap={3}>
                <Box>
                    <Input
                        label="Número de Tajerta"
                        control={control}
                        name="numeroTarjeta"
                        type="text"
                        rules={{ required: false }}
                    />
                    <p>{errors.numeroTarjeta?.message?.toString()}</p>
                </Box>
                <Box>
                    <Input
                        label="Nombre en la Tarjeta"
                        control={control}
                        name="nombreTarjeta"
                        type="text"
                        rules={{ required: false }}
                    />
                    <p>{errors.nombreTarjeta?.message?.toString()}</p>
                </Box>
                <Box>
                    <Input
                        label="Fecha de Expiración"
                        control={control}
                        name="fechaExpiracion"
                        type="text"
                        rules={{ required: false }}
                    />
                    <p>{errors.fechaExpiracion?.message?.toString()}</p>
                </Box>
                <Box>
                    <Input
                        label="Código de Seguridad"
                        control={control}
                        name="codigoSeguridad"
                        type="password"
                        rules={{ required: false }}
                    />
                    <p>{errors.codigoSeguridad?.message?.toString()}</p>
                </Box>
            </Stack>,
        },
    ];

    const [activeStep, setActiveStep] = useState(0);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ maxWidth: 400 }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">ÚLTIMO PASO</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {step.description}
                            <Box sx={{ mb: 2 }}>
                                <div>

                                    {index === steps.length - 1 ? (
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit(onSubmit)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            COMPRAR
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit(onSubmit)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            CONTINUAR
                                        </Button>
                                    )}
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        ATRÁS
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {
                activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <CustomizedSnackbars alertCode={alertCode} alertMessage={alertMessage} open={openAlert} setOpen={setOpenAlert} />
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )
            }
        </Box >
    );
}

export default CheckoutForm