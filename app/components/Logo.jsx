import style from "./Logo.module.css"

const Logo = ({loading}) => {
  return (
    <button className={!loading ? `${style.button}`: `${style.button} ${style.buttons}`}>
    <span className={style.actualText}>&nbsp;noaH&nbsp;</span>
    <span className={ !loading ? `${style.hoverText}`: `${style.hoverText} ${style.buttons} `} aria-hidden="true">&nbsp;noaH&nbsp;</span>
</button>
  )
}

export default Logo