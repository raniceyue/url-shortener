import React, { useState } from 'react'
import { Typography, Paper, Box } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import { IUserLink, hash } from '../util/helper'
import { createShort } from '../data/api'
import { SHORT_BASEURL } from 'util/global'
import './Form.css'

function Form(props: { handleUpdateData: any }): JSX.Element {

  const [urlFieldError, setUrlFieldError] = useState(false)
  const [link, setLink] = useState<IUserLink>({ name: '', short: '', long: '' })
  const linkHash = link.short === '' ? '...' : link.short

  async function handleSubmit(): Promise<void> {
    let res: any = await createShort({
      short: link.short,
      long: link.long!
    })

    res 
      ? res.status === 200 
        ? props.handleUpdateData(link)
        : console.log(res)
    : console.log('Unable to create short link!')
  }

  function handleUrlChange(url : string): void {
    // Validate the url entered by user and display error if not a proper url
    // eslint-disable-next-line
    const URL_REGEX : RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig
    setUrlFieldError(!URL_REGEX.test(url))
    
    // Display generated hash for user to see
    setLink({ ...link, long: url, short: hash(url) })
    console.log('Displayed hash: ' + linkHash + '\nState hash: ' + link.short)
  }

  return (
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
  );
}

export default Form;