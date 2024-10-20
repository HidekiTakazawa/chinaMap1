// const maps = ["../map-polygon.svg", "../map-circle.svg", "../map-mobile.svg", "../map-full.svg"]
const maps = ["China_blank_map_grey.svg"]
const containers = document.querySelectorAll('.map')
const synth = window.speechSynthesis;
const pinyinName = new Array("anhui", "beijing", "chongqing", "fujian", "gansu", "guangdong", "guangxi", "guizhou", "hainan", "hebei", "heilongjiang", "henan", "hubei", "hunan", "jiangsu", "jiangxi", "jilin", "liaoning", "neimenggu", "ningxia", "qinghai", "shannxi", "shandong", "shanghai", "shanxi", "sichuan", "tianjin", "xinjiang", "xizang", "yunnan", "zhejiang", "xianggang", "aomen");

const shengName = new Array("安徽省", "北京市", "重庆市", "福建省", "甘肃省", "广东省", "广西壮族自治区", "贵州省", "海南省", "河北省", "黑龙江省", "河南省", "湖北省", "湖南省", "江苏省", "江西省", "吉林省", "辽宁省", "内蒙古自治区", "宁夏回族自治区", "青海省", "陕西省", "山东省", "上海市", "山西省", "四川省", "天津市", "新疆维吾尔自治区", "西藏自治区", "云南省", "浙江省", "香港", "澳门");
//
//
const locations = [
  { name: "anhui", lat: 31.8198, lon: 117.2903 },
  { name: "beijing", lat: 39.9042, lon: 116.4074 },
  { name: "chongqing", lat: 29.4316, lon: 106.9123 },
  { name: "fujian", lat: 26.0789, lon: 119.2965 },
  { name: "gansu", lat: 36.0611, lon: 103.8343 },
  { name: "guangdong", lat: 23.3790, lon: 113.7633 },
  { name: "guangxi", lat: 23.8298, lon: 108.7881 },
  { name: "guizhou", lat: 26.5982, lon: 106.7074 },
  { name: "hainan", lat: 20.0174, lon: 110.3492 },
  { name: "hebei", lat: 38.0428, lon: 114.5149 },
  { name: "heilongjiang", lat: 45.7421, lon: 126.6617 },
  { name: "henan", lat: 34.7655, lon: 113.7536 },
  { name: "hubei", lat: 30.5454, lon: 114.3423 },
  { name: "hunan", lat: 28.1124, lon: 112.9834 },
  { name: "jiangsu", lat: 32.0617, lon: 118.7632 },
  { name: "jiangxi", lat: 28.6757, lon: 115.9092 },
  { name: "jilin", lat: 43.8378, lon: 126.5494 },
  { name: "liaoning", lat: 41.8057, lon: 123.4315 },
  { name: "neimenggu", lat: 40.8175, lon: 111.7652 },
  { name: "ningxia", lat: 38.4922, lon: 106.2309 },
  { name: "qinghai", lat: 36.6209, lon: 101.7802 },
  { name: "shannxi", lat: 34.2655, lon: 108.9542 },
  { name: "shandong", lat: 36.6683, lon: 117.0208 },
  { name: "shanghai", lat: 31.2304, lon: 121.4737 },
  { name: "shanxi", lat: 37.8570, lon: 113.5632 },
  { name: "sichuan", lat: 30.5728, lon: 104.0668 },
  { name: "tianjin", lat: 39.3434, lon: 117.3616 },
  { name: "xinjiang", lat: 43.8295, lon: 87.6169 },
  { name: "xizang", lat: 29.6525, lon: 91.1721 },
  { name: "yunnan", lat: 25.0453, lon: 102.7097 },
  { name: "zhejiang", lat: 30.2674, lon: 120.1528 },
  { name: "xianggang", lat: 22.3193, lon: 114.1694 },
  { name: "aomen", lat: 22.1987, lon: 113.5439 }
];
async function getTemperature(pinyinName) {
  const location = locations.find(loc => loc.name === pinyinName);
  if (!location) {
    throw new Error("Location not found");
  }
  const { lat, lon } = location;
  const apiKey = ''; // ここにAPIキーを入力
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const observationTime = new Date(data.dt * 1000).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    
    return [temperature, description, observationTime];
   
  } catch (error) {
    console.error("Error fetching temperature data:", error);
    throw error;
  }
}

// 使用例
// getTemperature("beijing").then(([temp, description]) => {
//   console.log(`beijingの温度は${temp}°Cです。天気は${description}です`);
// }).catch(error => {
//   console.error(error);
// });

