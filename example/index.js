let fs = require('fs')
let postcss = require('postcss')

let postcssSUDev = require('..')

const basePath = `${ process.cwd() }/example`

function processFile (file) {
  function useFileData (data) {
    postcss([postcssSUDev({ outputPath: basePath })])
      .process(data, { from: undefined })
      .then(result => {
        fs.writeFile(
          `${ basePath }/${ file.split('.')[0] }.clean.css`,
          result.css,
          err => {
            if (err) {
              console.error('ERROR: ', err)
              process.exit(1)
            }
          }
        )
      })
  }

  if (file === 'example.css') {
    fs.readFile(`${ basePath }/${ file }`, 'utf8', (err, data) => {
      if (err) {
        throw new Error(err)
      }
      useFileData(data, file)
    })
  }
}

processFile('example.css')
