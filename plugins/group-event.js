import { randomBytes } from 'crypto';
import { generateWAMessageFromContent } from '@adiwajshing/baileys';

export async function handler(m, { text, args, usedPrefix, command }) {
  if (!args[0]) return m.reply(`Enter a list of events, Example: ${usedPrefix + command} Ada Event Ges`);
  let [evtName, evtDesc, evtLocation, evtLink] = text.split(',');
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // tambahkan 1 hari
  tomorrow.setHours(today.getHours()); // atur jam yang sama
  tomorrow.setMinutes(today.getMinutes()); // atur menit yang sama
  tomorrow.setSeconds(today.getSeconds()); // atur detik yang sama

  let msg = generateWAMessageFromContent(m.chat, {
    messageContextInfo: {
      messageSecret: randomBytes(32)
    },
    eventMessage: {
      isCanceled: false,
      name: evtName || 'Tes event',
      description: evtDesc || 'Ada acara nih',
      location: {
        degreesLatitude: 0,
        degreesLongitude: 0,
        name: evtLocation || 'Indonesia'
      },
      joinLink: evtLink || 'https://s.id/',
      startTime: tomorrow
    }
  }, {});

  return conn.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id
  });
}

handler.help = ["eventgc"].map((a) => a + " *[question]*");
handler.tags = ["group"];
handler.command = ["eventgc"];
handler.group = true;

export default handler;