let main;
let container;
main = document.getElementById('main');
container = document.getElementById('container');
let sheetIndex;  // 現在処理中のシートのindex
let saveAllDatas;
let sheetDatas;
let sheetData;
const bgColorNothing = '#ffffff';
const bgColorGazou = '#000000';
const bgColorSite = '#00000a'
const bgColorWeather = '#00000b'
const bgColorPinyin = '#fffffa';
const kurukuru = document.getElementById('kurukuru');
//
const END_POINT = "https://script.google.com/macros/s/AKfycbyG52LsV1qmFiMNAs8xEJxHcFdxN60OectBEdw40EpU9mWSTv1EzWhhU7n1gO5XWdhF/exec";
//スプレッドシート（タブ）の番号

// 2023-07-03 ファーウェイスマホ対応変更

// 23-06-13 -五十音が変更されたときに実行される。----------------------

let select = document.querySelector('[name="sheetSelect"]');

select.onchange = event => {
  var selIndex = select.selectedIndex;
  sheetIndex = selIndex;
  console.log(select.selectedIndex);

  mapBGColorSet(sheetIndex);

  sheetChangeSet(sheetIndex);


}
//
function sheetChangeSet(sheetIndex) {
  select.selectedIndex = sheetIndex;
  container.remove();
  container = document.createElement('div');
  container.setAttribute('id', 'container');
  main.appendChild(container);
  sheetData = sheetDatas[sheetIndex + 1];
  renderSheetDatas(sheetData);
  iniCSSSet();
  cssIndex = 0;
  swButton = false;

}




const sheetSelector = document.getElementById("sheet-select");

// const wrapper = document.getElementById("wrapper");




getFromGAS();//起動時のデータ取得

//----------- 以下、関数定義--------------------------
// return ContentService.createTextOutput(JSON.stringify(allData));
// したものを読み込んでいる。
function getFromGAS() {

  $.ajax({
    type: "GET",
    url: END_POINT,
    // data: { sheetNo: SHEET_NO }

  }).done((result) => {        // 成功した時の処理
    console.log("get done:" + result);
    setSheetNames(JSON.parse(result)[0]);

    // getFromGAS(1);
    sheetDatas = JSON.parse(result);
    sheetData = sheetDatas[1];
    renderSheetDatas(sheetData);
    mapSet();
    iniCSSSet();
    kurukuru.remove();
  }).fail((error) => {  // 失敗した時の処理
    alert('Error:' + JSON.stringify(error));

  }).always((data) => {// 常にやる処理
    // do something
    // enableControlElements();
  });
}


function setSheetNames(sheetNamesArray) {
  sheetSelector.innerHTML = "";
  document.createElement('option')
  sheetNamesArray.forEach((sheetName, index) => {
    let option = document.createElement('option');
    option.setAttribute('value', index + 1);
    option.innerHTML = sheetName;
    sheetSelector.appendChild(option);
  });
}
async function renderSheetDatas(sheetDatas) {

  let div, table, tr, td, tbody, atag;
  div = document.createElement('div');
  div.setAttribute('class', 'dataContent');

  container.appendChild(div);
  //
  table = document.createElement('table');
  table.setAttribute('border', '1');
  div.appendChild(table);
  tbody = document.createElement('tbody');
  table.appendChild(tbody);
  for (let i = 0; i < sheetDatas.length; i++) {
    tr = document.createElement('tr');
    let strContent;
    let strName;
    let strBgColor;

    for (let j = 0; j < sheetDatas[i].length; j++) {


      td = document.createElement('td');
      if (sheetDatas[i][j] === '') {
        td.textContent = '    ';
      } else {

        strContent = sheetDatas[i][j];
        [strName, strBgColor] = cnvString(strContent);
        switch (strBgColor) {
          case bgColorGazou:
            let splitURL;


            splitURL = strName.split("/");
            fileURL = "https://lh3.googleusercontent.com/d/" + splitURL[5];
            atag = document.createElement('a');

            let gazouURL0 = fileURL;
            atag.setAttribute('href', gazouURL0);
            atag.setAttribute('class', 'classGazou');
            atag.setAttribute('target', '_blank');

            let img = document.createElement('img');


            img.setAttribute('src', gazouURL0);
            img.setAttribute('class', 'classGazou');
            // atag.setAttribute('target', '_blank');


            atag.appendChild(img);
            td.appendChild(atag);
            break;
          case bgColorSite:
            let siteComment;
            let siteAddress;
            [siteComment, siteAddress] = cnVSiteString(strName);

            atag = document.createElement('a');


            atag.setAttribute('href', siteAddress);
            atag.setAttribute('class', 'classSite');
            atag.setAttribute('target', '_blank');
            atag.innerHTML = siteComment;
            // atag.innerHTML = '参考サイト';

            td.appendChild(atag);
            break;
          case bgColorWeather:
            const [temp, description, observationTime] = await updateTemperature(strName);
            if (temp !== null && description !== null) {
              td.textContent = `(観測時間：${observationTime})温度は${temp}°Cです。天気は${description}です`;
            } else {
              td.textContent = '温度データを取得できませんでした';
            }
           
            break
          case bgColorPinyin:

            td.textContent = strName.substring(0, 1).toUpperCase() + strName.substring(1);
            break;
          case bgColorNothing:
            td.textContent = strName;
            break;
          default:
            td.textContent = strName;
            td.setAttribute('onclick', 'speakData(this)');
            td.setAttribute('class', 'clkBtn');
            td.style.backgroundColor = strBgColor;






        }

      }
      tr.appendChild(td);
    }



    tbody.appendChild(tr);
  }

}

