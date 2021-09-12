import React, { useState } from 'react'
import { Typography, Paper, Box } from '@material-ui/core'
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import { IUserLink, hash, findLinkFromLocalStorage } from '../util/helper'
import { createShort } from '../data/api'
import { SHORT_BASEURL } from 'util/global'
import './Form.css'

function Form(props: { handleUpdateData: any }): JSX.Element {

  // UI states
  const [dialog, setDialog] = useState({
    open: false,
    title: '',
    content: ''
  })
  const [urlFieldError, setUrlFieldError] = useState(false)

  // Data states
  const [link, setLink] = useState<IUserLink>({ name: '', short: '', long: '' })
  const linkHash = link.short === '' ? '...' : link.short

  function handleDialogClose(): void {
    setDialog({
      open: false,
      title: '',
      content: ''
    })
  }

  async function handleSubmit(): Promise<void> {
    // Check if link with same name and hash already exists in local storage
    let linkExists = findLinkFromLocalStorage({
      name: link.name,
      short: link.short
    })

    if (urlFieldError) {
      setDialog({
        open: true,
        title: 'Invalid URL!',
        content: 'You have entered an invalid URL. Please enter a valid URL e.g. https://google.com'
      })
    } else {
      if (linkExists) {
        setDialog({
          open: true,
          title: 'Link already exists',
          content: 'You have already created this link'
        })
      } else {
        let res: any = await createShort({
          short: link.short,
          long: link.long!
        })

        let errorDialog: any = {
          open: true,
          title: 'Sorry :(',
          content: 'An error occured and we were not able to create the short link.'
        }

        res
        ? res.status === 200 
          ? props.handleUpdateData(link)
            : setDialog(errorDialog)
        : setDialog(errorDialog)
      }
    }
  }

  function handleUrlChange(url : string): void {
    // Validate the url entered by user and display error if not a proper url
    // eslint-disable-next-line
    const URL_REGEX : RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig
    setUrlFieldError(!URL_REGEX.test(url))
    
    // Display generated hash for user to see
    setLink({ ...link, long: url, short: hash(url) })
  }

  return (
    <>
      <Box width={{ xs: '100%', md: '100%', lg: '100%' }}>
        <Paper className="form" elevation={0}>
          <form>
            <Typography variant="h6">
              Shorten a link
            </Typography>
            <div className="form-fields">
              <TextField 
                required
                placeholder="Link Name"
                variant="outlined" 
                margin="dense"
                onChange={(e) => setLink({ ...link, name: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }} />
              <TextField
                required
                error={urlFieldError}
                placeholder="URL"
                variant="outlined"
                margin="dense"
                onChange={(e) => handleUrlChange(e.target.value.replace(/ /g, ''))}
                helperText="Please enter a valid URL"
                InputLabelProps={{
                  shrink: true,
                }}/>
            </div>
            <Box mt={1}>
              Short link: &nbsp;
              <Typography variant="caption">
                {SHORT_BASEURL + linkHash}
              </Typography>
            </Box>
            <Box my={2} display="flex" alignContent="right">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
      <Dialog
        open={dialog.open}
        onClose={() => handleDialogClose()}
      >
        <DialogContent>
          <DialogTitle>{dialog.title}</DialogTitle>
          <DialogContentText>
            {dialog.content}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Form;