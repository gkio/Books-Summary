import '../../globals.css'
import {getBook} from "~/app/utils/get-books";
import Markdown from 'markdown-to-jsx';

// @ts-ignore
export default async function Page({ params: { book } }) {
  const {name, markdown} = await getBook(book)

  if(!name || !markdown) {
    return null;
  }

  return (
    <div
      className="mx-auto w-full maclassNamexl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <article className="prose lg:prose-xl dark:prose-invert">
        <h1>{ name }</h1>
        <Markdown options={{forceWrapper: true, forceBlock:true}}>{markdown}</Markdown>
      </article>
    </div>
  )
}
