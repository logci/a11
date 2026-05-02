const { gmd, commands, monospace, formatBytes } = require("../gift"),
  axios = require("axios"),
  BOT_START_TIME = Date.now(),
  { totalmem: totalMemoryBytes, freemem: freeMemoryBytes } = require("os"),
  moment = require("moment-timezone"),
  more = String.fromCharCode(8206),
  readmore = more.repeat(4001),
  ram = `${formatBytes(freeMemoryBytes)}/${formatBytes(totalMemoryBytes)}`;
const { sendButtons } = require("gifted-btns");

const { generateWAMessage } = require("gifted-baileys");


gmd(
  {
    pattern: "intro",
    fromMe: true,
    react: "🦋",
    description: "Shows My Intro",
    category: "general",
  },
  async (from, Gifted, conText) => {
    const { mek, gmdBuffer, pushName, botName } = conText;
    const image = "https://i.ibb.co/5Xjj5sxz/tourl-1777040577237.jpg";
    const logo = "https://i.ibb.co/5Xjj5sxz/tourl-1777040577237.jpg";

    try {
      const thumb = await gmdBuffer(image);
      const thumbnail = await gmdBuffer(logo);
      const number = Gifted?.user?.id || "0@s.whatsapp.net";

      const generatedMessage = await generateWAMessage(
        from,
        {
          text: `0ཻུ۪۪ꦽꦼ̷⸙‹•══════════════♡᭄
│       *「 𝗠𝗬 𝗜𝗡𝗧𝗥𝗢 」*
│ *Name      :* AS
│ *Place       :* china 🇨🇳
│ *Gender   :* 1x
│ *Age          :* 1x
│ *Phone     :* @
│ *IG ID        :* none
│ *Protfolio   :* NONE
│ *Status     :* married
╰═════ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙`,
        },
        { quoted: mek.quoted || mek },
      );

      const options = {
        contextInfo: {
          forwardingScore: 999,
          isForwarded: false,
        },
        linkPreview: {
          renderLargerThumbnail: true,
          showAdAttribution: true,
          title: "𝞓",
          body: "ᴄʟɪᴄᴋ ʜᴇʀᴇ 🦋 !!",
          mediaType: 1,
          thumbnail: thumb,
          sourceUrl: "http://wa.me/?text=_៚ʜᴇʟʟᴏ+🪄_",
        },
        quoted: {
          key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
          },
          message: {
            contactMessage: {
              displayName: `${pushName || botName || "User"}`,
              vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${botName || "Bot"},;;;\nFN:${botName || "Bot"},\nitem1.TEL;waid=${number.split("@")[0]}:${number.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
              jpegThumbnail: thumbnail,
            },
          },
        },
      };

      generatedMessage.message.extendedTextMessage.contextInfo = {
        ...(generatedMessage.message.extendedTextMessage.contextInfo || {}),
        ...(options.contextInfo || {}),
      };

      await Gifted.relayMessage(from, generatedMessage.message, {
        messageId: generatedMessage.key.id,
      });
    } catch (error) {
      return Gifted.sendMessage(from, { text: `Intro failed: ${error.message}` }, { quoted: mek });
    }
  },
);


const getVisibleCommands = () =>
  commands.filter(
    (command) => command.pattern && !command.dontAddCommandList && !command.on,
  );

const getCategoryCommands = (categoryName) =>
  getVisibleCommands().filter(
    (command) =>
      (command.category || "other").toLowerCase() === categoryName.toLowerCase(),
  );

const formatCommandList = (commandList, botPrefix) =>
  commandList.map((command) => `│ ◇ ${botPrefix}${command.pattern}`).join("\n");

[
  "cinesubz",
  "mvda",
  "isaidta",
  "baiscopes",
  "sinhalasub",
].forEach((commandName) => {
  gmd(
    {
      pattern: commandName,
      react: "🌙",
      category: "general",
      description: `Upcoming update for ${commandName}`,
    },
    async (_from, _Gifted, conText) => {
      const { reply } = conText;

      return reply(`.${commandName} is coming soong! ♥️\n\nFollow for more updates: \nhttps://whatsapp.com/channel/0029VbBuHjx2ER6cVsDRlR14\n\n╰─━─ • 🌙 • ─━─╯`);
    },
  );
});

