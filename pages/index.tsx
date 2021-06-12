import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

let transcripts: string[] = []

const Home: React.FC = () => {
  const { transcript, listening } = useSpeechRecognition()
  const [max_text_num, setMaxTextNum] = useState(20)

  const startRecog = () => {
    SpeechRecognition.startListening()
  }

  const stopRecog = () => {
    SpeechRecognition.stopListening()
  }

  useEffect(() => {
    if (transcript.length > 0) {
      const text: string = transcript

      while (transcripts.length >= max_text_num) {
        transcripts.shift()
      }
      transcripts.push(text)
      console.log(transcripts)
    }
    if (!listening) {
      SpeechRecognition.startListening()
    }
  }, [listening])

  return (
    <div>
      <Head>
        <title>文字起こし</title>
      </Head>
      <h1 className="flex justify-center items-center flex-col mt-4 text-2xl">
        文字起こし(Chromeでのみ動作します)
      </h1>
      <p className="mt-4 mx-4 text-2xl">
        マイクの認識: {listening ? 'on' : 'off'}
      </p>
      <div className="mt-4">
        <span className="ml-4">最大表示件数</span>
        <input
          type="number"
          name=""
          id=""
          min="1"
          className="ml-4 border border-blue-500  py-2 px-4"
          value={max_text_num}
          onChange={(e) => {
            if (Number(e.target.value) > 0)
              setMaxTextNum(Number(e.target.value))
          }}
        />
      </div>
      <>
        {transcripts.map((text, index) => {
          return (
            <div key={index} className="flex mt-4 mx-4 border shadow-lg">
              <p className="mx-4 my-4 py-2 px-4 copy">{text}</p>
              <button
                onClick={(e) => {
                  navigator.clipboard
                    .writeText(transcripts[index])
                    .then((e) => {
                      alert('コピーしました')
                    })
                }}
                className="text-blue-500 underline py-2 px-8 my-4"
              >
                テキストのコピー
              </button>
            </div>
          )
        })}
      </>
    </div>
  )
}
export default Home
