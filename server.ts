// const url = "https://utfs.io/f/9277dc6b-914d-46ba-a9bf-91c43aa6870f-2487m.srt";
import { Application, Router } from "https://deno.land/x/oak@v16.0.0/mod.ts"
import { ANIME_SERIES, MOVIE, SERIES } from "./lib/constants.ts";
import { Subtitle } from "./Subtitle.ts";
import { MetaData } from "./Metadata.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const router = new Router();



router.post("/", async (context) => {

    context.response.status = 400
    const reqBody = await context.request.body.json();
    // ? URL, Name, Type, Translator, Technique, Series Info

    const notValid = !reqBody.name || !reqBody.translator || !reqBody.technique || !reqBody.type || !reqBody.corner
    const notValidType = reqBody.type !== SERIES && reqBody.type !== ANIME_SERIES && reqBody.type !== MOVIE

    if (notValid) return context.response.body = { status: "error", message: "Validation Error, Please fill all fields" }
    if (reqBody.type === SERIES && !reqBody.seriesInfo) return context.response.body = { status: "error", message: "There is no series info" }
    if (notValidType) return context.response.body = { status: "error", message: "not valid type" }

    const response = await fetch(reqBody.url);
    if (!response.ok) return context.response.body = { status: "error", message: "URL file not found, please try again" };



    const text = await response.text();

    //* Create Subtitle Object
    const sub = new Subtitle(text)

    //* Then generate metadata according to the subtitle and names... 
    const { endingLines, starterLines, header, movedLogos } = new MetaData(sub, reqBody.name, reqBody.corner, reqBody.translator, reqBody.technique, reqBody.type, reqBody.seriesInfo || null)

    //* Combine all generated things together
    const all = header + starterLines + sub.assBody + endingLines + movedLogos


    context.response.status = 200
    context.response.body = all
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({ port: 8000 });
