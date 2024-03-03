"use client"
import React from 'react';
import {Box, Paper, SxProps, Theme, Typography, useTheme} from "@mui/material";


export interface TitleProps {
  children: React.ReactNode,
  style?: React.CSSProperties,
  sx?: SxProps<Theme>,
  sxTitle?: SxProps<Theme>
}

function Title({children, style, sx, sxTitle}: TitleProps) {
  const them = useTheme();
  return (
    <Paper elevation={3} style={style} sx={sx}>
      <Box p={1}>
        <Typography variant={'h6'} sx={sxTitle}>
          {children}
        </Typography>
      </Box>
      <Box sx={{background: them.palette.secondary.main || '#000', height: '6px'}}/>
    </Paper>

  );
}

export default Title;
