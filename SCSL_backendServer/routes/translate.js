const express = require('express')
const router = express.Router()
const {exec} = require('child_process')
const fs = require('fs')
const os = require('os')

router.post('/', async (req, res) => {
  await removeFile()  
  // console.log(req.body);
  await storeTextToFile(req.body.SCSL)
  const result = await callTranslationService()
  res.json({Svelte: result})
})

const removeFile = async () => {
  if(os.platform() === 'win32') { 
    await fs.unlink('.\\external_libs\\input.txt', (err) => {
      if (err) throw err
    })
  } else{
    await fs.unlink('./external_libs/input.txt', (err) => {
      if (err) throw err
    })
  }
}

const storeTextToFile = async (text) => {
  if(os.platform() === 'win32') {
    await fs.writeFile('.\\external_libs\\input.txt', text, (err) => {
    if (err) throw err
  })} else {
    await fs.writeFile('./external_libs/input.txt', text, (err) => {
      if (err) throw err
    })
  }
}

const callTranslationService = async () => {
  return new Promise((resolve, reject) => {
    if (os.platform() === 'win32') {
      exec(`java -jar .\\external_libs\\SCSL.jar .\\external_libs\\input.txt`, (err, stdout, stderr) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(stdout)
      })
    } else {
      exec(`java -jar ./external_libs/SCSL.jar ./external_libs/input.txt`, (err, stdout, stderr) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(stdout)
      })
    }      
  })
}

module.exports = router