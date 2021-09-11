import React from "react";

import { Box, Typography } from "@material-ui/core";

import Form from './Form';

import './Sidebar.css';

export default function Sidebar(props: { handleUpdateData: any }): JSX.Element {
  return (
    <div className="sidebar">
      <Box width="100%">
        <Typography className="logo" variant="h2">
          URL<br/>Shortener
        </Typography>
        <Form handleUpdateData={props.handleUpdateData} />
      </Box>
    </div>
  )
}