const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=a82cf7d05a8e434be8aba4b0dfb20b2d&units=imperial";
const serverURL = "http://127.0.0.1:3000";

const weatherForm = document.querySelector("#weatherForm") as HTMLFormElement;
const generateBtn = document.querySelector("#generateBtn") as HTMLButtonElement;

const zipInput = document.querySelector("#zip") as HTMLInputElement;
const feelingsInput = document.querySelector("#feelings") as HTMLInputElement;

const resultContainer = document.querySelector(
  "#resultContainer"
) as HTMLDivElement;
const errorContainer = document.querySelector(
  "#errorContainer"
) as HTMLDivElement;

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
      feelings: feelingsInput.value,
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
  resultContainer.textContent = `${String(res.date)}\n${String(res.temp)}\n${
    res.feelings ? res.feelings : "How do you feel today?"
  }`;
}

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const generatedURI = `${baseURI}${Number(zipInput.value)}${apiKey}`;

  resultContainer.textContent = "";
  errorContainer.textContent = "";

  generateBtn.disabled = true;
  try {
    const data = await fetchData(generatedURI);
    await postData(`${serverURL}/add`, data);
    const getResponse = await getData(`${serverURL}/all`);
    modifyUI(getResponse);
  } catch (error) {
    errorContainer.textContent =
      error instanceof Error ? error.message : String(error);
  } finally {
    generateBtn.disabled = false;
  }
});
