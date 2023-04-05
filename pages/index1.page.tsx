import { Button } from '@mui/material'
import { useUserContext, useUserToggleContext } from 'dh-marvel/components/Provider/UserProvider'
import React, { useEffect, useState } from 'react'
const Index1 = () => {



    const { user } = useUserContext()
    const { addUser } = useUserToggleContext()
    const [data, setData] = useState({
        name: "",
        apellido: ""
    })

    useEffect(()=>{
        if(data){
            console.log(data)
        }
    },[data])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addUser(data)
    }
    
    const handleChangeName = (e: any) => {
        setData({
            ...data,
            name: e.target.value
        })
    }

    const handleChangeApellido = (e: any) => {
        setData({
            ...data,
            apellido: e.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input onChange={handleChangeName} type="text" name="name" />
                </label>
                <label>
                    Apellido:
                    <input onChange={handleChangeApellido} type="text" name="name" />
                </label>
                <button type="submit">
                    Añadir Usuario
                </button>
            </form>
            <br />
            <br />
            {user?.name + user?.apellido}

        </div>
    )
}

export default Index1