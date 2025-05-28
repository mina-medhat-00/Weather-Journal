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

type WeatherResponse = {
  date: Date;
  temp: number;
  feelings: string;
};

// fetch the data from the weather API
async function fetchData(url: string) {
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
      feelings: (feelingsInput as HTMLInputElement).value,
    };
  } catch (error) {
    throw error;
  }
}

// post data to the server in the data object (simulates db)
async function postData(url: string, data: object) {
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

// get data from the data object in server
async function getData(url: string) {
  const data = await fetch(url);
  try {
    const res = await data.json();
    return res;
  } catch (error) {
    throw error;
  }
}

// render the data fetched from the get request
function modifyUI(res: WeatherResponse) {
  if (res) {
    (dateContainer as HTMLInputElement).textContent = String(res.date);
    (tempContainer as HTMLInputElement).textContent = String(res.temp);
    (feelingsContainer as HTMLInputElement).textContent = res.feelings
      ? res.feelings
      : "How do you feel today?";
  } else {
    (errorMessage as HTMLInputElement).textContent = "An Error Occurred";
  }
}

generateBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  const generatedURI = `${baseURI}${
    (zipInput as HTMLInputElement).value
  }${apiKey}`;

  (dateContainer as HTMLInputElement).textContent = "";
  (tempContainer as HTMLInputElement).textContent = "";
  (feelingsContainer as HTMLInputElement).textContent = "";
  (errorMessage as HTMLInputElement).textContent = "";

  try {
    const data = await fetchData(generatedURI);
    await postData(`${serverURL}/add`, data);
    const getResponse = await getData(`${serverURL}/all`);
    modifyUI(getResponse);
  } catch (error) {
    (errorMessage as HTMLInputElement).textContent = String(error);
  }
});
