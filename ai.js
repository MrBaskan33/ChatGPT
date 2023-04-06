require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "API KEY",
});

const openai = new OpenAIApi(configuration);

async function ask(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    echo: true,
    prompt,
    temperature: 0,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const answer = response.data.choices[0].text;
  return answer;
}

 module.exports = {
  ask,
};
