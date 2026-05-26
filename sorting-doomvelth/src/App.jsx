import "./App.css";
import { useState, useEffect } from "react";

const questions = [
  {
    question: "Jika diberi satu julukan, mana yang paling cocok?",
    answers: [
      { text: "The Moon Whisperer", house: "THALERON" },
      { text: "The Shadowmind", house: "VEYLGRIM" },
      { text: "The Storm Seeker", house: "DARNYM" },
      { text: "The Crimson Wolf", house: "RAKHLOR" },
    ],
  },

  {
    question: "Apa kekuatan yang paling ingin kamu miliki?",
    answers: [
      { text: "Healing & Water Magic", house: "THALERON" },
      { text: "Illusion & Poison Magic", house: "VEYLGRIM" },
      { text: "Storm & Space Magic", house: "DARNYM" },
      { text: "Fire & Beast Magic", house: "RAKHLOR" },
    ],
  },

  {
    question: "Saat menghadapi konflik kamu akan...",
    answers: [
      { text: "Menjadi penengah", house: "THALERON" },
      { text: "Mengatur strategi diam-diam", house: "VEYLGRIM" },
      { text: "Mengambil risiko besar", house: "DARNYM" },
      { text: "Melindungi semua orang", house: "RAKHLOR" },
    ],
  },

  {
    question: "Tempat favoritmu di Doomvelth?",
    answers: [
      { text: "Danau bulan", house: "THALERON" },
      { text: "Perpustakaan rahasia", house: "VEYLGRIM" },
      { text: "Menara astronomi", house: "DARNYM" },
      { text: "Arena duel", house: "RAKHLOR" },
    ],
  },

  {
    question: "Apa kelemahan terbesarmu?",
    answers: [
      { text: "Overthinking", house: "THALERON" },
      { text: "Sulit percaya orang lain", house: "VEYLGRIM" },
      { text: "Terlalu ambisius", house: "DARNYM" },
      { text: "Mudah emosional", house: "RAKHLOR" },
    ],
  },

  {
    question: "Elemen yang paling dekat denganmu?",
    answers: [
      { text: "Air", house: "THALERON" },
      { text: "Bayangan", house: "VEYLGRIM" },
      { text: "Petir", house: "DARNYM" },
      { text: "Api", house: "RAKHLOR" },
    ],
  },

  {
    question: "Apa yang paling penting bagimu?",
    answers: [
      { text: "Kedamaian", house: "THALERON" },
      { text: "Kekuatan", house: "VEYLGRIM" },
      { text: "Kebebasan", house: "DARNYM" },
      { text: "Kehormatan", house: "RAKHLOR" },
    ],
  },

  {
    question: "Jika menjadi mage, kamu akan menjadi...",
    answers: [
      { text: "Oracle", house: "THALERON" },
      { text: "Spy Mage", house: "VEYLGRIM" },
      { text: "Dimensional Mage", house: "DARNYM" },
      { text: "Battle Mage", house: "RAKHLOR" },
    ],
  },

  {
    question: "Bagaimana temanmu melihatmu?",
    answers: [
      { text: "Bijaksana", house: "THALERON" },
      { text: "Misterius", house: "VEYLGRIM" },
      { text: "Visioner", house: "DARNYM" },
      { text: "Berani", house: "RAKHLOR" },
    ],
  },

  {
    question: "Takdir seperti apa yang kamu inginkan?",
    answers: [
      { text: "Menjadi cahaya bagi orang lain", house: "THALERON" },
      { text: "Mengendalikan takdir dari balik layar", house: "VEYLGRIM" },
      { text: "Mencapai kejayaan besar", house: "DARNYM" },
      { text: "Menjadi legenda perang", house: "RAKHLOR" },
    ],
  },
];

function calculateHouse(updatedAnswers) {

  const scores = {
    THALERON: 0,
    VEYLGRIM: 0,
    DARNYM: 0,
    RAKHLOR: 0,
  };

  updatedAnswers.forEach((answer) => {
    scores[answer.house]++;
  });

  let winner = "THALERON";

  for (const house in scores) {
    if (scores[house] > scores[winner]) {
      winner = house;
    }
  }

  return winner;
}

export default function App() {

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const startSorting = () => {

    if (!name || !phone) {
      alert("Masukkan nama dan nomor WhatsApp terlebih dahulu.");
      return;
    }

    setStarted(true);
  };

  const chooseAnswer = (answer) => {

    const updatedAnswers = [...answers, answer];

    setAnswers(updatedAnswers);

    if (currentQuestion + 1 < questions.length) {

      setCurrentQuestion(currentQuestion + 1);

    } else {

      const resultHouse =
        calculateHouse(updatedAnswers);

      const data = {
        nama: name,
        nomor: phone,
        asrama: resultHouse,
        jawaban: updatedAnswers.map((a) => a.text).join(", "),
        waktu: new Date().toLocaleString(),
      };

      fetch(
        "https://script.google.com/macros/s/AKfycbz93D6bXak6H6pvlrUm0aVZCN6tZBqyZ4VNgnEVMcdQh1xPhPB2sPmnWwUil_vqCGou/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });

      setFinished(true);
    }
  };

  if (finished) {

    return (
      <div className="wrapper">

        <div className="card">

          <p className="topText">
            DOOMVELTH ARCHIVES
          </p>

          <h1 className="title">
            Your Fate Has Been Sealed
          </h1>

          <p className="desc">
            Jawabanmu telah direkam ke dalam Arsip Rahasia Doomvelth
            dan sedang diperiksa oleh para Headmaster.
          </p>

          <p className="small">
            Percobaan selanjutnya tidak akan kami tanggapi.
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="wrapper">

      {!started ? (

        <div className="card">

          <p className="topText">
            DOOMVELTH ARCHIVES
          </p>

          <h1 className="title">
            The Ancient Sorting Ritual
          </h1>

          <p className="desc">
            Setiap jiwa yang memasuki Doomvelth akan dipanggil oleh takdirnya.
            Isi identitasmu dan biarkan sihir kuno menentukan jalanmu.
          </p>

          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />

          <input
            type="text"
            placeholder="Nomor WhatsApp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
          />

          <button
            onClick={startSorting}
            className="mainButton"
          >
            Begin The Ritual
          </button>

        </div>

      ) : (

        <div className="card">

          <p className="topText">
            DOOMVELTH ARCHIVES
          </p>

          <h1 className="question">
            {questions[currentQuestion].question}
          </h1>

          <div>

            {questions[currentQuestion].answers.map((answer, index) => (

              <button
                key={index}
                onClick={() => chooseAnswer(answer)}
                className="answerButton"
              >
                {answer.text}
              </button>

            ))}

          </div>

          <p className="progress">
            Question {currentQuestion + 1} / {questions.length}
          </p>

        </div>

      )}

    </div>
  );
}