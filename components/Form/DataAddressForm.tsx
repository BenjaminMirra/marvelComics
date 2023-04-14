import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import Input from '../Input/Input'
import styles from './DataForm.module.css';

const DataAddressForm = ({ errors, checkSecondStep, gotBackStepOne, control }: any) => {
    return (
        <>
            <Stack gap={2}>
                <Box>
                    <Input
                        label="Dirección *"
                        control={control}
                        name="direccion"
                        type="text"
                        rules={{ required: true }}
                    />
                    <Typography variant="caption" className={styles.errorMessage}>{errors.direccion?.message?.toString()}</Typography>
                </Box>
                <Box>
                    <Input
                        label="Departamento"
                        control={control}
                        name="departamento"
                        type="text"
                        rules={{ required: false }}
                    />
                    <Typography variant="caption" className={styles.errorMessage}>{errors.departamento?.message?.toString()}</Typography>
                </Box>
                <Box>
                    <Input
                        label="Ciudad *"
                        control={control}
                        name="ciudad"
                        type="text"
                        rules={{ required: true }}
                    />
                    <Typography variant="caption" className={styles.errorMessage}>{errors.ciudad?.message?.toString()}</Typography>
                </Box>
                <Box>
                    <Input
                        label="Provincia *"
                        control={control}
                        name="provincia"
                        type="text"
                        rules={{ required: true }}
                    />
                    <Typography variant="caption" className={styles.errorMessage}>{errors.provincia?.message?.toString()}</Typography>
                </Box>
                <Box>
                    <Input
                        label="Código Postal *"
                        control={control}
                        name="codigoPostal"
                        type="text"
                        rules={{ required: true }}
                    />
                    <Typography variant="caption" className={styles.errorMessage}>{errors.codigoPostal?.message?.toString()}</Typography>
                </Box>
                <Typography sx={{ color: "gray" }} variant="overline">* required</Typography>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
                    <Button role="atras1" sx={{ width: 200 }} onClick={gotBackStepOne} variant="outlined">Atrás</Button>
                    <Button role="siguiente2" sx={{ width: 200 }} onClick={checkSecondStep} variant="contained">Siguiente</Button>
                </Box>
            </Stack>
        </>
    )
}

export default DataAddressForm
