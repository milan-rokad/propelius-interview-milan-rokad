import express from "express";
import cors from "cors";

import BORROWERS from "./borrowers.json";

const PORT = 1337;

const app = express();

// Allow cross-origin requests.
app.use(cors());

app.get("/borrowers", (req, res) => {
  // TODO: Implement support for filtering.

  res.send(BORROWERS);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
