import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const imageURL = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Pg16Ipw0R27FHcmd8aIVP2CL/user-gIsN0kHGTba9DD7b4h7369ZR/img-8kEz71FAJxcSJOrQ6yyxyG9G.png?st=2022-12-20T18%3A09%3A20Z&se=2022-12-20T20%3A09%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-20T14%3A05%3A06Z&ske=2022-12-21T14%3A05%3A06Z&sks=b&skv=2021-08-06&sig=3GhYtK%2BxtryZApuJfM8yC7OQeyBMggDwiOfOScp4MBY%3D";

export default async function (req, res) {
  const completion = await openai.createImage({
    prompt: generatePrompt(req.body.animal),
    num_images: 3,
    size: "512x512",
  });
  console.log(completion.data);
  res.status(200).json({ result: completion.data.data });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `${capitalizedAnimal} RPG character`;
}