gmd(
  {
    pattern: "prank",
    react: "🪄",
    category: "general",
    description: "Run a fake hacking sequence for fun",
  },
  async (from, Gifted, conText) => {
    const { mek, react } = conText;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await Gifted.sendMessage(
      from,
      {
        text: "💻 Initializing hack sequence...",
      },
      { quoted: mek },
    );
    await wait(1500);

    await Gifted.sendMessage(
      from,
      {
        text: "🔌 Establishing secure connection to the server...",
      },
      { quoted: mek },
    );
    await wait(1500);

    await Gifted.sendMessage(
      from,
      {
        text: "🛡 Bypassing firewalls and security protocols...\nBypassing firewalls: [█████░░░░░░░░░░░░░░░]\nBypassing firewalls: [██████████░░░░░░░░░░]\nBypassing firewalls: [███████████████░░░░░]\nBypassing firewalls: [████████████████████]",
      },
      { quoted: mek },
    );
    await wait(2000);

    await Gifted.sendMessage(
      from,
      {
        text: "🔐 Gaining access to encrypted database...",
      },
      { quoted: mek },
    );
    await wait(2000);

    await Gifted.sendMessage(
      from,
      {
        text: "🔑 Cracking encryption keys...\nCracking encryption: [███░░░░░░░░░░░░░░░░░]\nCracking encryption: [██████░░░░░░░░░░░░░░]\nCracking encryption: [█████████░░░░░░░░░░░]\nCracking encryption: [████████████░░░░░░░░]\nCracking encryption: [████████████████░░░░]\nCracking encryption: [████████████████████]",
      },
      { quoted: mek },
    );
    await wait(2000);

    await Gifted.sendMessage(
      from,
      {
        text: "📥 Downloading sensitive data from server...\nDownloading files: [████░░░░░░░░░░░░░░░░]\nDownloading files: [████████░░░░░░░░░░░░]\nDownloading files: [████████████░░░░░░░░]\nDownloading files: [████████████████░░░░]\nDownloading files: [████████████████████]",
      },
      { quoted: mek },
    );
    await wait(2500);

    await Gifted.sendMessage(
      from,
      {
        text: "🔒 Planting a backdoor for future access...",
      },
      { quoted: mek },
    );
    await wait(1000);

    await Gifted.sendMessage(
      from,
      {
        text: '💥 Hack complete! 🎯 Target "target" successfully compromised.',
      },
      { quoted: mek },
    );
    await wait(1000);

    await Gifted.sendMessage(
      from,
      {
        text: "🤖 Mission accomplished. Logging off...",
      },
      { quoted: mek },
    );
    await wait(2000);

    await Gifted.sendMessage(
      from,
      {
        text: "*HACKED BY AASHIF-MD 🪄*",
      },
      { quoted: mek },
    );

    await react("✅");
  },
);

gmd(
  {
    pattern: "ping",
    aliases: ["pi", "p"],
    react: "⚡",
    category: "general",
    description: "Check bot response speed",
  },
  async (from, Gifted, conText) => {
    const {
      mek,
      react,
      newsletterJid,
      newsletterUrl,
      botFooter,
      botName,
      botPrefix,
    } = conText;
    const startTime = process.hrtime();

    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(80 + Math.random() * 420)),
    );

    const elapsed = process.hrtime(startTime);
    const responseTime = Math.floor(elapsed[0] * 1000 + elapsed[1] / 1000000);

    await sendButtons(Gifted, from, {
      title: "Bot Speed",
      text: `⚡ Pong: ${responseTime}ms`,
      footer: `> *${botFooter}*`,
      buttons: [
        { id: `${botPrefix}uptime`, text: "⏱️ Uptime of 𝗔𝗔𝗦𝗛𝗜𝗙-𝗠𝗗" },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "WaChannel",
            url: newsletterUrl,
          }),
        },
      ],
    });

    /*await Gifted.sendMessage(from, {
      text: 
      contextInfo: {
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: newsletterJid,
          newsletterName: botName,
          serverMessageId: 143
        }
      }
    }, { quoted: mek });*/
    await react("✅");
  },
);

