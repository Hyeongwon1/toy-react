import style from './[id].module.css'
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import fetchOneBooks from "@/lib/fetch-one-books";
import {useRouter} from "next/router";
import {inflateRaw} from "node:zlib";

export const getStaticPaths =()=>{
  return{
    paths :[
      {params :{id:"1"}},
      {params :{id:"2"}},
      {params :{id:"3"}}
    ],
    // fallback : false //정적 페이지 설정외에 들어올 경우 대비책 (404)
    // fallback : "blocking" //정적 페이지 설정외에 들어올 경우 대비책 (SSR방식)
    fallback : true //정적 페이지 설정외에 들어올 경우 대비책 (SSR + 데이터가 없는 풀백 상태의 페이지 부터반환 데이터 로드시 변경)

  }
}
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  const book = await fetchOneBooks(Number(id));
  return {
    props: {book},
  }
}

export default function page({book}: InferGetStaticPropsType<typeof getStaticProps>) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  if(router.isFallback) return "로딩중";
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