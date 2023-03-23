const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
console.log({ OPENAI_API_KEY }, import.meta.env);
export async function createEvent(prompt: string) {
  const apiURL = `https://api.openai.com/v1/chat/completions`;
  const system = `Process the prompt and respond with JSON
    Respond only if the prompt is an event
    The JSON structure should be:
    {title,description,start,end,attendees}
    The date now is ${new Date().toISOString()}
    `;
  return fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  })
    .then((response) => response.json())
    .catch((err) => {
      err;
    });
}
