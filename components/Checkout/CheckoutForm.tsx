import { Stack, Alert, AlertProps } from "@mui/material";
import Input from "dh-marvel/components/Input/Input";
import { useState } from "react";
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

const steps = ['Datos Personales', 'Datos de Entrega', 'Datos de Tarjeta'];

const CheckoutForm = ({ comic }: any) => {
    const { handleSubmit, formState: { errors }, control } = useForm();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertCode, setAlertCode] = useState(200);
    const [alertSeverity, setAlertSeverity] = useState<AlertProps['severity']>('success');
    const [alertMessage, setAlertMessage] = useState('');

    // Input name props
    const nameHelperText = errors.name?.type === 'required' ? 'Este campo es requerido' : '';
    const nameError = Boolean(errors.name);

    // Input surname props
    const surnameHelperText = errors.surname?.type === 'required' ? 'Este campo es requerido' : '';
    const surnameError = Boolean(errors.surname);

    // Input email props
    const emailHelperText = errors.email?.type === 'required' ? 'Este campo es requerido' : '';
    const emailError = Boolean(errors.email);

    // Input dirección props
    const direccionHelperText = errors.direccion?.type === 'required' ? 'Este campo es requerido' : '';
    const direccionError = Boolean(errors.direccion);

    // Input departamento props
    const departamentoHelperText = errors.departamento?.type === 'required' ? 'Este campo es requerido' : '';
    const departamentoError = Boolean(errors.departamento);

    // Input ciudad props
    const ciudadHelperText = errors.ciudad?.type === 'required' ? 'Este campo es requerido' : '';
    const ciudadError = Boolean(errors.ciudad);

    // Input provincia props
    const provinciaHelperText = errors.provincia?.type === 'required' ? 'Este campo es requerido' : '';
    const provinciaError = Boolean(errors.provincia);

    // Input codigoPostal props
    const codigoPostalHelperText = errors.codigoPostal?.type === 'required' ? 'Este campo es requerido' : '';
    const codigoPostalError = Boolean(errors.codigoPostal);

    // Input numeroTarjeta props
    const numeroTarjetaHelperText = errors.numeroTarjeta?.type === 'required' ? 'Este campo es requerido' : '';
    const numeroTarjetaError = Boolean(errors.numeroTarjeta);

    // Input fechaExpiracion props
    const fechaExpiracionHelperText = errors.fechaExpiracion?.type === 'required' ? 'Este campo es requerido' : '';
    const fechaExpiracionError = Boolean(errors.fechaExpiracion);

    // Input nombreTarjeta props
    const nombreTarjetaHelperText = errors.nombreTarjeta?.type === 'required' ? 'Este campo es requerido' : '';
    const nombreTarjetaError = Boolean(errors.nombreTarjeta);

    // Input codigoSeguridad props
    const codigoSeguridadHelperText = errors.codigoSeguridad?.type === 'required' ? 'Este campo es requerido' : '';
    const codigoSeguridadError = Boolean(errors.codigoSeguridad);

    const onSubmit = async (data: any) => {
        const buyerData = {
            customer: {
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
            },
            card: {
                number: data.numeroTarjeta,
                cvc: data.codigoSeguridad,
                expDate: data.fechaExpiracion,
                nameOnCard: data.nombreTarjeta
            },
            order: {
                name: comic?.title,
                image: `${comic?.thumbnail.path}.${comic?.thumbnail.extension}`,
                price: comic?.price,
            }
        }
        console.log(buyerData)

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(buyerData)
            })
            console.log(res.status)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            if (res.status === 200) {
                setAlertCode(200)
                setAlertMessage('Compra realizada');
                setOpenAlert(true);
                window.location.href = `/confirmacion-compra/${comic.id}`
            } else if (res.status === 401){
                setAlertCode(400);
                setAlertMessage('Incorrecta dirección!');
                setOpenAlert(true);
            } else if (res.status === 402){
                setAlertCode(400);
                setAlertMessage('Tarjeta sin fondos disponibles!');
                setOpenAlert(true);
            }
            else if (res.status === 403){
                setAlertCode(400);
                setAlertMessage('Tarjeta sin autorización!');
                setOpenAlert(true);
            }
            else if (res.status === 400){
                setAlertCode(400);
                setAlertMessage('Error en el sistema!');
                setOpenAlert(true);
            }
        } catch (error) {
            setAlertSeverity('error');
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
                            error={nameError}
                            helperText={nameHelperText}
                            rules={{
                                required: true
                            }}
                        />
                    </Box>
                    <Box>
                        <Input
                            label="Apellido"
                            control={control}
                            name="surname"
                            error={surnameError}
                            helperText={surnameHelperText}
                            rules={{
                                required: true
                            }}
                        />
                    </Box>
                    <Box>
                        <Input
                            label="Email"
                            control={control}
                            name="email"
                            error={emailError}
                            helperText={emailHelperText}
                            rules={{
                                required: true
                            }}
                        />
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
                            error={direccionError}
                            helperText={direccionHelperText}
                            rules={{
                                required: true
                            }}
                        />
                    </Box>
                    <Box>
                        <Input
                            label="Departamento"
                            control={control}
                            name="departamento"
                            error={departamentoError}
                            helperText={departamentoHelperText}
                            rules={{
                                required: false
                            }}
                        />
                    </Box>
                    <Box>
                        <Input
                            label="Ciudad"
                            control={control}
                            name="ciudad"
                            error={ciudadError}
                            helperText={ciudadHelperText}
                            rules={{
                                required: true
                            }}
                        />
                    </Box>
                    <Box>
                        <Input
                            label="Provincia"
                            control={control}
                            name="provincia"
                            error={provinciaError}
                            helperText={provinciaHelperText}
                            rules={{
                                required: true
                            }}
                        />
                    </Box>
                    <Box>
                        <Input
                            label="Código Postal"
                            control={control}
                            name="codigoPostal"
                            error={codigoPostalError}
                            helperText={codigoPostalHelperText}
                            rules={{
                                required: true
                            }}
                        />
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
                        error={numeroTarjetaError}
                        helperText={numeroTarjetaHelperText}
                        rules={{
                            required: true
                        }}
                    />
                </Box>
                <Box>
                    <Input
                        label="Nombre en la Tarjeta"
                        control={control}
                        name="nombreTarjeta"
                        error={nombreTarjetaError}
                        helperText={nombreTarjetaHelperText}
                        rules={{
                            required: true
                        }}
                    />
                </Box>
                <Box>
                    <Input
                        label="Fecha de Expiración"
                        control={control}
                        name="fechaExpiracion"
                        error={fechaExpiracionError}
                        helperText={fechaExpiracionHelperText}
                        rules={{
                            required: true
                        }}
                    />
                </Box>
                <Box>
                    <Input
                        label="Código de Seguridad"
                        control={control}
                        name="codigoSeguridad"
                        error={codigoSeguridadError}
                        helperText={codigoSeguridadHelperText}
                        rules={{
                            required: true
                        }}
                    />
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
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit(onSubmit)}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'COMPRAR' : 'CONTINUAR'}
                                    </Button>
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
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <CustomizedSnackbars alertCode={alertCode} alertMessage={alertMessage} open={openAlert} setOpen={setOpenAlert} />
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

export default CheckoutForm