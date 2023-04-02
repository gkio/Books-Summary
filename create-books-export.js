const {readdir, writeFile} = require('fs/promises')
const {resolve} = require('path')
const destinationPath = resolve(__dirname, 'src/books')

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

const createBooksExport = async () => {
  const books = await getBooksNames(destinationPath)

  const bookNames = books.map(book => getBookName(book))

  const booksDB = {}

  bookNames.forEach(book => {
    booksDB[stringToKebabCase(removeSpecialCharacters(book))] = {
      name: book,
      path: resolve(destinationPath, book, 'Summary.md'),
    }
  })

  await writeFile(resolve(destinationPath, 'books.ts'), `export const books = ${JSON.stringify(booksDB, null, 2)}`)
}
createBooksExport().catch(console.error)
