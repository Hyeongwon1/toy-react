import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item"
import fetchBooks from "@/lib/fetch-books";
import {useRouter} from "next/router";
import {BookData} from "@/types";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: {
//       books
//     },
//   };
// };
// export default function Page({books}: InferGetStaticPropsType<typeof getStaticProps>) {
export default function Page(){
  const [books,setBooks] = useState<BookData []>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async ()=>{
    const data = await fetchBooks(q as string);
    setBooks(data);
  }


  useEffect(() => {
    if(q){
      fetchSearchResult().then(r =>r);
    }
  }, [q]);
  return <div>
    {books.map((book) =>
        <BookItem key={book.id}{...book}/>)}
  </div>
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}