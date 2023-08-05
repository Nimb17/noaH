// app/api/completion/route.js

import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(apiConfig)

function buildPrompt(prompt) {
  return prompt.split('\n').map((message) => ({
    role: 'user',
    content: message,
  }));
}

export async function POST(req) {
  
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{"role": "system", "content": "Debe ser un relato corto, no más de 150 palabras. Debes detectar y escojer a un escritor para inspirarte en su estilo narrativo. importante no debes revelar al escritor"}, {role: "user", content: ` ${prompt}, historia corta de no mas de 150 palabras y no me hables de autores ni de tus inspiraciones, pero si usa su estilo narrativo `}],
  
    max_tokens: 350,
    temperature: 0.7,
    /* top_p: 1, */
    /* frequency_penalty: 1,
    presence_penalty: 1, */
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  
  // Respond with the stream
  return new StreamingTextResponse(stream)
}

