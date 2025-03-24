// 初始化 Google 地圖
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 25.033964, lng: 121.564468 }, // 台北 101
        zoom: 12,
    });

    new google.maps.Marker({
        position: { lat: 25.033964, lng: 121.564468 },
        map: map,
        title: "台北 101",
    });
}

// 翻譯功能
function translateText() {
    const text = document.getElementById("textInput").value;
    const apiKey = "AIzaSyD4SMgk-OuH1RHf3xidSDKg6Ar8UT2hJsI"; // 替換成您的 API Key
    const targetLanguage = "en"; // 目標語言 (英文)

    if (!text) {
        alert("請輸入文字進行翻譯！");
        return;
    }

    fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            q: text,
            target: targetLanguage,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.translations) {
            document.getElementById("translationResult").innerText = data.data.translations[0].translatedText;
        } else {
            document.getElementById("translationResult").innerText = "翻譯失敗";
        }
    })
    .catch(error => {
        console.error("錯誤:", error);
        document.getElementById("translationResult").innerText = "無法連線到翻譯服務";
    });
}
