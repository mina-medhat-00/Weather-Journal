/*---Personal API Key---*/
const apiKey = "&appid=a82cf7d05a8e434be8aba4b0dfb20b2d&units=imperial";

/*---Global Variables---*/
const button = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const myInput = document.querySelector(".myInput");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
const errorMessage = document.querySelector("#error");
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const d = new Date();
const newDate = d.toDateString();

/*---Event listeners---*/
button.addEventListener("click", (e) => {
  e.preventDefault();
  const generatedURI = `${baseURI}${zip.value}${apiKey}`;

  // clear all fields every time generate button is clicked
  temp.innerHTML = "";
  date.innerHTML = "";
  feelings.innerHTML = "";
  errorMessage.innerHTML = "";

  // nesting promises
  getData(generatedURI).then((data) => {
    extractData(data).then((info) => {
      postData("/add", info).then((data) => {
        fetchData("/all").then((data) => {
          modifyUI(data);
        });
      });
    });
  });
});

/*---Promises---*/
const getData = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const extractData = async (data) => {
  try {
    if (data.cod != 200) {
      return data;
    }
    const info = {
      date: newDate,
      temp: data.main.temp,
      feelings: feelings.value,
    };
    return info;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  try {
    const result = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const fetchData = async (url) => {
  const data = await fetch(url);
  try {
    const res = await data.json();
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

const modifyUI = async (data) => {
  const res = await data;
  if (res.date) {
    temp.innerHTML = res.temp;
    date.innerHTML = res.date;
    content.innerHTML = res.feelings ? res.feelings : "How do you feel today?";
  } else {
    errorMessage.innerHTML = res.message;
  }
};
