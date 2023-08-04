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
    messages: buildPrompt( ` ${prompt} .La historia debe ser corta, estrictamente menos de 130 palabras y mantener una estructura narrativa profesional` ),
    max_tokens: 300,
    temperature: 0.8,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  
  // Respond with the stream
  return new StreamingTextResponse(stream)
}