gmd(
  {
    pattern: "report",
    aliases: ["request"],
    react: "💫",
    description: "Request New Features.",
    category: "owner",
  },
  async (from, Gifted, conText) => {
    const { mek, q, sender, react, pushName, botPrefix, isSuperUser, reply } =
      conText;
    const reportedMessages = {};
    const devlopernumber = "254799916673";
    try {
      if (!isSuperUser) return reply("*Owner Only Command*");
      if (!q)
        return reply(
          `Example: ${botPrefix}request hi dev downloader commands are not working`,
        );
      const messageId = mek.key.id;
      if (reportedMessages[messageId]) {
        return reply(
          "This report has already been forwarded to the owner. Please wait for a response.",
        );
      }
      reportedMessages[messageId] = true;
      const textt = `*| REQUEST/REPORT |*`;
      const teks1 = `\n\n*User*: @${sender.split("@")[0]}\n*Request:* ${q}`;
      Gifted.sendMessage(
        devlopernumber + "@s.whatsapp.net",
        {
          text: textt + teks1,
          mentions: [sender],
        },
        {
          quoted: mek,
        },
      );
      reply(
        "Tʜᴀɴᴋ ʏᴏᴜ ꜰᴏʀ ʏᴏᴜʀ ʀᴇᴘᴏʀᴛ. Iᴛ ʜᴀs ʙᴇᴇɴ ꜰᴏʀᴡᴀʀᴅᴇᴅ ᴛᴏ ᴛʜᴇ ᴏᴡɴᴇʀ. Pʟᴇᴀsᴇ ᴡᴀɪᴛ ꜰᴏʀ ᴀ ʀᴇsᴘᴏɴsᴇ.",
      );
      await react("✅");
    } catch (e) {
      reply(e);
      console.log(e);
    }
  },
);

