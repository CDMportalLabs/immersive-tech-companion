import React, { useEffect, useState } from "react";
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'

export default function Profile() {
    const router = useRouter();

    return (
        <Box>
            <h2>Profile page</h2>
            <Button variant="contained" onClick={() => {
                if (Cookies.get("customerToken")) {
                    Cookies.remove("customerToken");
                }
                router.back();
                }}>Logout</Button>
        </Box>
    )
}