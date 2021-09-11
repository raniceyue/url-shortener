import React from "react";

import { Toolbar } from '@material-ui/core'

import './Footer.css'

export default function Footer(): JSX.Element {
  return (
    <>
      <Toolbar/>
      <footer className="footer">
        GovTech please hire me &nbsp; | &nbsp; Made with love by Ranice
      </footer>
    </>
  );
}