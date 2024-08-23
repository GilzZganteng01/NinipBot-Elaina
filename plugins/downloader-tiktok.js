import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let message;
    let urlApi;
    let capt;
    if (command === 'tiktok' || command === 'tt') {
        capt = `乂 *T I K T O K*`;
        message = `Masukan URL!`;    
        urlApi = `https://api.betabotz.eu.org/api/download/tiktok?url=${text}&apikey=${lann}`;
    }

    if (!text) {
        throw message;
    }

    try {
        m.reply(wait);      
        const response = await axios.get(urlApi);        
        const res = response.data.result;      
        var { video, title, title_audio, audio } = res;

        capt += `\n\n`;
        capt += `◦ *Title* : ${title}\n`;
        capt += `◦ *Audio Title* : ${title_audio}\n`;
        capt += `\n`;        

        await conn.sendFile(m.chat, video, null, capt, m);
        conn.sendMessage(m.chat, { audio: { url: audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });         
    } catch (e) {
        console.log(e);
        throw `🚩 ${eror}`;
    }
};

handler.command = ['tt','tiktok']
handler.help = ['tiktok <url>'];
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

export default handler;