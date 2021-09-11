import createHash from 'create-hash'

/**
 * Interface for storing user links in local storage.
 * Links in local storage do not store the long link to save space
 */
export interface ILocalLink {
  name: string;
  short: string;
}

/**
 * Interface for displaying user links.
 * User links have an additional name/label defined set by the user
 */
export interface IUserLink extends ILocalLink {
  name: string;
  short: string;
  long?: string;
}

/**
 * Function to generate hash to be used for short link
 * @param url - URL to generate hash for
 * @returns First 8 characters of the SHA256 hash generated from the long link
 */
export function hash(url: string): string {
  return createHash('sha256')
    .update(url)
    .digest('hex')
    .slice(0, 7);
}

/**
 * Converts short local links from local storage from string into array of `LocalLink`
 * @returns `ILocalLink[]` of short local links from local storage
 */
export function getLocalStorageLinks(): ILocalLink[] {
  let localLinks: string | null = localStorage.getItem('links')
  if (localLinks) {
    return JSON.parse(localLinks) as ILocalLink[]
  } else {
    localStorage.setItem('links', JSON.stringify([]))
    return []
  }
}

/**
 * Adds new link to local storage
 * @param link - Link to add to local storage
 */
export function updateLocalStorageLinks(link: ILocalLink): void {
  let localLinks: ILocalLink[] = getLocalStorageLinks()
  let updatedLinks: ILocalLink[] = localLinks.concat([{ name: link.name, short: link.short }], localLinks)
  localStorage.setItem('links', JSON.stringify(updatedLinks))
}

/**
 * Removes link from local storage
 * @param link to delete from local storage
 */
export function removeFromLocalStorage(link: ILocalLink): void {
  let localLinks: ILocalLink[] = getLocalStorageLinks()
  let updatedLinks: ILocalLink[] = localLinks.filter(l => JSON.stringify(l) !== JSON.stringify(link))
  localStorage.setItem('links', JSON.stringify(updatedLinks))
}

/**
 * Check if a link already exists in local storage
 * @param link - Link to check for
 * @returns `true` or `false` depending on if link is in local storage
 */
export function findLinkFromLocalStorage(link: ILocalLink): boolean {
  let localLinks: ILocalLink[] = getLocalStorageLinks()
  let matchedLinks: ILocalLink[] = localLinks.filter(l => JSON.stringify(l) === JSON.stringify(link))
  return matchedLinks.length !== 0
}