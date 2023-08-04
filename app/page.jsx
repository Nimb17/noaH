
'use client'

import { useCompletion } from 'ai/react';
import Logo from "./components/Logo"
import Brain from "./components/BrainAnimation"
import InputSection from "./components/InputSection" 
/* import { POST } from './api/completion/route'; */

function Completion() { 

  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
   api: '/api/completion'
 })

 
  return (
    <div className='wrap'>
      <div className='backCircle1'>        
      </div>
      <div className='content'>
        <div className='content__header'>
          <Logo loading={isLoading}/>          
        <p className='content__title'><span>Crea relatos cortos.</span>Por ejemplo: “Una historia de terror al estilo de Edgar Allan Poe.”</p>
        </div>

        {completion ?

         <div className='content__completion'> {completion} </div> :

         <div className='content__bodyBrain'>
          <Brain />
        </div>}

        

        <div className="content__btnsWrap">
          Estilos sugeridos:
           <button className="content__btns">Cuento</button>
           <button className="content__btns">Poema</button>
           <button className="content__btns">Fábula</button>
           </div>

        <div className='content__input'>
        <InputSection
           onSubmit={handleSubmit}
           handleInputChange={handleInputChange}
           input={input}
           completion={isLoading}
           />           
        </div>

        
        
      </div>


    </div>
  )
}







export default Completion