import * as fs from 'fs';


export const readFile = (fname, callback) => {
  fs.readFile(fname, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    return callback(data)
  })
}

export const readFile2 = (fname, callback) => {
  fs.readFile(fname, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    return callback(data.trim().split("\n"))
  })
}
