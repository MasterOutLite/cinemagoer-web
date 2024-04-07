import React from 'react';
import {Box} from "@mui/material";

export interface BreakBlockProps {
  height?: number,
}

function BreakBlock2({height}: BreakBlockProps) {
  return (
    <Box py={1}>
      <Box sx={{background: '#6d1b7b', height: height || 6}}/>
    </Box>
  );
}

export default BreakBlock2;
