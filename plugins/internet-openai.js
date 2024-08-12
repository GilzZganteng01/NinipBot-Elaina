import fetch from 'node-fetch';

const handler = async (m, {
  text, 
  usedPrefix, 
  command
}) => {
  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `
  try {
    await m.reply(wait)
    const api = await fetch(`https://api.betabotz.eu.org/api/search/bard-ai?apikey=${lann}&text=${text}`)
    const res = await api.json()
    await m.reply(res.message)
  } catch (err) {
    console.error(err)
    throw "Terjadi kesalahan dalam menjawab pertanyaan"
  }
}

handler.help = ['ai','openai','gpt'];
handler.tags = ["ai"];
handler.command = /^(openai|ai|gpt)$/i

export default handler;