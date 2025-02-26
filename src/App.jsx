import { useState } from 'react'
import './App.css'

export default function App() {
	const [Img , setImg] = useState("")
	const [QrData , setQrData] = useState("")
	const [isLoading , setLoading] = useState(false)
	async function generateQr(){
		setLoading(true)
		try{
			if(QrData === "") throw new Error("Please Enter a Valid Message...")
			else {
				const URL = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(QrData)}`
				setImg(URL)
				setTimeout(() => {
					setLoading(false)
				}, 2000);
			}
		}
		catch(error) {
			console.error("Error In Generating the Qr Code : " + error)
			setImg("")
		}
	}
	function downloadQR(){
		fetch(Img).then((response) => response.blob())
		.then((blob) => {
			const link = document.createElement("a")
			link.href = URL.createObjectURL(blob)
			link.download = "QrCode.jpg"
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		})
		.catch(error => console.error("Error In Downloading the Qr Code : " + error)) 
	} 
	return (
		<div className="container">
			<h1 className="title">QR Generator</h1>
			{isLoading ? <div className="loading"></div> : Img && <div className="imageArea">
				<img src={Img} alt="QR Image"/>
			</div>}
			<div className="inputContent">
				<input type="text" id="code" onChange={e => {
					setQrData(e.target.value)
				}} className="inputArea" spellCheck="false" placeholder='Enter a Message...'/> <br/>
				<button className="GenBtn" onClick={generateQr}>Generate</button>
				<button className="DownBtn" onClick={downloadQR}>Download</button>
			</div>
		</div>
	)
}