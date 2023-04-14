import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import Input from '../Input/Input'
import styles from './DataForm.module.css';

const DataUserForm = ({errors, checkFirstStep, control }: any) => {
    return (
        <>
            <Stack gap={2}>
                <Box>
                    <Input
                        label="Nombre *"
                        control={control}
                        name="name"
                        type="text"
                        rules={{ required: true }}
                    />
                    <Typography variant="caption" className={styles.errorMessage}>{errors.name?.message?.toString()}</Typography> 
                </Box>
                <Box>
                    <Input
                        label="Apellido *"
                        control={control}
                        name="surname"
                        type="text"
                        rules={{ required: true }}
                    />
                    <Typography variant="caption" className={styles.errorMessage}>{errors.surname?.message?.toString()}</Typography> 
                </Box>
                <Box>
                    <Input
                        label="Correo Electrónico *"
                        control={control}
                        name="email"
                        type="text"
                        rules={{ required: true }}
                    />
                    <Typography variant="caption" className={styles.errorMessage}>{errors.email?.message?.toString()}</Typography> 
                </Box>
                <Typography sx={{color: "gray"}}variant="overline">* required</Typography>
                <Box sx={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
            <Button role="siguiente1" name="Siguiente" sx={{width: 200}} variant="contained" onClick={checkFirstStep}>Siguiente</Button>
                
            </Box>
            </Stack>
        </>
    )
}

export default DataUserForm