import style from "./Logo.module.css"

const Logo = () => {
  return (
    <button data-text="Awesome" className={style.button}>
    <span className={style.actualText}>&nbsp;noaH&nbsp;</span>
    <span className={style.hoverText} aria-hidden="true">&nbsp;noaH&nbsp;</span>
</button>
  )
}

export default Logo