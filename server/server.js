const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const { getTeamsFromLeague } = require("./axiosConfig");
const db = require("./db");
const teamRoutes = require("./routes/teamRoutes");
const authRoutes = require("./routes/authRoutes");
const { default: mongoose } = require("mongoose");
const connectDB = require("./dbConn");
const Team = require("./models/Team");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.get("/saveTeams", async (req, res) => {
  const teams = await getTeamsFromLeague();
  // console.log(teams);

  const nbaTeams = teams
    .filter((team) => {
      if (
        team.name &&
        team.code &&
        team.city &&
        team.logo &&
        team.leagues.standard.conference &&
        team.nbaFranchise
      ) {
        return team;
      }
    })
    .map((team) => {
      const { id, name, code, city, logo } = team;
      const conference = team.leagues.standard.conference;
      return { id, name, code, city, logo, conference };
    });
  try {
    const data = await Team.collection.insertMany(nbaTeams);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

// When strict option is set to true, Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database, and all other fields will not be saved (if some other fields are sent)
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: "true",
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

connectDB();
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});