gmd(
  {
    pattern: "menus",
    aliases: ["mainmenu", "mainmens"],
    description: "Display Bot's Uptime, Date, Time, and Other Stats",
    react: "📜",
    category: "general",
  },
  async (from, Gifted, conText) => {
    const {
      mek,
      sender,
      react,
      pushName,
      botPic,
      botMode,
      botVersion,
      botName,
      botFooter,
      timeZone,
      botPrefix,
      newsletterJid,
      reply,
      ownerNumber,
    } = conText;
    try {
      function formatUptime(seconds) {
        const days = Math.floor(seconds / (24 * 60 * 60));
        seconds %= 24 * 60 * 60;
        const hours = Math.floor(seconds / (60 * 60));
        seconds %= 60 * 60;
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      const now = new Date();
      const date = new Intl.DateTimeFormat("en-GB", {
        timeZone: timeZone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(now);

      const time = new Intl.DateTimeFormat("en-GB", {
        timeZone: timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      const uptime = formatUptime(process.uptime());
      const totalCommands = commands.filter(
        (command) => command.pattern && !command.dontAddCommandList,
      ).length;
      const generalCommands = getCategoryCommands("general");
      const quickAccess = generalCommands
        .slice(0, 10)
        .map((command) => `   🏮   ${command.pattern}`)
        .join("\n");

      let menus = `
*🦄 Uᴘᴛɪᴍᴇ :* ${monospace(uptime)}
*🍁 Dᴀᴛᴇ Tᴏᴅᴀʏ:* ${monospace(date)}
*🎗 Tɪᴍᴇ Nᴏᴡ:* ${monospace(time)}

➮Fᴏᴜɴᴅᴇʀ - AASHIF SER ♥️
➮Usᴇʀ - ${monospace(pushName)}
➮Nᴜᴍ - ${monospace("+94768655794")}
➮Mᴇᴍᴏʀʏ - ${monospace(ram)}

*🧑‍💻 :*  𝐀𝐀𝐒𝐇𝐈𝐅 𝐒𝐄𝐑 ♥️ Iꜱ Aᴠᴀɪʟᴀʙʟᴇ
╭─━─━─━─ • ✧ • ─━─━─━─╮
      🌠 ＡＬＬ ＭＥＮＵ
╰─━─━─━─ • ✧ • ─━─━─━─╯

${quickAccess || "   🏮   menu\n   🏮   list\n   🏮   ping"}

╰─━─ • 🌙 • ─━─╯`;

      const giftedMess = {
        text: menus.trim(),
        contextInfo: {
          mentionedJid: [sender],
        },
      };

      await Gifted.sendMessage(from, giftedMess, { quoted: mek });
      await react("✅");
    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  },
);

gmd(
  {
    pattern: "list",
    aliases: ["listmenu", "listmen"],
    description: "Show All Commands and their Usage",
    react: "📜",
    category: "general",
  },
  async (from, Gifted, conText) => {
    const {
      mek,
      sender,
      react,
      pushName,
      botPic,
      botMode,
      botVersion,
      botName,
      botFooter,
      timeZone,
      botPrefix,
      newsletterJid,
      reply,
    } = conText;
    try {
      function formatUptime(seconds) {
        const days = Math.floor(seconds / (24 * 60 * 60));
        seconds %= 24 * 60 * 60;
        const hours = Math.floor(seconds / (60 * 60));
        seconds %= 60 * 60;
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      const now = new Date();
      const date = new Intl.DateTimeFormat("en-GB", {
        timeZone: timeZone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(now);

      const time = new Intl.DateTimeFormat("en-GB", {
        timeZone: timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      const uptime = formatUptime(process.uptime());
      const totalCommands = commands.filter(
        (command) => command.pattern && !command.dontAddCommandList,
      ).length;

      let list = `
╭━━〔 *${monospace(botName)}* 〕━━╮
│ ✦ *Mᴏᴅᴇ* : ${monospace(botMode)}
│ ✦ *Pʀᴇғɪx* : [ ${monospace(botPrefix)} ]
│ ✦ *Usᴇʀ* : ${monospace(pushName)}
│ ✦ *Pʟᴜɢɪɴs* : ${monospace(totalCommands.toString())}
│ ✦ *Vᴇʀsɪᴏɴ* : ${monospace(botVersion)}
│ ✦ *Uᴘᴛɪᴍᴇ* : ${monospace(uptime)}
│ ✦ *Tɪᴍᴇ Nᴏᴡ* : ${monospace(time)}
│ ✦ *Dᴀᴛᴇ Tᴏᴅᴀʏ* : ${monospace(date)}
│ ✦ *Tɪᴍᴇ Zᴏɴᴇ* : ${monospace(timeZone)}
│ ✦ *Sᴇʀᴠᴇʀ Rᴀᴍ* : ${monospace(ram)}
╰─────────────╯${readmore}\n`;

      commands.forEach((gmd, index) => {
        if (gmd.pattern && gmd.description) {
          list += `*${index + 1} ${monospace(gmd.pattern)}*\n  ${gmd.description}\n`;
        }
      });

      const giftedMess = {
        image: { url: botPic },
        caption: list.trim(),
        contextInfo: {
          mentionedJid: [sender],
          forwardingScore: 5,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: newsletterJid,
            newsletterName: botName,
            serverMessageId: 0,
          },
        },
      };
      await Gifted.sendMessage(from, giftedMess, { quoted: mek });

      await Gifted.sendMessage(
        from,
        {
          audio: {
            url: "https://www.image2url.com/r2/default/audio/1777373430857-76f68d99-4445-4571-ae03-ff65dd0f6e4c.opus",
          },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek },
      );

      await react("👋");
    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  },
);

gmd(
  {
    pattern: "menu",
    aliases: ["help", "men", "allmenu", "as"],
    react: "🪀",
    category: "general",
    description: "Fetch bot main menu",
  },
  async (from, Gifted, conText) => {
    const {
      mek,
      sender,
      react,
      pushName,
      botPic,
      botMode,
      botVersion,
      botName,
      botFooter,
      timeZone,
      botPrefix,
      newsletterJid,
      reply,
    } = conText;
    try {
      function formatUptime(seconds) {
        const days = Math.floor(seconds / (24 * 60 * 60));
        seconds %= 24 * 60 * 60;
        const hours = Math.floor(seconds / (60 * 60));
        seconds %= 60 * 60;
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      const now = new Date();
      const date = new Intl.DateTimeFormat("en-GB", {
        timeZone: timeZone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(now);

      const time = new Intl.DateTimeFormat("en-GB", {
        timeZone: timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      const uptime = formatUptime(process.uptime());
      const regularCmds = getVisibleCommands();
      const bodyCmds = commands.filter(
        (c) => c.pattern && c.on === "body" && !c.dontAddCommandList,
      );
      const totalCommands = regularCmds.length + bodyCmds.length;

      const categoryConfig = [
        { key: "ai", title: "𝙰𝙸", icon: "❀" },
        { key: "converter", title: "𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙴𝚁", icon: "🧚‍♀️" },
        { key: "downloader", title: "𝙳𝙾𝚆𝙽𝙻𝙾𝘼𝘿𝙀𝚁", icon: "❀" },
        { key: "game", title: "𝙶𝘼𝙈𝙀", icon: "🎀" },
        { key: "general", title: "𝙶𝙀𝙉𝙀𝚁𝘼𝙇", icon: "❀" },
        { key: "group", title: "𝙂𝙍𝙊𝙐𝙋", icon: "❀" },
        { key: "logo", title: "𝙻𝙊𝙂𝙊", icon: "❀" },
        { key: "notes", title: "𝙽𝙊𝙏𝙀𝚂", icon: "❀" },
        { key: "owner", title: "𝙾𝚆𝙉𝙀𝚁", icon: "❀" },
        { key: "search", title: "𝚂𝙀𝘼𝙍𝘾𝙃", icon: "❀" },
        { key: "sports", title: "𝚂𝙿𝙾𝚁𝚃𝚂", icon: "❀" },
        { key: "tempmail", title: "𝚃𝙀𝙈𝙋𝙈𝘼𝙄𝙇", icon: "❀" },
        { key: "tools", title: "𝚃𝙾𝙾𝙻𝚂", icon: "❀" },
        { key: "uploader", title: "𝚄𝙋𝙇𝙊𝘼𝘿𝙀𝚁", icon: "❀" },
        { key: "utility", title: "𝚄𝚃𝙄𝙇𝙄𝚃𝚈", icon: "❀" },
        { key: "religion", title: "𝚁𝙴𝙻𝙸𝙂𝙸𝙾𝚄𝚂 𝙱𝙾𝙾𝙺𝚂", icon: "❀" },
      ];

      const categorySections = categoryConfig
        .map(({ key, title, icon }) => {
          const items = getCategoryCommands(key);
          if (!items.length) return null;

          return `╭━━━✦❀ ${title} ${icon} ❀✦━━━╮
${formatCommandList(items, botPrefix)}
╰━━━━━━━━━━━━━━━╯`;
        })
        .filter(Boolean)
        .join("\n\n");

      const menu = `╭─━━━✧ ❀🌸❀ ✧━━━─╮
     🌷 𝗔𝗔𝗦𝗛𝗜𝗙-𝗠𝗗 🌷
╰─━━━✧ ❀🌸❀ ✧━━━─╯

❀ *Mode:* ${monospace(botMode)}
❀ *Prefix:* ${monospace(botPrefix)}
❀ *User:* ${monospace(pushName)}
❀ *Plugins:* ${monospace(totalCommands.toString())}
❀ *Version:* ${monospace(botVersion)}
❀ *Uptime:* ${monospace(uptime)}
❀ *Time Now:* ${monospace(time)}
❀ *Date Today:* ${monospace(date)}
❀ *Timezone:* ${monospace(timeZone)}

💖 𝐁𝐘 𝐀𝐀𝐒𝐇𝐈𝐅 𝐒𝐄𝐑 💖

${categorySections}

✧･ﾟ: *Aashif Xeon* ･ﾟ✧
      💗 Made with love 💗`;

      const giftedMess = {
        image: { url: "https://i.ibb.co/5Xjj5sxz/tourl-1777040577237.jpg" },
        caption: `${menu.trim()}\n\n> *${botFooter}*`,
      };
      await Gifted.sendMessage(from, giftedMess, { quoted: mek });

      await Gifted.sendMessage(
        from,
        {
          audio: {
            url: "https://www.image2url.com/r2/default/audio/1777371472047-7ffb2e9d-598d-4907-97fa-e4bc6a60876a.mp3",
          },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek },
      );

      await react("✅");
    } catch (e) {
      console.error(e);
      reply(`${e}`);
    }
  },
);

gmd(
  {
    pattern: "return",
    aliases: ["details", "det", "ret"],
    react: "⚡",
    category: "owner",
    description:
      "Displays the full raw quoted message using Baileys structure.",
  },
  async (from, Gifted, conText) => {
    const {
      mek,
      reply,
      react,
      quotedMsg,
      isSuperUser,
      botName,
      botFooter,
      newsletterJid,
      newsletterUrl,
    } = conText;

    if (!isSuperUser) {
      return reply(`Owner Only Command!`);
    }

    if (!quotedMsg) {
      return reply(`Please reply to/quote a message`);
    }

    try {
      const jsonString = JSON.stringify(quotedMsg, null, 2);
      const chunks = jsonString.match(/[\s\S]{1,100000}/g) || [];

      for (const chunk of chunks) {
        const formattedMessage = `\`\`\`\n${chunk}\n\`\`\``;

        await sendButtons(Gifted, from, {
          title: "",
          text: formattedMessage,
          footer: `> *${botFooter}*`,
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy",
                copy_code: formattedMessage,
              }),
            },
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "WaChannel",
                url: newsletterUrl,
              }),
            },
          ],
        });

        /* await Gifted.sendMessage(
        from,
        {
          text: formattedMessage,
          contextInfo: {
            forwardingScore: 5,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: newsletterJid,
              newsletterName: botName,
              serverMessageId: 143
            },
          },
        },
        { quoted: mek }
      );*/
        await react("✅");
      }
    } catch (error) {
      console.error("Error processing quoted message:", error);
      await reply(`❌ An error occurred while processing the message.`);
    }
  },
);

gmd(
  {
    pattern: "uptime",
    aliases: ["up"],
    react: "⏳",
    category: "general",
    description: "check bot uptime status.",
  },
  async (from, Gifted, conText) => {
    const {
      mek,
      react,
      newsletterJid,
      newsletterUrl,
      botFooter,
      botName,
      botPrefix,
    } = conText;

    const uptimeMs = Date.now() - BOT_START_TIME;

    const seconds = Math.floor((uptimeMs / 1000) % 60);
    const minutes = Math.floor((uptimeMs / (1000 * 60)) % 60);
    const hours = Math.floor((uptimeMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));

    await sendButtons(Gifted, from, {
      title: "",
      text: `⏱️ Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`,
      footer: `> *${botFooter}*`,
      buttons: [
        { id: `${botPrefix}ping`, text: "⚡ Ping" },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "WaChannel",
            url: newsletterUrl,
          }),
        },
      ],
    });
    await react("✅");
  },
);

gmd(
  {
    pattern: "repo",
    aliases: ["sc", "rep", "script"],
    react: "💜",
    category: "general",
    description: "Fetch bot script.",
  },
  async (from, Gifted, conText) => {
    const {
      mek,
      sender,
      react,
      pushName,
      botPic,
      botName,
      botFooter,
      newsletterUrl,
      ownerName,
      newsletterJid,
      giftedRepo,
    } = conText;

    const response = await axios.get(
      `https://api.github.com/repos/${giftedRepo}`,
    );
    const repoData = response.data;
    const {
      full_name,
      name,
      forks_count,
      stargazers_count,
      created_at,
      updated_at,
      owner,
    } = repoData;
    const messageText = `┃┃𝗔𝗔𝗦𝗛𝗜𝗙-𝗠𝗗 𝐁𝐘 𝐀𝐀𝐒𝐇𝐈𝐅 𝐒𝐄𝐑 ♥️┃┃`;

    const dateNow = Date.now();
    await sendButtons(Gifted, from, {
      title: "",
      text: messageText,
      footer: `> *${botFooter}*`,
      image: { url: botPic },
      buttons: [
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "Copy Link",
            copy_code: `https://github.com/nonxe/a1`,
          }),
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "Visit Repo",
            url: `https://github.com/nonxe/a1}`,
          }),
        },
        {
          id: `repo_dl_${dateNow}`,
          text: "📥 Download Zip",
        },
      ],
    });

    const handleResponse = async (event) => {
      const messageData = event.messages[0];
      if (!messageData?.message) return;

      const templateButtonReply =
        messageData.message?.templateButtonReplyMessage;
      if (!templateButtonReply) return;

      const selectedButtonId = templateButtonReply.selectedId;
      if (!selectedButtonId?.includes(`repo_dl_${dateNow}`)) return;

      const isFromSameChat = messageData.key?.remoteJid === from;
      if (!isFromSameChat) return;

      try {
        const zipUrl = `https://github.com/${giftedRepo}/archive/refs/heads/main.zip`;
        await Gifted.sendMessage(
          from,
          {
            document: { url: zipUrl },
            fileName: `${name}.zip`,
            mimetype: "application/zip",
          },
          { quoted: messageData },
        );
        await react("✅");
      } catch (dlErr) {
        await Gifted.sendMessage(
          from,
          { text: "Failed to download repo zip: " + dlErr.message },
          { quoted: messageData },
        );
      }

      Gifted.ev.off("messages.upsert", handleResponse);
    };

    Gifted.ev.on("messages.upsert", handleResponse);
    setTimeout(() => Gifted.ev.off("messages.upsert", handleResponse), 120000);

    await react("✅");
  },
);

gmd(
  {
    pattern: "save",
    aliases: ["sv", "s", "sav", "."],
    react: "⚡",
    category: "owner",
    description:
      "Save messages (supports images, videos, audio, stickers, and text).",
  },
  async (from, Gifted, conText) => {
    const { mek, reply, react, sender, isSuperUser, getMediaBuffer } = conText;

    if (!isSuperUser) {
      return reply(`❌ Owner Only Command!`);
    }

    const quotedMsg =
      mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quotedMsg) {
      return reply(`⚠️ Please reply to/quote a message.`);
    }

    try {
      let mediaData;

      if (quotedMsg.imageMessage) {
        const buffer = await getMediaBuffer(quotedMsg.imageMessage, "image");
        mediaData = {
          image: buffer,
          caption: quotedMsg.imageMessage.caption || "",
        };
      } else if (quotedMsg.videoMessage) {
        const buffer = await getMediaBuffer(quotedMsg.videoMessage, "video");
        mediaData = {
          video: buffer,
          caption: quotedMsg.videoMessage.caption || "",
        };
      } else if (quotedMsg.audioMessage) {
        const buffer = await getMediaBuffer(quotedMsg.audioMessage, "audio");
        mediaData = {
          audio: buffer,
          mimetype: "audio/mp4",
        };
      } else if (quotedMsg.stickerMessage) {
        const buffer = await getMediaBuffer(
          quotedMsg.stickerMessage,
          "sticker",
        );
        mediaData = {
          sticker: buffer,
        };
      } else if (
        quotedMsg.documentMessage ||
        quotedMsg.documentWithCaptionMessage?.message?.documentMessage
      ) {
        const docMsg =
          quotedMsg.documentMessage ||
          quotedMsg.documentWithCaptionMessage.message.documentMessage;
        const buffer = await getMediaBuffer(docMsg, "document");
        mediaData = {
          document: buffer,
          fileName: docMsg.fileName || "document",
          mimetype: docMsg.mimetype || "application/octet-stream",
        };
      } else if (
        quotedMsg.conversation ||
        quotedMsg.extendedTextMessage?.text
      ) {
        const text = quotedMsg.conversation || quotedMsg.extendedTextMessage.text;
        mediaData = {
          text: text,
        };
      } else if (
        quotedMsg.buttonsMessage ||
        quotedMsg.templateMessage ||
        quotedMsg.interactiveMessage ||
        quotedMsg.listMessage ||
        quotedMsg.buttonsResponseMessage ||
        quotedMsg.templateButtonReplyMessage
      ) {
        let text = "";
        if (quotedMsg.buttonsMessage) {
          text =
            quotedMsg.buttonsMessage.contentText ||
            quotedMsg.buttonsMessage.text ||
            "";
        } else if (quotedMsg.templateMessage?.hydratedTemplate) {
          text =
            quotedMsg.templateMessage.hydratedTemplate
              .hydratedContentText || "";
        } else if (quotedMsg.interactiveMessage?.body?.text) {
          text = quotedMsg.interactiveMessage.body.text;
        } else if (quotedMsg.listMessage) {
          text = quotedMsg.listMessage.description || quotedMsg.listMessage.title || "";
        } else if (quotedMsg.buttonsResponseMessage) {
          text = quotedMsg.buttonsResponseMessage.selectedDisplayText || "";
        } else if (quotedMsg.templateButtonReplyMessage) {
          text =
            quotedMsg.templateButtonReplyMessage.selectedDisplayText || "";
        }
        if (!text) {
          return reply(`❌ Could not extract text from the quoted message.`);
        }
        mediaData = {
          text: text,
        };
      } else {
        return reply(`❌ Unsupported message type.`);
      }

      await Gifted.sendMessage(sender, mediaData, { quoted: mek });
      await react("✅");
    } catch (error) {
      console.error("Save Error:", error);
      await reply(`❌ Failed to save the message. Error: ${error.message}`);
    }
  },
);

