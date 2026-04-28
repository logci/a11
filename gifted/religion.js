const { gmd } = require("../gift");
const axios = require("axios");
const { sendButtons } = require("gifted-btns");

const QURAN_API_BASE = "https://api.alquran.cloud/v1";
const DEFAULT_EDITION = "en.sahih";

function getQuranUsage(prefix = ".") {
  return [
    "📖 *Quran Command*",
    "",
    `• \`${prefix}quran 2:255\` → Specific ayah`,
    `• \`${prefix}quran 36\` → Full Surah`,
    `• \`${prefix}quran search mercy\` → Search keyword`,
    `• \`${prefix}quran random\` → Random ayah`,
    `• \`${prefix}quranedition\` → List available editions`,
    "",
    `Default edition: \`${DEFAULT_EDITION}\``,
  ].join("\n");
}

gmd(
  {
    pattern: "bible",
    aliases: ["verse", "bibleverse", "scripture"],
    react: "📖",
    category: "religion",
    description: "Get Bible verses",
  },
  async (from, Gifted, conText) => {
    const { reply, react, q, botFooter, botName, GiftedTechApi, GiftedApiKey } =
      conText;

    const verse = q?.trim();
    if (!verse) {
      await react("❌");
      return reply(
        "Please provide a Bible verse reference\n\nUsage:\n.bible John 3:16\n.bible John 3:16-20\n.bible John 3",
      );
    }

    await react("⏳");

    try {
      const res = await axios.get(`${GiftedTechApi}/api/search/bible`, {
        params: { apikey: GiftedApiKey, verse: verse },
      });

      if (!res.data?.success || !res.data?.result) {
        await react("❌");
        return reply(
          "Failed to fetch Bible verse. Please check the reference format.",
        );
      }

      const r = res.data.result;

      let txt = `*${botName} BIBLE*\n\n`;
      txt += `📖 *Verse:* ${r.verse || verse}\n`;
      txt += `📊 *Verse Count:* ${r.versesCount || 1}\n\n`;
      txt += `*English:*\n${r.data?.trim() || "N/A"}\n\n`;

      if (r.translations) {
        if (r.translations.swahili) {
          txt += `*Swahili:*\n${r.translations.swahili}\n\n`;
        }
        if (r.translations.hindi) {
          txt += `*Hindi:*\n${r.translations.hindi}\n\n`;
        }
      }

      const copyContent = r.data?.trim() || "";

      await sendButtons(Gifted, from, {
        title: "",
        text: txt,
        footer: botFooter,
        buttons: [
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📋 Copy Verse",
              copy_code: copyContent,
            }),
          },
        ],
      });

      await react("✅");
    } catch (e) {
      console.error("Bible verse error:", e);
      await react("❌");
      return reply("Failed to fetch Bible verse: " + e.message);
    }
  },
);

