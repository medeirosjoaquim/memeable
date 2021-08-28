import React, { useRef, useState } from 'react'
import './App.css'

function App() {
  const [imgSrc, setImgSrc] = useState<string>('')
  const [memeText, setMemeText] = useState<string>('')

  const uploadInput = useRef<HTMLInputElement>(null);

  const handleMemeText = (text: string) => setMemeText(text)

  const handleFileUpload = (e: any) => {
    const [file] = e.target.files
    const reader = new FileReader()
    reader.onloadend = () => setImgSrc(reader.result as string)
    console.log(imgSrc)
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="app">
      <div className="title"><h1>Memeable</h1></div>
      <div className="cta-title"><h2>Upload Image</h2></div>
      <div className="upload-area">
        <img src={imgSrc}
          style={{ display: imgSrc ? "block" : "none", maxHeight: "500px" }}
          height="350"

          alt="Image preview..." />
        {
          !imgSrc && <div className="img-placeholder"></div>
        }
        <input
          ref={uploadInput}
          onChange={handleFileUpload}
          type="file"
          style={{ display: "none" }}
          multiple={false}
        />
        <button onClick={e => uploadInput.current?.click()}>Upload</button>
        <input className="meme-input" type="text" name="" id="" onChange={e => handleMemeText(e.target.value)} />
        <div className="meme-content"><span>{memeText}</span></div>
      </div>
    </div>
  )
}

export default App