gmd(
  {
    pattern: "chjid",
    aliases: [
      "channeljid",
      "chinfo",
      "channelinfo",
      "newsletterjid",
      "newsjid",
      "newsletterinfo",
    ],
    react: "📢",
    category: "general",
    description: "Get WhatsApp Channel/Newsletter Info",
  },
  async (from, Gifted, conText) => {
    const {
      q,
      reply,
      react,
      botFooter,
      botPrefix,
      GiftedTechApi,
      GiftedApiKey,
    } = conText;

    const input = q?.trim();
    if (!input) {
      await react("❌");
      return reply(
        `❌ Provide a channel link.\nUsage: *${botPrefix}chjid* https://whatsapp.com/channel/KEY`,
      );
    }

    const channelMatch = input.match(/whatsapp\.com\/channel\/([A-Za-z0-9_-]+)/i);
    if (!channelMatch) {
      await react("❌");
      return reply(
        "❌ Invalid channel link. Provide a valid WhatsApp channel link.\nExample: https://whatsapp.com/channel/ABC123",
      );
    }

    await react("🔍");
    const inviteKey = channelMatch[1];
    const channelUrl = `https://whatsapp.com/channel/${inviteKey}`;

    try {
      const meta = await Gifted.newsletterMetadata("invite", inviteKey);

      if (!meta || !meta.id) {
        await react("❌");
        return reply(
          "❌ Could not fetch channel info. The link may be invalid or the channel no longer exists.",
        );
      }

      const channelJid = meta.id;
      const tm = meta.thread_metadata || {};

      const name = tm.name?.text || "Unknown Channel";
      const rawDesc = tm.description?.text || "";
      const verification = tm.verification || "";
      const isVerified = verification === "VERIFIED";
      const stateType = meta.state?.type || "";
      const isActive = stateType === "ACTIVE";

      const subCount = parseInt(tm.subscribers_count || "0", 10);
      const followers =
        subCount >= 1_000_000
          ? `${(subCount / 1_000_000).toFixed(1)}M`
          : subCount >= 1_000
            ? `${(subCount / 1_000).toFixed(1)}K`
            : subCount > 0
              ? subCount.toLocaleString()
              : "N/A";

      let picUrl = null;
      try {
        const apiUrl = `${GiftedTechApi}/api/stalk/wachannel?apikey=${GiftedApiKey}&url=${encodeURIComponent(channelUrl)}`;
        const apiRes = await axios.get(apiUrl, { timeout: 10000 });
        picUrl = apiRes.data?.result?.img || null;
      } catch (apiErr) {
        console.error("chjid pic error:", apiErr.message);
      }

      const MAX_DESC = 200;
      let descSection = "";
      if (rawDesc) {
        const trimmed = rawDesc.trim();
        if (trimmed.length > MAX_DESC) {
          const visible = trimmed.slice(0, MAX_DESC);
          const hidden = trimmed.slice(MAX_DESC);
          descSection = `\n\n📄 *Description:*\n${visible}${readmore}${hidden}`;
        } else {
          descSection = `\n\n📄 *Description:*\n${trimmed}`;
        }
      }

      const text =
        `📢 *Channel Info*\n\n` +
        `🔖 *Name:* ${name}\n` +
        `🟢 *Status:* ${isActive ? "Active" : stateType || "Unknown"}\n` +
        `${isVerified ? "✅ *Verified:* Yes\n" : "❌ *Verified:* No\n"}` +
        `👥 *Followers:* ${followers}\n` +
        `🆔 *JID:* \`${channelJid}\`` +
        descSection;

      const buttons = [
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "📋 Copy JID",
            copy_code: channelJid,
          }),
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "➕ Follow Channel",
            url: channelUrl,
            merchant_url: channelUrl,
          }),
        },
      ];

      const sendOpts = {
        text,
        footer: botFooter,
        buttons,
      };

      if (picUrl) {
        sendOpts.image = { url: picUrl };
      }

      await sendButtons(Gifted, from, sendOpts);
      await react("✅");
    } catch (error) {
      console.error("chjid error:", error);
      await react("❌");
      await reply(`❌ Error fetching channel info: ${error.message}`);
    }
  },
);
