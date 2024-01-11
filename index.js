const Discord = require('discord.js-selfbot-v13');
const keep_alive = require('./keep_alive.js')
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to V𝕀ꋊΛꌦ#1010
  const date = new Date();
  const options = {
    timeZone: 'Asia/Jakarta', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1140523912489353267') // make your bot in discord.com/developers and paste the application ID here
    .setType('STREAMING')
    .setURL('https://twitch.tv/discord') //Must be a youtube video link 
    .setState('Grizzly Infinty')
    .setName('Cyolust')
    .setDetails(`Click on Watch Our New Video`) //[${formatTime()}] and this for showing time of stream.
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1041383216902320159/1120472656383311914/20210814_031713.gif?ex=6589fafa&is=657785fa&hm=99364c1f7a5f070539361dd279005744bf44d1533f8749cff04437b402ed663c&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Online 24/7') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/emojis/1123970378541305947.gif?size=96&quality=lossless') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Boost') //Text when you hover the Small image
    .addButton('YouTube', 'https://youtube.com/@cyolust8737?si=SMvDkexe6MQhUVcA')
    .addButton('Instagram', 'https://www.instagram.com/jaluprstyo_/');

  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Cyolust [${formatTime()}]`; //[${newTime}] set this for time 
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
