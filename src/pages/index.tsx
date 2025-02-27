import style from './index.module.css';
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode, useEffect} from "react";
import BookItem from '@/components/book-item'
import {InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getStaticProps =
    async () => {
  //컴포넌트보다 먼저실행
  // const allBooks = await fetchBooks()
  console.log("index")
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ]);

  return {
    props: {
      allBooks,
      recoBooks
    },
  }
};

export default function Home({
                               allBooks,
                               recoBooks
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(allBooks);
  useEffect(() => {
    console.log(window)
  }, []);
  return (
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
              <BookItem key={book.id}{...book} />))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
              <BookItem key={book.id} {...book}/>
          ))}
        </section>
      </div>
  )
}
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
