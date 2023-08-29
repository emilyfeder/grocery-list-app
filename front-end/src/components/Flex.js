import React from 'react';
import { Box } from '@mui/material';

export function Flex({children, sx}) {
    return <Box sx={{display: 'flex', ...sx}}>
        {children}
    </Box>
}