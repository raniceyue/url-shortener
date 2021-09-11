import React, { useState, useEffect } from 'react';

import { Box, Grid, Toolbar } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import { getLong } from './data/api'
import { IUserLink, ILocalLink, getLocalStorageLinks, removeFromLocalStorage, updateLocalStorageLinks } from './util/helper'

import Footer from './components/Footer';
import Sidebar from './components/Sidebar'
import LinksList from './components/LinksList';

import theme from './styles/theme'
import './App.css';

function App(): JSX.Element {
  const [data, setData] = useState<IUserLink[]>([]);

  function handleUpdateData(link: IUserLink): void {
    setData([link, ...data])
    delete link.long
    updateLocalStorageLinks(link)
  }

  function handleDeleteLink(link: IUserLink): void {
    setData(data.filter(l => l !== link))
    delete link.long
    removeFromLocalStorage(link)
  }

  useEffect(() => {
    let localLinks: ILocalLink[] = getLocalStorageLinks()

    const getLongLinks = async() => {
      let fetchedData: IUserLink[] = []

      // Create array of promises that fetch long links
      let requests: Promise<any>[] = localLinks.map((link) => {
        return getLong(link.short)
      })

      return Promise.all(requests).then((res: any) => {
        res.forEach((res: any) => {
          if (res) {
            // Find name of link through local links based on hash
            let localLink = localLinks.find((l) => l.short === res.data.data.short)
            let name = localLink ? localLink.name : ''
            let link: IUserLink = {
              name: name,
              short: res.data.data.short,
              long: res.data.data.long
            }
            switch(res.status) {
              case 200:
                fetchedData.push(link)
                break
              case 404:
                // If link does not exist in db, remove from local storage
                delete link.long
                removeFromLocalStorage(link)
                break
              default:
                console.log('Something went wrong when trying to fetch link')
                break
            }
          }
        })
        setData(fetchedData)
      })
    }
    getLongLinks()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Toolbar />
      <Grid
        container
        spacing-sm={0}
        spacing-lg={1}
        alignItems="stretch"
      >
        <Grid item xs={12} sm={12} md={5} lg={4} xl={4}>
          <Sidebar handleUpdateData={handleUpdateData} />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
          <Box mr={{ xs: 0, md: 0, lg: 2, xl: 2}}>
            <LinksList
              handleDeleteLink={handleDeleteLink}
              data={data}
            />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
