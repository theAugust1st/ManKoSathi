require("dotenv").config();
const fs = require("fs");
const { chain } = require("stream-chain");
const { parser } = require("stream-json");
const { streamArray } = require("stream-json/Streamers/StreamArray");
const Quote = require("../models/Quote");
const path = require("path");
const connectDB = require("../config/db");
const { default: mongoose } = require("mongoose");
const jonsFilePath = path.join(__dirname, "..", "data", "quotes.json");

const categoryMap = {
  // Motivation-related
  motivation: "motivation",
  success: "motivation",
  // purpose: "motivation",
  // faith: "motivation",

  // Wisdom-related
  wisdom: "wisdom",
  philosophy: "wisdom",
  knowledge: "wisdom",
  education: "wisdom",
  truth: "wisdom",

  // Mindfulness
  mind: "mindfulness",
  soul: "mindfulness",

  // Perseverance
  life: "perseverance",
  hope: "perseverance",
  faith: "perseverance",

  // Calm
  happiness: "calm",
  friendship: "calm",
  relationship: "calm",

  // Positivity
  positive: "positivity",
  humor: "positivity",
  funny: "positivity",
  arts: "positivity",

  // Reflection
  death: "reflection",
  writing: "reflection",
  quotes: "reflection",

  // Inspiration
  inspiration: "inspiration",

  // Self-awareness
  purpose: "self-awareness",
};

function mapCategory(originalCategory) {
  if (!originalCategory) return null;
  const key = originalCategory.toLowerCase().trim();
  return categoryMap[key];
}

const batchSize = 500;
let batch = [];
(async () => {
  await connectDB();
  const readStream = fs.createReadStream(jonsFilePath);
  const pipeline = chain([readStream, parser(), streamArray()]);
  pipeline.on("data", async ({ value }) => {
    const { Quote: quoteText, Author, Category } = value;
    const mappedCategory = mapCategory(Category);
    if (!validateData(value) || !mappedCategory) return;
    const item = {
      quoteText,
      author: Author,
      category: mappedCategory,
    };
    batch.push(item);
    if (batch.length >= batchSize) {
      pipeline.pause();
      try {
        await Quote.insertMany(batch,{ordered:false});
      } catch (error) {
        console.log("Error inserting batch:", error);
      } finally {
        batch = [];
        pipeline.resume();
      }
    }
  });
  pipeline.on("end", async () => {
    if (batch.length > 0) {
      try {
        await Quote.insertMany(batch,{ordered:false});
        await mongoose.connection.close();
      } catch (error) {
        console.log("Error while inserting final batch:", error);
      }
    }
    console.log("All quotes inserted");
    process.exit(0);
  });
  pipeline.on("error", () => {
    console.log("error occurs:", error);
    process.exit(1);
  });
})();

function validateData({ Quote, Author, Category }) {
  if (!(Quote && Author && Category)) {
    return false;
  }
  if (
    typeof Quote !== "string" ||
    typeof Author !== "string" ||
    typeof Category !== "string"
  ) {
    return false;
  }
  return true;
}
