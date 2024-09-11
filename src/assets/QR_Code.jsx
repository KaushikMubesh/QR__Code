import { createElement, useState } from "react";

export const QR_Code = () => {
  const [loading,setLoading]=useState(false);
  const [Img,setImg] =useState("");
  const [Link1,SetLink1]=useState("")
  const [Qr_size,setSize]=useState("")
  async function GenerateQR(){
    setLoading(true)
    console.log(Link1)
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${Qr_size}x${Qr_size}&data=${encodeURIComponent(Link1)}`;
      setImg(url);
    }
    catch(error){
      console.log("")
     
    }
    finally{
      setLoading(false)
    }
  }
  function DownloadQ_R(){
    fetch(Img)
    .then((Response)=>Response.blob())
    .then((blob)=>{
      const link=document.createElement("a")
      link.href=URL.createObjectURL(blob)
      link.download="Q_RCode.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    .catch((error)=>{
      console.log(error)
    })

  }
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col text-center w-[400px] mt-[250px]">
      <p className="text-[17px] mr-[70px] text-blue-500 border-slate-100 border-2 w-[160px] mb-3 ml-[80px] shadow-black">
        QR Code Generator
      </p>
      {Img&&<img src={Img} alt="" className=" w-[150px] h-[150px] ml-[85px] mb-3"/>}
      {loading && <p className="mr-[85px] text-[15px] mb-3">Loading..Please Wait</p>}
      <div className="flex flex-col gap-1 text-left">
      <label htmlFor="dataInput"  className="font-semibold text-blue-500 text-[13px] ml-[7px]" >Link for QR Code:</label>
      <input type="text" value={Link1} className="border-2 w-[330px] border-blue-500 rounded-[5px]" onChange={(e)=> SetLink1(e.target.value)} placeholder="QR Code (eg ***.in)"  />
      </div>
      <div className="flex flex-col gap-1 text-left  mt-2">
      <label htmlFor="dataInput" className="font-semibold  text-blue-500 text-[13px] ml-[7px]">Image Size:</label>
      <input type="text" value={Qr_size} className="border-2  w-[330px] border-blue-500 rounded-[5px]" onChange={(e)=>setSize(e.target.value)} placeholder="Size (eg 150)" />
      </div>
      <div className="flex flex-row gap-[20px] mt-5">
      <button className="border-2 w-[150px] ml-1 bg-yellow-500 text-slate-300 rounded-[10px]" onClick={GenerateQR}>Generate </button>
      <button className="border-2 w-[150px]  bg-green-700 text-slate-300 rounded-[10px]" onClick={DownloadQ_R}>Download</button>
      </div>
      <p className="text-[12px] mt-3 mr-[100px]">Designed by<a className="text-blue-500" href="https://github.com/KaushikMubesh"> Kaushik</a></p>
    </div>
    </div>
  )
}
