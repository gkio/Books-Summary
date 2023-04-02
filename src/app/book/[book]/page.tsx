import '../../globals.css'
import {getBook} from "~/app/utils/get-books";
import Markdown from 'markdown-to-jsx';

// @ts-ignore
export default async function Page({params: {book}}) {
  const {name, markdown} = await getBook(book)

  const hasContent = name && markdown

  return (
    <div
      className="mx-auto w-full maclassNamexl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      {hasContent && (
        <article className="prose lg:prose-xl dark:prose-invert">
          <h1>{name}</h1>
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
