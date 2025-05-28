const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=a82cf7d05a8e434be8aba4b0dfb20b2d&units=imperial";
const serverURL = "http://127.0.0.1:3000";

const generateBtn = document.querySelector("#generate");
const zipInput = document.querySelector("#zip");
const feelingsInput = document.querySelector("#feelings");
const dateContainer = document.querySelector("#date");
const tempContainer = document.querySelector("#temp");
const feelingsContainer = document.querySelector("#content");
const errorMessage = document.querySelector("#error");

async function fetchData(url) {
  try {
    const result = await fetch(url);
    const data = await result.json();
    if (data.cod !== 200) {
      throw new Error(data.message || "An Error Occurred");
    }
    const d = new Date();
    const newDate = d.toDateString();
    return {
      date: newDate,
      temp: data.main.temp,
      feelings: feelingsInput.value,
    };
  } catch (error) {
    throw error;
  }
}

async function postData(url = "", data = {}) {
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
    throw error;
  }
}

async function getData(url) {
  const data = await fetch(url);
  try {
    const res = await data.json();
    return res;
  } catch (error) {
    throw error;
  }
}

function modifyUI(res) {
  if (res) {
    dateContainer.textContent = res.date;
    tempContainer.textContent = res.temp;
    feelingsContainer.textContent = res.feelings
      ? res.feelings
      : "How do you feel today?";
  } else {
    errorMessage.textContent = res.message;
  }
}

generateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const generatedURI = `${baseURI}${zipInput.value}${apiKey}`;

  dateContainer.textContent = "";
  tempContainer.textContent = "";
  feelingsContainer.textContent = "";
  errorMessage.textContent = "";

  try {
    const data = await fetchData(generatedURI);
    await postData(`${serverURL}/add`, data);
    const getResponse = await getData(`${serverURL}/all`);
    modifyUI(getResponse);
  } catch (error) {
    errorMessage.textContent = error;
  }
});
