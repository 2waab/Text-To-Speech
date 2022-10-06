const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis;

function voice() {
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Goggle US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    };
};

synth.addEventListener("voiceschanged", voice);

function textToSpeech(text) {
    let utternace = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()){
        if (voice.name === voiceList.value) {
            utternace.voice = voice;
        };
    };
    speechSynthesis.speak(utternace);
};

speechBtn.addEventListener('click', e => {
    e.preventDefault();
    if(textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        };
        if (textarea.value.length > 80) {
            if(isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        };
    };
});