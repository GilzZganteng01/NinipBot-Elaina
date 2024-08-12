import acrcloud from 'acrcloud';

let acr = new acrcloud({
    host: 'identify-ap-southeast-1.acrcloud.com',
    access_key: '6a3e3d8515e9afd413a4c3a2a9952aac',
    access_secret: '4G0RA1rKe8YpGXeWDraApURTiRGB6UGF7VXjJUDE'
});

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';
        
        if (/video|audio/.test(mime)) {
            let buffer = await q.download();
            await m.reply('_In progress, please wait..._');
            
            let { status, metadata } = await acr.identify(buffer);
            if (status.code !== 0) throw status.msg;

            let { title, artists, album, genres, release_date } = metadata.music[0];
            
            let txt = `*• Title:* ${title}${artists ? `\n*• Artists:* ${artists.map(v => v.name).join(', ')}` : ''}`;
            txt += `${album ? `\n*• Album:* ${album.name}` : ''}${genres ? `\n*• Genres:* ${genres.map(v => v.name).join(', ')}` : ''}\n`;
            txt += `*• Release Date:* ${release_date}`;
            
            conn.reply(m.chat, txt.trim(), m);
        } else {
            throw `Reply audio/video with command ${usedPrefix + command}`;
        }
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Gagal mendeteksi lagu', m);
    }
};

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = /^(whatmusic|whatsmusic|musikapa|whatmusik|detectmusic|deteksimusik|detectmusik)$/i;

export default handler;