//
// 非同期関数の定義
async function updateTemperature(strName) {
  try {
      // getTemperatureの結果を待つ
      const [temp, description, observationTime] = await getTemperature(strName);
      console.log(`(観測時間：${observationTime})${strName}の温度は${temp}°Cです。天気は${description}です`);
      return [temp, description, observationTime];
  } catch (error) {
      console.error(error);
      return [null, null];
  }
}



/// cnvString関数は、入力文字列を分割して名前と背景色を返します
function cnvString(strContent) {
  let strName;
  let strBgColor;
  // '高*沢' で文字列を分割し、名前と背景色を取得
  [strName, strBgColor] = strContent.split('高*沢');
  // 名前と背景色を配列として返す
  return [strName, strBgColor];
}
// 
function cnVSiteString(strName) {
  let siteComment;
  let siteAddress;
  let comment2 = strName.split('/http');
  if (comment2.length === 1) {
    siteComment = '参考サイト';
    siteAddress = strName;

  } else {
    let comment3 = strName.split('/');
    siteComment = comment3[0];

    siteAddress = strName.substring(comment3[0].length + 1, strName.length);

  }
  return [siteComment, siteAddress];

}
// イニシャル　CSS セット　　最初のシートをイニシャル画面にする。
function iniCSSSet() {
  sheetIndex = 0;
  var classElement = document.getElementsByClassName('dataContent');
  for (let i = 1; i < classElement.length; i++) {
    classElement[i].classList.add("dataNone");
  }

}
//
function mapSet() {
  maps.forEach(async (map, index) => {
    const res = await fetch(map)

    if (res.ok) {
      const svg = await res.text()
      containers[index].innerHTML = svg
      const prefs = document.querySelectorAll('.shengName')
      const taiwan = document.querySelector("#taiwan");
      taiwan.addEventListener('mouseover', (event) => {
        event.currentTarget.style.fill = "#00ff00"
      })
      taiwan.addEventListener('mouseleave', (event) => {
        event.currentTarget.style.fill = ""
      })
      prefs.forEach((pref) => {
        // pref.addEventListener('mouseover', (event) => {
        //   event.currentTarget.style.fill = "#ff0000"
        // })
        // pref.addEventListener('mouseleave', (event) => {
        //   event.currentTarget.style.fill = ""
        // })
        // マウスクリック時のイベント
        pref.addEventListener('click', (event) => {
          console.log(event.currentTarget.id);
          mapClickEvent(event.currentTarget.id);


        })
      })
    }
  });

}
//
function mapClickEvent(id) {
  let wShengName;
  for (let i = 0; i < pinyinName.length; i++) {
    if (pinyinName[i] === id) {
      wShengName = shengName[i];
      break;
    }

  }
  for (let j = 0; j < sheetDatas[0].length; j++) {
    if (wShengName === sheetDatas[0][j]) {
      sheetChangeSet(j);
      break;
    }
  }
  const prefs = document.querySelectorAll('.shengName');
  prefs.forEach((pref) => {
    if (pref.id === id) {
      pref.style.fill = "#ff0000";

    } else {
      pref.style.fill = "";
    }
  });
  speakText2(id);

}
//
function mapBGColorSet(sheetIndex) {
  const prefs = document.querySelectorAll('.shengName');
  if (sheetIndex === 0) {
    prefs.forEach((pref) => {
      pref.style.fill = "";
      return;
    });
  }
  let idName;
  for (let i = 0; i < shengName.length; i++) {
    if (sheetDatas[0][sheetIndex] === shengName[i]) {
      idName = pinyinName[i];
      break;
    }


  }
  prefs.forEach((pref) => {
    if (pref.id === idName) {
      pref.style.fill = "#ff0000";

    } else {
      pref.style.fill = "";
    }
  });
}

//
function speakData(param1) {


  // if (param1 instanceof HTMLTableCellElement) {
  const td = param1;

  var uttr = new SpeechSynthesisUtterance(td.textContent);
  uttr.lang = "zh-CN"

  speechSynthesis.cancel();
  speechSynthesis.speak(uttr);

  // }

}
// テキストを音声に変換して再生する関数
function speakText2(text) {
  let wshengName;
  for (let i = 0; i < pinyinName.length; i++)
    if (text === pinyinName[i]) {
      wshengName = shengName[i];

    }

  const utterance = new SpeechSynthesisUtterance(wshengName);
  utterance.lang = 'zh-CN'; // 中国語の言語コード
  synth.speak(utterance);
}