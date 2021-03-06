const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MyScoreSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: {
      type: Number,
    },
    score: {
      type: Number,
    },
    count: {
      type: Number,
    },
    genres: {
      type: Number,
    },
    title: {
      type: String,
    },
    imageUrl: {
      type: String,
    }
  }
);

const MyScore = mongoose.model("MyScore", MyScoreSchema);

module.exports = { MyScore };
