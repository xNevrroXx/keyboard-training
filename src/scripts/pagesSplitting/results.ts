// own modules
import makeChart from "../modules/makeChart";
import initTab from "../modules/initTab";
import {authenticate, statisticDataGet} from "../services/services";
// types
import {IResponseStatistic, ITabMatchTriggerContent} from "../types";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

async function results() {
  try {
    const authenticateResponse = await authenticate();
    const plugNoResultsElem = document.querySelector(".plug");
    const resultsElem = document.querySelector(".results");

    try {
      const matchTriggerContent: ITabMatchTriggerContent = {
        containers: {
          trigger: ".result__trigger-container",
          content: ".result__canvases-container"
        },
        mainSelectors: {
          trigger: ".result__trigger",
          content: ".result__content"
        },
        activeClass: {
          trigger: "button_in-text_active",
          content: "result__active-canvas"
        },
        matchesDatasetId: [
          {
            trigger: 1,
            content: 1
          },
          {
            trigger: 2,
            content: 2
          }
        ],
        defaultActiveDatasetId: 1
      }
      initTab(matchTriggerContent);
    }
    catch (error) {
      console.log(error);
    }

    try {
      const response: IResponseStatistic | Error = await statisticDataGet("last");
      const data = response as IResponseStatistic;


      for (const timestamp of Object.keys(data) as (keyof typeof data)[]) {
        const testTextElem = document.querySelector(".result__testing-text");
        const testDateElem = document.querySelector(".result__date");
        const testingData = data[timestamp];

        testDateElem.textContent = new Date(+timestamp).toLocaleString();
        testTextElem.innerHTML = testingData.text;
        makeChart(testingData.statistic, "#speed", "speed", "speed");
        makeChart(testingData.statistic, "#accuracy", "accuracy", "accuracy");
      }
    }
    catch (error) {
      plugNoResultsElem.classList.remove("hidden");
      resultsElem.classList.add("result__hidden");
    }
  } catch {
    window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]
  }
}

export default results;