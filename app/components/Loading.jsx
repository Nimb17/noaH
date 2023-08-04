import style from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={style.loader}>
  <div className={style.loader__circle}></div>
  <div className={style.loader__circle}></div>
  <div className={style.loader__circle}></div>
  <div className={style.loader__circle}></div>
  <div className={style.loader__circle}></div>
</div>
  )
}

export default Loading