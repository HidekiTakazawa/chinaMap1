// const maps = ["../map-polygon.svg", "../map-circle.svg", "../map-mobile.svg", "../map-full.svg"]
const maps = ["China_blank_map_grey.svg"]
const containers = document.querySelectorAll('.map')
const synth = window.speechSynthesis;
const pinyinName = new Array("anhui", "beijing", "chongqing", "fujian", "gansu", "guangdong", "guangxi", "guizhou", "hainan", "hebei", "heilongjiang", "henan", "hubei", "hunan", "jiangsu", "jiangxi", "jilin", "liaoning", "neimenggu", "ningxia", "qinghai", "shannxi", "shandong", "shanghai", "shanxi", "sichuan", "tianjin", "xinjiang", "xizang", "yunnan", "zhejiang", "xianggang", "aomen");

 const      shengName = new Array("安徽省", "北京市", "重庆市", "福建省", "甘肃省", "广东省", "广西壮族自治区", "贵州省", "海南省", "河北省", "黑龙江省", "河南省", "湖北省", "湖南省", "江苏省", "江西省", "吉林省", "辽宁省", "内蒙古自治区", "宁夏回族自治区", "青海省", "陕西省", "山东省", "上海市", "山西省", "四川省", "天津市", "新疆维吾尔自治区", "西藏自治区", "云南省", "浙江省", "香港", "澳门");
 //
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
      pref.addEventListener('mouseover', (event) => {
        event.currentTarget.style.fill = "#ff0000"
      })
      pref.addEventListener('mouseleave', (event) => {
        event.currentTarget.style.fill = ""
      })
      // マウスクリック時のイベント
      pref.addEventListener('click', (event) => {
        console.log(event.currentTarget.id);
       
        speakText2(event.currentTarget.id);
        
      })
    })
  }
});
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
