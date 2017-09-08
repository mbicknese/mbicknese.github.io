
export default {
  urlToFilename (url) {
    const parts = url.split('/')
    return `${parts[0]}-${parts[1]}-${parts[2]}-${parts[3].replace(/-/g, ' ')}.md`
  },

  filenameToUrl (filename) {
    return filename.replace(/-/g, '/').replace(/ /gi, '-').replace('.md', '')
  }
}
