import React from 'react';
import {Box, Paper, SxProps, Theme, useTheme} from "@mui/material";

export interface BreakBlockProps {
  sx?: SxProps<Theme>,
}

function BreakBlock({sx}: BreakBlockProps) {
  const them = useTheme();
  return (
    <Paper elevation={8} sx={sx}>
      <Box p={1}>
      </Box>
      <Box sx={{background: them.palette.secondary.main, height: '6px'}}/>
    </Paper>
  );
}

export default BreakBlock;
