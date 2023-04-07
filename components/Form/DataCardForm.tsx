import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import Input from '../Input/Input'
import styles from './DataForm.module.css';

const DataCardForm = ({ errors, gotBackStepTwo, onValidSubmit, control }: any) => {
    return (
        <>
            <Stack gap={2}>
                <Box>
                    <Input
                        label="Número de Tarjeta"
                        control={control}
                        name="numeroTarjeta"
                        type="text"
                        rules={{ required: false }}
                    />
                    <p className={styles.errorMessage}>{errors.numeroTarjeta?.message?.toString()}</p>
                </Box>
                <Box>
                    <Input
                        label="Nombre en la Tarjeta"
                        control={control}
                        name="nombreTarjeta"
                        type="text"
                        rules={{ required: false }}
                    />
                    <p className={styles.errorMessage}>{errors.nombreTarjeta?.message?.toString()}</p>
                </Box>
                <Box>
                    <Input
                        label="Fecha de Expiración"
                        control={control}
                        name="fechaExpiracion"
                        type="text"
                        rules={{ required: false }}
                    />
                    <p className={styles.errorMessage}>{errors.fechaExpiracion?.message?.toString()}</p>
                </Box>
                <Box>
                    <Input
                        label="Código de Seguridad"
                        control={control}
                        name="codigoSeguridad"
                        type="password"
                        rules={{ required: false }}
                    />
                    <p className={styles.errorMessage}>{errors.codigoSeguridad?.message?.toString()}</p>
                </Box>
                <Box sx={{width: "100%", display: "flex", justifyContent: "space-around"}}>
                <Button sx={{width: 200}} onClick={gotBackStepTwo} variant="outlined">Atrás</Button>
                <Button sx={{width: 200}} onClick={onValidSubmit} variant="contained">Comprar</Button>
                </Box>
            </Stack>
        </>
    )
}

export default DataCardForm