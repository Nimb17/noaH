"use client"
import style from "./InputSection.module.css"
import Loading from "./Loading"

const InputSection = ({onSubmit, handleInputChange, input,completion}) => {
    return (
        <form className={style.contentForm} onSubmit={onSubmit}>
                     
            <input type="text" value={input} className={style.input} onChange={handleInputChange} />
            {!completion ?  <button className={style.button}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.0246 0.975676C18.8196 0.77219 18.5626 0.62914 18.2816 0.562248C18.0007 0.495356 17.7067 0.507211 17.4321 0.596509L1.58292 5.88318C1.28898 5.97632 1.02923 6.15447 0.836489 6.39515C0.643744 6.63583 0.526646 6.92823 0.499984 7.23541C0.473323 7.5426 0.538293 7.8508 0.686691 8.12109C0.835088 8.39137 1.06026 8.61162 1.33375 8.75401L7.90959 12.004L11.1596 18.6015C11.2902 18.8598 11.4901 19.0766 11.7369 19.2277C11.9837 19.3788 12.2677 19.4584 12.5571 19.4573H12.6654C12.9754 19.4345 13.2713 19.319 13.5147 19.1258C13.7581 18.9326 13.9378 18.6707 14.0304 18.374L19.3929 2.56818C19.4887 2.2951 19.5049 2.00045 19.4397 1.71851C19.3745 1.43658 19.2305 1.17897 19.0246 0.975676ZM2.25459 7.37818L16.0888 2.76318L8.40792 10.444L2.25459 7.37818ZM12.6329 17.7457L9.55625 11.5923L17.2371 3.91151L12.6329 17.7457Z" fill="#EFDEE2" />
            </svg> </button> : <Loading/>}   
           
        </form>
    )
}

export default InputSection