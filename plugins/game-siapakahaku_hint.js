const handler = async (m, { conn }) => {
    conn.siapakahaku = conn.siapakahaku || {};
    const id = m.chat;
    if (!(id in conn.siapakahaku)) throw false;
    const json = conn.siapakahaku[id][1];
    const ans = json.jawaban;
    // kalau ini error clue nya ak mau ada tanda (_) nya ganti string dalam function di bawah ini jadi huruf kecil
    const clue = ans.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_');
    m.reply('```' + clue + '```');
  };
  
  handler.command = /^maka/i;
  handler.limit = true;
  
  export default handler;