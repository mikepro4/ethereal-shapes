import React, { useState, useEffect } from 'react'
import 'regenerator-runtime'
import { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({ commands, onListen }) => {
  const [transcribing, setTranscribing] = useState(true)
  const toggleTranscribing = () => setTranscribing(!transcribing)
  const toggleClearTranscriptOnListen = () => setClearTranscriptOnListen(!clearTranscriptOnListen)

  let clearTranscriptOnListen = true
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({ transcribing, clearTranscriptOnListen, commands })
  useEffect(() => {
    if (interimTranscript !== '') {
        onListen(interimTranscript)

    //   console.log('Got interim result:', interimTranscript)
    }
    if (finalTranscript !== '') {
        // onListen(interimTranscript)
    //   console.log('Got final result:', finalTranscript)
    }
  }, [interimTranscript, finalTranscript]);

  return (
    <div className="speech-container">
      <span>{interimTranscript}</span>
    </div>
  )
}

export default Dictaphone