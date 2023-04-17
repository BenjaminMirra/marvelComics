import * as React from 'react';
import Box from '@mui/material/Box';
import Image from "next/image";
import {Link} from "@mui/material";

const GeneralFooter = () => {
    return (
        <Box  component={"footer"} display={'flex'}  p={'1rem 0'}
              alignItems='center'
              justifyContent={'center'}
              borderTop={'1px solid #eaeaea'}
        sx={{backgroundColor: '#000'}}>
            <Link
                href="https://mirrabenjamin.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                display={'flex'}
                flexGrow={1}
                alignItems={'center'}
                justifyContent={'center'}
                color={'#fff'}
                sx={{textDecoration: 'none'}}
            >
                Desarrollo web realizado por Mirra Benjamín

            </Link>
        </Box>
    );
};
export default GeneralFooter;
