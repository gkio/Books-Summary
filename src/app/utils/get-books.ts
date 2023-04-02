import {readFile} from 'fs/promises'
import {books} from '../../books/books'
export const getBook = async (bookId: string) => {
  // @ts-ignore
  const book = books[bookId] ?? {}
  return {
    name: book.name,
    markdown: await readFile(book.path, 'utf-8'),
  }
}
