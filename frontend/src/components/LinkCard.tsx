import React, { useState } from 'react'
import { IconButton, Link, Typography } from '@material-ui/core'
import { Paper, CardContent } from '@material-ui/core'
import { Collapse } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import FileCopyIcon from '@material-ui/icons/FileCopy'

import { IUserLink } from 'util/helper'
import { SHORT_BASEURL } from 'util/global'
import './LinkCard.css';

export default function LinkCard(props: {
  handleDeleteLink: any,
  link: IUserLink
}): JSX.Element {

  const formatted = SHORT_BASEURL + props.link.short
  const [collapse, setCollapse] = useState(true)
  // const openCopied = useRef(false)

  /**
   * Callback to handle copying of short link
   * @param short - Short link to copy
   */
  function handleCopy(short: string): void {
    navigator.clipboard.writeText(short)
    /* openCopied.current = true
    setTimeout(() => {
      openCopied.current = false
    }, 700)*/
  }

  /**
   * Callback to handle deletion of links
   * Links will only be deleted on the client side as other
   * people may be using the same links
   */
  function handleDelete(): void {
    setCollapse(false)
    setTimeout(() => {
      props.handleDeleteLink(props.link)
    }, 500)
  }

  return(
    <Collapse in={collapse}>
      <Paper className="link-card" elevation={3}>
        <IconButton
          className="btn-delete"
          onClick={() => handleDelete()}
        >
          <DeleteIcon color="disabled" />
        </IconButton>
        <CardContent>
          <Typography className="truncate" variant="h6">
            {props.link.name} &nbsp;
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/*<Tooltip
              open={openCopied.current}
              disableFocusListener
              disableHoverListener
              placement="top"
              title="Copied!"
              arrow
            >*/}
              <Link href={formatted}>{formatted}</Link>
            {/*</Tooltip>*/}
            <button
              className="btn-copy"
              onClick={() => handleCopy(formatted)}
            >
              <FileCopyIcon color="disabled" fontSize="inherit"/>Copy
            </button>
          </div>
          <Typography
            className="truncate"
            variant="body2"
          >
            {props.link.long}
          </Typography>
        </CardContent>
      </Paper>
    </Collapse>
  )
}