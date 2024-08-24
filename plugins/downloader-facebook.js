import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Masukan URL!`;
  try {
    m.reply('*Please wait..*');
    const url = args[0];
    const get = await fetch(`https://api.betabotz.eu.org/api/download/fbdown?url=${url}&apikey=${lann}`);
    const js = await get.json();
    conn.sendFile(m.chat, js.result[1]._url, 'fb.mp4', '', m);
  } catch (e) {
    console.log(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
    }
  }
};

handler.help = ["fbdown *[link]*"];
handler.tags = ["downloader"];
handler.command = /^(fb|facebook|fbdl|facebookdl)$/i;
handler.limit = true;
handler.group = true;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

export default handler;