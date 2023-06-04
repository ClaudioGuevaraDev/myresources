import fs from 'fs'
import path from 'path'

export const checkFolders = (): void => {
  const publicPath = path.join(__dirname, '..', 'public')
  const imgsPath = path.join(__dirname, '..', 'public', 'imgs')

  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath)
  }

  if (!fs.existsSync(imgsPath)) {
    fs.mkdirSync(imgsPath)
  }
}