gmd(
  {
    pattern: "quran",
    aliases: ["qur", "ayah", "surah"],
    react: "🕋",
    category: "religion",
    description: "Read Quran ayah, surah, search and random",
  },
  async (from, Gifted, conText) => {
    const { q, reply, react, botPrefix } = conText;
    const text = q?.trim();

    if (!text) {
      return reply(getQuranUsage(botPrefix));
    }

    const args = text.split(/\s+/);
    const firstArg = args[0].toLowerCase();

    try {
      await react("⏳");

      if (firstArg.includes(":")) {
        const [surahRaw, ayahRaw] = firstArg.split(":");
        const surah = Number(surahRaw);
        const ayah = Number(ayahRaw);

        if (!surah || !ayah) {
          await react("❌");
          return reply(getQuranUsage(botPrefix));
        }

        const { data } = await axios.get(
          `${QURAN_API_BASE}/ayah/${surah}:${ayah}/${DEFAULT_EDITION}`,
        );

        if (data.code !== 200 || !data.data) {
          await react("❌");
          return reply("❌ Invalid Surah or Ayah.");
        }

        const a = data.data;
        const message = [
          `*${a.surah.englishName}* (${a.surah.number}:${a.numberInSurah})`,
          "",
          a.text,
          "",
          `— ${a.edition.name}`,
        ].join("\n");

        await reply(message);
        await react("✅");
        return;
      }

      if (!Number.isNaN(Number(firstArg))) {
        const surahNum = Number(firstArg);
        if (surahNum < 1 || surahNum > 114) {
          await react("❌");
          return reply("❌ Surah number must be between 1 and 114.");
        }

        const { data } = await axios.get(
          `${QURAN_API_BASE}/surah/${surahNum}/${DEFAULT_EDITION}`,
        );

        if (data.code !== 200 || !data.data) {
          await react("❌");
          return reply("❌ Invalid Surah.");
        }

        const surah = data.data;
        const limit = surah.numberOfAyahs > 20 ? 15 : surah.numberOfAyahs;

        const lines = [
          `*${surah.englishName}*`,
          `${surah.name} (${surah.number})`,
          `Revelation: ${surah.revelationType} | Verses: ${surah.numberOfAyahs}`,
          "",
        ];

        surah.ayahs.slice(0, limit).forEach((item) => {
          lines.push(`*${item.numberInSurah}.* ${item.text}`);
          lines.push("");
        });

        if (surah.numberOfAyahs > limit) {
          lines.push(`... (${surah.numberOfAyahs - limit} more verses)`);
          lines.push(`Use \`${botPrefix}quran ${surahNum}:N\` to read specific verse.`);
        }

        await reply(lines.join("\n").trim());
        await react("✅");
        return;
      }

      if (firstArg === "search" && args[1]) {
        const keyword = args.slice(1).join(" ");
        const { data } = await axios.get(
          `${QURAN_API_BASE}/search/${encodeURIComponent(keyword)}/all/en`,
        );

        if (data.code !== 200 || !data.data || data.data.count === 0) {
          await react("❌");
          return reply(`❌ No results found for "${keyword}".`);
        }

        const lines = [
          `🔍 *Results for "${keyword}"* (${data.data.count} found)`,
          "",
        ];

        data.data.matches.slice(0, 6).forEach((match) => {
          lines.push(
            `*${match.surah.englishName}* (${match.surah.number}:${match.numberInSurah})`,
          );
          lines.push(match.text);
          lines.push("");
        });

        if (data.data.count > 6) {
          lines.push("... and more.");
        }

        await reply(lines.join("\n").trim());
        await react("✅");
        return;
      }

      if (firstArg === "random" || firstArg === "ayah") {
        const randomSurah = Math.floor(Math.random() * 114) + 1;
        const { data } = await axios.get(
          `${QURAN_API_BASE}/surah/${randomSurah}/${DEFAULT_EDITION}`,
        );

        if (data.code !== 200 || !data.data?.ayahs?.length) {
          await react("❌");
          return reply("❌ Failed to get random ayah.");
        }

        const surah = data.data;
        const randomIndex = Math.floor(Math.random() * surah.ayahs.length);
        const ayah = surah.ayahs[randomIndex];

        const message = [
          "🎲 *Random Ayah*",
          "",
          `*${surah.englishName}* (${surah.number}:${ayah.numberInSurah})`,
          "",
          ayah.text,
          "",
          `— ${surah.englishName}`,
        ].join("\n");

        await reply(message);
        await react("✅");
        return;
      }

      await react("❌");
      return reply(getQuranUsage(botPrefix));
    } catch (e) {
      console.error("Quran API Error:", e);
      await react("❌");
      return reply("❌ Failed to fetch from Quran API. Please try again later.");
    }
  },
);

gmd(
  {
    pattern: "quranedition",
    aliases: ["quraneditions", "editions"],
    react: "📚",
    category: "religion",
    description: "List Quran editions from api.alquran.cloud",
  },
  async (from, Gifted, conText) => {
    const { q, reply, react } = conText;

    try {
      await react("⏳");
      const query = q?.trim().toLowerCase();
      const { data } = await axios.get(`${QURAN_API_BASE}/edition`);
      if (data.code !== 200 || !Array.isArray(data.data)) {
        await react("❌");
        return reply("❌ Failed to fetch editions.");
      }

      const allEditions = data.data.filter(
        (item) => item.format === "text" && item.type === "translation",
      );

      const filtered = query
        ? allEditions.filter(
            (item) =>
              item.identifier.toLowerCase().includes(query) ||
              item.language?.toLowerCase().includes(query) ||
              item.englishName?.toLowerCase().includes(query),
          )
        : allEditions;

      if (!filtered.length) {
        await react("❌");
        return reply(`❌ No editions found${query ? ` for "${query}"` : ""}.`);
      }

      const top = filtered.slice(0, 20);
      const lines = [
        `📚 *Quran Editions* (${filtered.length} found)`,
        `Default: ${DEFAULT_EDITION}`,
        "",
      ];

      top.forEach((item) => {
        lines.push(`• ${item.identifier} — ${item.englishName} (${item.language})`);
      });

      if (filtered.length > top.length) {
        lines.push("");
        lines.push(`Showing ${top.length}/${filtered.length}. Use a filter like: .quranedition english`);
      }

      await reply(lines.join("\n"));
      await react("✅");
    } catch (e) {
      console.error("Quran editions error:", e);
      await react("❌");
      return reply("❌ Failed to fetch Quran editions.");
    }
  },
);

module.exports = {};
