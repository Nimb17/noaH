
'use client'

import { useState } from 'react';
import { useCompletion } from 'ai/react';
import Logo from "./components/Logo"
import Brain from "./components/BrainAnimation"
import InputSection from "./components/InputSection" 
/* import { POST } from './api/completion/route'; */

function Completion() { 
  const [storyParts, setStoryParts] = useState([]);

  const { completion, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading, setInput } = useCompletion({
    api: '/api/completion',
    onFinish: (prompt, completion) => {
      setStoryParts(prevParts => [...prevParts, completion]);
      setInput(''); // Clear input for the next segment
    }
  });

  const handleNewStory = () => {
    setStoryParts([]);
    setInput(''); // Clear the input field
  };

  const handleStyleButtonClick = (style) => {
    const currentInput = input; // Get current value from useCompletion's input state
    const newInput = currentInput ? `${currentInput}, estilo ${style}` : `estilo ${style}`;
    setInput(newInput); // Update the input field state
  };

  const handleStorySubmit = async (e) => {
    // e.preventDefault(); // originalHandleSubmit likely handles this. If not, uncomment.
    
    const currentInput = input; // Get current text from input field
    let promptForApi = currentInput;

    if (storyParts.length > 0) {
      const previousContext = storyParts.join('\n\n');
      promptForApi = `${previousContext}\n\n---\n\nUser continuation: ${currentInput}`;
    }
    
    // Set the input for useCompletion to the combined prompt
    setInput(promptForApi); 
    
    // Call original handleSubmit.
    // We need to ensure that originalHandleSubmit is called *after* setInput has updated the state.
    // However, setInput is async. A common pattern is to pass the value directly if the hook allows,
    // or rely on the next render cycle. For useCompletion, it uses its internal `input` state.
    // A slight delay or calling originalHandleSubmit in a useEffect that depends on `input` might be more robust
    // if direct submission after setInput isn't reliable.
    // For now, we'll call it directly, assuming it picks up the latest `input` value set by `setInput`.
    // If `originalHandleSubmit` could take the prompt directly, that would be `originalHandleSubmit({ body: { prompt: promptForApi } })`
    // but it typically relies on its internal `input` state.
    // Let's try calling it without arguments first, as it usually submits the current `input`.
    // If it needs the event, we'll pass `e`. The examples for `useCompletion` show `handleSubmit(e)`.
    
    // Hacky way to wait for state update, not recommended for production
    // await new Promise(resolve => setTimeout(resolve, 0)); 
    // The above line is generally not a good practice.
    // The `useCompletion` hook's `handleSubmit` is designed to use the `input` state.
    // When we call `setInput(promptForApi)`, the `input` state is updated.
    // Then, `originalHandleSubmit(e)` should use this updated `input`.

    // The crucial part is that originalHandleSubmit will use the `input` state that `useCompletion` manages.
    // By calling `setInput(promptForApi)` right before, we are updating that state.
    // Then `originalHandleSubmit(e)` (or just `originalHandleSubmit()` if it doesn't need `e` explicitly for submission logic beyond preventDefault)
    // will pick up this new `input`.
    originalHandleSubmit(e); // Pass the event object
  };
 
  return (
    <div className='wrap'>
      <div className='backCircle1'>        
      </div>
      <div className='content'>
        <div className='content__header'>
          <Logo loading={isLoading}/>          
        <p className='content__title'><span>Crea relatos cortos.</span>Por ejemplo: “Una historia de terror al estilo de Edgar Allan Poe.”</p>
        </div>

        <div className="story-parts-container">
          {storyParts.map((part, index) => (
            <div key={index} className="story-part">
              {part}
            </div>
          ))}
        </div>

        {completion && !isLoading ? // Display completion only if not loading and completion exists
         <div className='content__completion'> {completion} </div> :
         null // No specific placeholder for completion when loading, handled by Brain
        }

        {isLoading && storyParts.length === 0 && ( // Show Brain only when loading AND it's a new story
            <div className='content__bodyBrain'>
              <Brain />
            </div>
          )}


        <div className="content__btnsWrap">
          Estilos sugeridos:
           <button className="content__btns" onClick={() => handleStyleButtonClick("Cuento")}>Cuento</button>
           <button className="content__btns" onClick={() => handleStyleButtonClick("Poema")}>Poema</button>
           <button className="content__btns" onClick={() => handleStyleButtonClick("Fábula")}>Fábula</button>
           <button className="new-story-button" onClick={handleNewStory}>Start New Story</button>
           </div>

        <div className='content__input'>
        <InputSection
           onSubmit={handleStorySubmit} // Use the new wrapper function
           handleInputChange={handleInputChange}
           input={input} // Still pass original input for display in InputSection
           completion={isLoading}
           />           
        </div>
        
      </div>
    </div>
  )
}







export default Completion