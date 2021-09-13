import React from 'react'

import { CircularProgress, Typography } from '@material-ui/core'

import { IUserLink } from '../util/helper'
import LinkCard from '../components/LinkCard'

import './LinksList.css'

export default function LinksList(props: { 
  handleDeleteLink: any,
  data: IUserLink[],
  loading: boolean,
}): JSX.Element {

  if (props.loading) {
    return (
      <div className="no-list-container">
        <CircularProgress />
      </div>
    )
  } else {
    if (props.data.length === 0) {
      return (
        <div className="no-list-container">
          <Typography variant="h6">
            You currently have no short links.
          </Typography>
        </div>
      )
    }
  }

  return <>{
    props.data.map((link: IUserLink) => (
      <LinkCard 
        key={link.short}
        handleDeleteLink={props.handleDeleteLink}
        link={link}
      />
    ))
  }</>
}