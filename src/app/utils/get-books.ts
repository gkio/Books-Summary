import {readFile} from 'fs/promises'
import {books} from '../../books/books'

const IS_DEV = process.env.NODE_ENV === 'development'

const getBookMarkdown = async (bookPath: any) => {
  const path = encodeURI(bookPath)

  const baseUrl = IS_DEV ? 'http://localhost:3000': 'https://books-summary.vercel.app'
  const staticData = await fetch(`${baseUrl}/${path}`, {cache: 'reload'});

  return staticData.text()
}


export const getBook = async (bookId: string) => {
  // @ts-ignore
  const book = books[bookId] ?? {}
  return {
    name: book.name,
    markdown: await getBookMarkdown(book.path),
  }
}
