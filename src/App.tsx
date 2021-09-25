import html2canvas from 'html2canvas'
import React, { useEffect, useRef, useState } from 'react'
import './App.css'
function App() {

  const [imgSrc, setImgSrc] = useState<string>('')
  const [memeText, setMemeText] = useState<string>('')
  const [memeTextcolor, setMemeTextcolor] = useState<string>('#FFF')
  const [base64IMG, setbase64IMG] = useState<string>('')
  const uploadInput = useRef<HTMLInputElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handleMemeText = (text: string) => setMemeText(text)
  //rerouteToGoogle= () => window.open('www.google.com', "_blank")
  //https://stackoverflow.com/questions/61935193/how-to-show-base64-image-on-browsers-new-tab
  const handleDownload = () => window.open(base64IMG, "_blank")
  const handleFileUpload = (e: any) => {
    const [file] = e.target.files
    const reader = new FileReader()
    reader.onloadend = () => setImgSrc(reader.result as string)
    console.log(imgSrc)
    if (file) {
      reader.readAsDataURL(file);
    }
  }


  async function printMeme() {
    await html2canvas(printRef.current!).then((canvas) => {
      console.log(canvas)
      const base64image = canvas.toDataURL("image/png");
      // window.location.href = base64image;
      setbase64IMG(base64image)
      console.log(base64image)
    });
  }

  const handleColorChange = (e: any) => setMemeTextcolor(e.target.value)

  useEffect(() => {
    if (imgSrc) printMeme()
    return () => {
    }
  }, [imgSrc])

  return (
    <div className="app">
      <div className="title"><h1>Memeable</h1></div>
      <div className="cta-title"><h2>Upload Image</h2></div>
      <div className="upload-area">
        {
          !imgSrc && <div className="img-placeholder"></div>
        }

        <div className="print-area" ref={printRef}>
          <img src={imgSrc}
            style={{ display: imgSrc ? "block" : "none", maxHeight: "500px" }}
            height="350"
            alt="Image preview..." />
          <div className="text-container">
            <div className=" "
              style={{ color: memeTextcolor, fontSize: 42, fontWeight: 'bold' }}

            >{memeText}</div>
          </div>
        </div>

        <input
          ref={uploadInput}
          onChange={handleFileUpload}
          type="file"
          style={{ display: "none" }}
          multiple={false}
        />
        <button className="upload-btn" onClick={e => uploadInput.current?.click()}>Upload</button>
        {imgSrc &&
          <button className="download-btn" onClick={handleDownload}>Download</button>
        }

        <input className="meme-input"
          type="text"
          name=""
          id=""
          onChange={e => handleMemeText(e.target.value)} />
        <input type="color"
          name="color"
          onChange={handleColorChange}
          onInput={handleColorChange}
          id="color" />
      </div>
    </div>
  )
}

export default App
