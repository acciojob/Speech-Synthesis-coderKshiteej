
    const synth = window.speechSynthesis;
    const textInput = document.getElementById('text-input');
    const voiceSelect = document.getElementById('voiceSelect');
    const rate = document.getElementById('rate');
    const pitch = document.getElementById('pitch');
    const rateValue = document.getElementById('rate-value');
    const pitchValue = document.getElementById('pitch-value');
    const speakBtn = document.getElementById('speak');
    const stopBtn = document.getElementById('stop');

    let voices = [];

    // Populate voice list
    function populateVoices() {
      voices = synth.getVoices();
      voiceSelect.innerHTML = '';
      voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelect.appendChild(option);
      });
    }

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }

    // Speak function
    function speak() {
      if (synth.speaking) {
        synth.cancel(); // Stop current speech before starting new one
      }

      const text = textInput.value.trim();
      if (text === '') {
        alert('Please enter some text to speak.');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);

      const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.rate = parseFloat(rate.value);
      utterance.pitch = parseFloat(pitch.value);
      synth.speak(utterance);
    }

    // Stop function
    function stop() {
      synth.cancel();
    }

    // Event listeners
    speakBtn.addEventListener('click', speak);
    stopBtn.addEventListener('click', stop);

    rate.addEventListener('input', () => rateValue.textContent = rate.value);
    pitch.addEventListener('input', () => pitchValue.textContent = pitch.value);
  