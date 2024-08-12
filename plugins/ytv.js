import { youtube } from 'btch-downloader';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix} ${command} https://www.youtube.com/watch?v=Z28dtg_QmFw`;
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
  try {
    const data = await youtube(text);
    await conn.sendMessage(m.chat, {
      video: { url: data.mp4 },
      mimetype: 'video/mp4'
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

handler.help = handler.command = ['ytshorts', 'shorts', 'short', 'ytmp4', 'ytv'];
handler.tags = ['downloader'];
handler.limit = true;
handler.premium = false;

export default handler;
