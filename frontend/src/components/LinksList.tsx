import React from 'react'

import { Typography } from '@material-ui/core'

import { IUserLink } from '../util/helper'
import LinkCard from '../components/LinkCard'

export default function LinksList(props: { 
  handleDeleteLink: any,
  data: IUserLink[]
}): JSX.Element {

  if (props.data.length === 0) {
    return (
      <Typography variant="h6">
        You currently have no short links.
      </Typography>
    )
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