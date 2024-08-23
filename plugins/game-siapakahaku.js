import fetch from 'node-fetch';

const timeout = 100000;
const poin = 500;

const handler = async (m, { conn, usedPrefix }) => {
  conn.siapakahaku = conn.siapakahaku || {};
  const id = m.chat;
  if (id in conn.siapakahaku) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0]);
    throw false;
  }

  const src = await (await fetch(`https://api.betabotz.eu.org/api/game/siapakahaku?apikey=${lann}`)).json();
  const json = src[Math.floor(Math.random() * src.length)];

  const caption = `
${json.soal}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}maka untuk bantuan
▢ Bonus: ${poin} XP
▢ *Balas/ replay soal ini untuk menjawab*
└──────────────
`.trim();

  conn.siapakahaku[id] = [
    await conn.reply(m.chat, caption, m),
    json,
    poin,
    setTimeout(() => {
      if (conn.siapakahaku[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.siapakahaku[id][0]);
      delete conn.siapakahaku[id];
    }, timeout),
  ];
};

handler.help = ['siapakahaku'];
handler.tags = ['game'];
handler.command = /^siapakahaku/i;
handler.register = false;
handler.group = true;

export default handler;