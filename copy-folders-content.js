const {readdir, stat, mkdir, copyFile, writeFile} = require('fs/promises')
const {rimraf} = require('rimraf')
const {resolve} = require('path')

const booksPath = resolve(__dirname, '../../books-notes/Books')
const destinationPath = resolve(__dirname, 'public/books')

const copyFolder = async (source, destination) => {
  const folderStats = await stat(source)
  if (folderStats.isDirectory()) {
    await mkdir(destination, {recursive: true})
    await copyFoldersContent(source, destination)
  }
}

const deleteAllContentFromDirectory = async (directory) => {
  const files = await readdir(directory)
  for (const file of files) {
    await rimraf(resolve(directory, file))
  }
}

const getBooksNames = async (source) => {
  const allDirectories = await readdir(source)
  return allDirectories
    .filter(file => file !== '.DS_Store' && file !== '.obsidian')
}

const getBookName = (book) => {
  return book.replace('📚', '').replace('👀', ' ').trim()
}

const removeSpecialCharacters = (string) => {
  return string.replace(/[^\w\s]/gi, '')
}

const stringToKebabCase = (string) => {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
}

const copyFoldersContent = async (source, destination) => {
  await deleteAllContentFromDirectory(destination)
  const files = await getBooksNames(source)
  for (const file of files) {
    const book = getBookName(file)
    const sourcePath = resolve(source, file)
    const destinationDirectoryPath = resolve(destination, stringToKebabCase(removeSpecialCharacters(book)))
    const destinationFilePath = resolve(destination, book)
    const fileStats = await stat(sourcePath)
    if (fileStats.isDirectory()) {
      await copyFolder(sourcePath, destinationDirectoryPath)
    } else {
      await copyFile(sourcePath, destinationFilePath)
    }
  }
}

copyFoldersContent(booksPath, destinationPath).catch(console.error)
