exports.run = {
   usage: ['song'],
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      isOwner
   }) => {
      try {
         if (!text) return client.reply(m.chat, `• ${Func.texted('bold', `Example`)} : ${isPrefix + command} lathi`, m)
         if (!isOwner && text.match(/(bugil|bokep|hentai|sex|desah)/gi)) {
            client.updateBlockStatus(m.sender, 'block')
            let user = global.users
            user[m.sender].banned = true
            let banned = 0
            for (let jid in user) {
               if (user[jid].banned) banned++
            }
            return client.reply(m.chat, `“${text}”\n\nKeyword is not allowed, use this bot for positive things and now your number has been *banned* and *blocked.*\n\nIf you want to *unban* and *unblock* pay me with your money with the price 50K, send me *${isPrefix}owner*`, m)
         }
         client.reply(m.chat, global.status.getdata, m)
         let json = await scrap.play(text)
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let caption = `❏  *Y T - P L A Y*\n\n`
         caption += `	›  *Title* : ${json.title}\n`
         caption += `	›  *Size* : ${json.data.size}\n`
         caption += `	›  *Duration* : ${json.duration}\n`
         caption += `	›  *Bitrate* : ${json.data.quality}\n`
         caption += `	›  *Server* : ${json.server}\n\n`
         caption += global.setting.footer
         let chSize = Func.sizeLimit(json.data.size, global.max_upload)
         if (chSize.oversize) return client.reply(m.chat, `The file size (${json.data.size}) too large the size exceeds the limit, please download it by ur self via this link : ${await (await Func.shorten(json.data.url)).data.url}`, m)
         client.sendFile(m.chat, json.thumbnail, 'image.jpg', caption, m).then(() => {
            client.sendFile(m.chat, json.data.url, json.data.filename, '', m, {
               document: true
            })
         })
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}
