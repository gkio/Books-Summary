import {books} from '../books/books'


const getGoogleApiBook = async (book: any) => {
  const name = encodeURI(book.name)
  const staticData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}&orderBy=relevance&printType=BOOKS`, {cache: 'force-cache'});

  return staticData.json()
}

const getBooks = async () => {
  const booksEntries = Object.entries(books)
  const booksList = []

  for await (const [slug, book] of booksEntries) {
    const googleApiBook = await getGoogleApiBook(book)

    if (googleApiBook.items) {
      const bookData = googleApiBook.items[0].volumeInfo
      booksList.push({
          id: slug,
          name: bookData.title,
          publishedDate: bookData.publishedDate,
          description: bookData.description,
          authors: bookData.authors,
          imageLinks: bookData.imageLinks,
        }
      )
    }
  }
  return booksList
}

const cutTextAndAddDots = (text: string, length: number) => {
  if (text.length > length) {
    return text.substring(0, length) + '...'
  }
  return text
}

export default async function Home() {
  const booksList = await getBooks()
  return (
    <div
      className="">
      {booksList.map((book) => {
        return (
          <div className="mb-8 border-dotted border-b pb-8 border-gray-300" key={book.id}>
            <a href={`/book/${book.id}?bookName=${book.name}`}>
              <h1 className="text-3xl my-5">
                <span className="block">{book.name}</span>
              </h1>
              <img src={book.imageLinks.thumbnail} alt={book.name}/>
              <p className="excerpt">
                {book.description && cutTextAndAddDots(book.description, 50)}
              </p>
            </a>
            {book.authors.map((author: string) => {
              return (<a className="tag spirituality" key={author} href="#">{author}</a>)
            })}
            <span className="block md:inline md:float-right md:pt-4 pt-2 created-date">
                {book.publishedDate}
              </span>
          </div>
        )
      }
      )}
    </div>
  )
}
