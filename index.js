const fs = require("fs");
const xlsxj = require("xlsx-to-json");
const readline = require("readline");

const DEFAULT_PORT = 5050;
const expressFramework = require("express");
const express = expressFramework();
const bodyParser = require("body-parser");
const cors = require("cors");

const main = () => {
  const meetings = JSON.parse(fs.readFileSync("speakers.json", "utf8"));
  const speakers = {};
  meetings.forEach((item) => {
    const speakerOne = item["Speaker 1"];
    const speakerTwo = item["Speaker 2"];
    const speakerThree = item["Speaker 3"];
    if (
      !speakers.hasOwnProperty(speakerOne) &&
      speakerOne !== "none" &&
      speakerOne !== "N/A" &&
      speakerOne !== "" &&
      speakerOne !== "(no show)"
    ) {
      speakers[speakerOne] = null;
    }
    if (
      !speakers.hasOwnProperty(speakerTwo) &&
      speakerTwo !== "none" &&
      speakerTwo !== "N/A" &&
      speakerTwo !== "" &&
      speakerTwo !== "(no show)"
    ) {
      speakers[speakerTwo] = null;
    }
    if (
      !speakers.hasOwnProperty(speakerThree) &&
      speakerThree !== "none" &&
      speakerThree !== "N/A" &&
      speakerThree !== "" &&
      speakerThree !== "(no show)"
    ) {
      speakers[speakerThree] = null;
    }
  });
  const speakerKeys = Object.keys(speakers);

  speakerKeys.forEach((key) => {
    const meetingsSpokeIn = meetings.filter(
      (x) =>
        key === x["Speaker 1"] ||
        key === x["Speaker 2"] ||
        key === x["Speaker 3"]
    );
    if (meetingsSpokeIn.length > 0) {
      speakers[key] = meetingsSpokeIn[meetingsSpokeIn.length - 1].Date;
    }
  });
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question("Enter Speaker: ", function(name){
          console.log(speakers[name]);
          rl.close();
    })
  //   express.use(cors());
  //   express.use(bodyParser.json());
};

if (!fs.existsSync("speakers.json")) {
  xlsxj(
    {
      input: "speakers.xlsx",
      output: "speakers.json",
    },
    function (err, result) {
      if (err) {
        console.error(err);
      }
    }
  );
}

main();
// express.listen(DEFAULT_PORT, () => {
//   console.log(`Service is listening on ${DEFAULT_PORT}`);
// });
