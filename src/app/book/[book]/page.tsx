import '../../globals.css'
import {getBook} from "~/app/utils/get-books";
import Markdown from 'markdown-to-jsx';

// @ts-ignore
export default async function Page(props) {
  const {params: {book}, searchParams: {bookName}} = props
  const {name, markdown} = await getBook(book)

  const hasContent = name && markdown
  return (
    <div
      className="mx-auto w-full maclassNamexl format format-sm sm:format-base lg:format-lg format-blue">
      <a href="/" className="my-10 inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Назад</a>
      {hasContent && (
        <article className="max-w-none prose prose-headings:text-white/[0.8] prose-blockquote:text-white/[0.8] prose-p:text-white/[0.8] prose-li:text-white/[0.8]">
          <h1 className="block">{bookName}</h1>
          <Markdown options={{forceWrapper: true, forceBlock: true}}>{markdown}</Markdown>
        </article>
      )}

      {!hasContent && (
        <article className="prose lg:prose-xl dark:prose-invert">
          <blockquote>
            <p>Читаю 🤓</p>
          </blockquote>
          <blockquote>
            <p>Пока заметок нет :(</p>
          </blockquote>
        </article>
      )}
    </div>
  )
}
