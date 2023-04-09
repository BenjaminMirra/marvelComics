import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import Input from '../Input/Input'
import styles from './DataForm.module.css';

const DataUserForm = ({errors, checkFirstStep, control }: any) => {
    return (
        <>
            <Stack gap={2}>
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
                <Box sx={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
            <Button name="Siguiente" sx={{width: 200}} variant="contained" onClick={checkFirstStep}>Siguiente</Button>
            </Box>
            </Stack>
        </>
    )
}

export default DataUserForm