exports.run = {
   usage: ['botinfo'],
   async: async (m, {
      client
   }) => {
      client.reply(m.chat, info(), m)
   },
   error: false,
   cache: true,
   location: __filename
}

let info = () => {
   return `The purpose of making this bot is as a learning material and is always online 24 hours (maybe), all the features in this bot are 95% scraping.
`
}
