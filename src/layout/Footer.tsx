import React from 'react';
import {Container, Divider, Stack} from "@mui/material";

function Footer() {
    return (
        <Container sx={{pt: 3}}>
            <Divider/>
            <Stack direction='row' pt={1}>
                <Stack>
                    Дипломна курсова робота
                </Stack>
            </Stack>
        </Container>
    );
}

export default Footer;
