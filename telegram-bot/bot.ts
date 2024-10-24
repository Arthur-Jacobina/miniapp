import { Bot, InlineKeyboard } from "grammy";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

// Define the type for userLanguages
interface UserLanguages {
  [userId: number]: string;
}

// Store the user's language preference with proper typing
let userLanguages: UserLanguages = {};

// Get the bot token from the environment variables
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;
if (!BOT_TOKEN) {
  throw new Error("Bot token is missing. Please check your .env file.");
}

// Create a new bot
const bot = new Bot(BOT_TOKEN);

// Language options (14 languages in total)
const languages: { [key: string]: string } = {
  "🇺🇸 English": "en",
  "🇪🇸 Spanish": "es",
  "🇫🇷 French": "fr",
  "🇩🇪 German": "de",
  "🇮🇹 Italian": "it",
  "🇧🇷 Portuguese": "br",
  "🇯🇵 Japanese": "ja",
  "🇰🇷 Korean": "ko",
  "🇨🇳 Chinese": "zh",
  "🇷🇺 Russian": "ru",
  "🇮🇳 Hindi": "hi",
  "🇹🇷 Turkish": "tr",
  "🇳🇱 Dutch": "nl",
  "🇸🇦 Arabic": "ar",
};

// Pre-assign menu text
const languageMenu = "<b>Select a language to learn</b>";
const practiceMenu = "<b>Practice Language</b>\n\nAsk me something to practice!";

// Build the language selection keyboard
const languageKeyboard = new InlineKeyboard();
Object.keys(languages).forEach((key) => {
  languageKeyboard.text(key, key).row();
});

// Function to set user's language with explicit types for parameters
const setUserLanguage = (userId: number, language: string): void => {
  userLanguages[userId] = language;
};

// Function to get user's language with explicit types
const getUserLanguage = (userId: number): string => userLanguages[userId] || "en";

// Send language selection menu
bot.command("start", async (ctx) => {
  await ctx.reply(languageMenu, {
    parse_mode: "HTML",
    reply_markup: languageKeyboard,
  });
});

// Process language selection
Object.keys(languages).forEach((languageKey) => {
  bot.callbackQuery(languageKey, async (ctx) => {
    setUserLanguage(ctx.from.id, languages[languageKey]);
    await ctx.editMessageText(`Language set to ${languageKey}.\n${practiceMenu}`, {
      parse_mode: "HTML",
    });
  });
});

// Simulate practice for different languages
bot.on("message", async (ctx) => {
  const userLang = getUserLanguage(ctx.from.id);
  const userMessage = ctx.message.text;

  if (userLang === "en") {
    await ctx.reply(`In English, you said: ${userMessage}`);
  } else if (userLang === "es") {
    await ctx.reply(`En español, dijiste: ${userMessage}`);
  } else if (userLang === "fr") {
    await ctx.reply(`En français, tu as dit: ${userMessage}`);
  } else if (userLang === "de") {
    await ctx.reply(`Auf Deutsch, hast du gesagt: ${userMessage}`);
  } else if (userLang === "it") {
    await ctx.reply(`In italiano, hai detto: ${userMessage}`);
  } else if (userLang === "br") {
    await ctx.reply(`Em português, você disse: ${userMessage}`);
  } else if (userLang === "ja") {
    await ctx.reply(`日本語で、あなたは言いました: ${userMessage}`);
  } else if (userLang === "ko") {
    await ctx.reply(`한국어로, 당신은 말했다: ${userMessage}`);
  } else if (userLang === "zh") {
    await ctx.reply(`用中文你说: ${userMessage}`);
  } else if (userLang === "ru") {
    await ctx.reply(`На русском, вы сказали: ${userMessage}`);
  } else if (userLang === "hi") {
    await ctx.reply(`हिंदी में, आपने कहा: ${userMessage}`);
  } else if (userLang === "tr") {
    await ctx.reply(`Türkçe olarak şunu söylediniz: ${userMessage}`);
  } else if (userLang === "nl") {
    await ctx.reply(`In het Nederlands zei je: ${userMessage}`);
  } else if (userLang === "ar") {
    await ctx.reply(`بالعربية، قلت: ${userMessage}`);
  } else {
    await ctx.reply(`Sorry, I don't support that language yet.`);
  }
});

// Start the bot
bot.start();
