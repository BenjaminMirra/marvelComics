import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import Input from '../Input/Input'
import styles from './DataForm.module.css';

const DataAddressForm = ({ errors, checkSecondStep, gotBackStepOne, control }: any) => {
    return (
        <>
            <Stack gap={2}>
                <Box>
                    <Input
                        label="Dirección"
                        control={control}
                        name="direccion"
                        type="text"
                        rules={{ required: true }}
                    />
                    <p className={styles.errorMessage}>{errors.direccion?.message?.toString()}</p>
                </Box>
                <Box>
                    <Input
                        label="Departamento"
                        control={control}
                        name="departamento"
                        type="text"
                        rules={{ required: false }}
                    />
                    <p className={styles.errorMessage}>{errors.departamento?.message?.toString()}</p>
                </Box>
                <Box>
                    <Input
                        label="Ciudad"
                        control={control}
                        name="ciudad"
                        type="text"
                        rules={{ required: true }}
                    />
                    <p className={styles.errorMessage}>{errors.ciudad?.message?.toString()}</p>
                </Box>
                <Box>
                    <Input
                        label="Provincia"
                        control={control}
                        name="provincia"
                        type="text"
                        rules={{ required: true }}
                    />
                    <p className={styles.errorMessage}>{errors.provincia?.message?.toString()}</p>
                </Box>
                <Box>
                    <Input
                        label="Código Postal"
                        control={control}
                        name="codigoPostal"
                        type="text"
                        rules={{ required: true }}
                    />
                    <p className={styles.errorMessage}>{errors.codigoPostal?.message?.toString()}</p>
                </Box>
                <Box sx={{width: "100%", display: "flex", justifyContent: "space-around"}}>
                    <Button sx={{ width: 200 }} onClick={gotBackStepOne} variant="outlined">Atrás</Button>
                    <Button sx={{ width: 200 }} onClick={checkSecondStep} variant="contained">Siguiente</Button>
                </Box>
            </Stack>
        </>
    )
}

export default DataAddressForm
