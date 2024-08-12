import axios from "axios"
import cheerio from "cheerio"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `*• Example :* ${usedPrefix + command} https://www.capcut.com`;
  m.reply(wait);
  try {
    let res = await capcut(text);
    conn.sendFile(
      m.chat,
      res.video,
      null,
      `*• Thumbnail:* ${res.thumbnail}\n• *Url:* ${text}`,
      m,
    );
  } catch (e) {}
};
handler.help = ["capcut"].map((a) => a + "");
handler.tags = ["downloader"];
handler.command = ["capcut","cc"];
export default handler 

async function capcut(url) {
  const response = await fetch(url);
  const data = await response.text();
  const $ = cheerio.load(data);

  return {
    thumbnail: $("video").attr("poster"),
    video: $("video").attr("src"),
  };
}