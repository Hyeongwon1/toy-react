import style from './[id].module.css'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchOneBooks from "@/lib/fetch-one-books";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;

  const book = await fetchOneBooks(Number(id));
  return {
    props: {book},
  }
}

export default function page({book}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) return "문제발생"

  const {
    id, title, subTitle, description, author, publisher, coverImgUrl,
  } = book;

  return <div className={style.container}>
    <div className={style.cover_img_container} style={{backgroundImage: `url('${coverImgUrl}')`}}>
      <img src={coverImgUrl}/>
    </div>
    <div className={style.title}>{title}</div>
    <div className={style.subTitle}>{subTitle}</div>
    <div className={style.author}>
      <div>{author} | {publisher}</div>
    </div>
    <div className={style.description}>{description}</div>
  </div>
}