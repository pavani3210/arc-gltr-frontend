import './App.css';
import React from 'react'
import IllinoisLOGO from './images/illinois-tech-with-seal.svg'
import Upload from './images/upload.svg'

export default function Main(props) {
    const [selectedFiles, setSelectedFiles] = React.useState(undefined);

    const uploadFiles = () => {
        fetchData('http://127.0.0.1:5004/api/analyze/', selectedFiles);
    }

    async function fetchData(url, attachments) {
        try {
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("attachments", selectedFiles[i]);
            }

            const response = await fetch(url, {
            method: "POST",
            body: formData,
            headers:{
                'Content-Type': 'multipart/form-data'
            }
            });
            const json = await response.json();
        } catch (err) {
            console.log(err)
        }
    }


    const selectFiles = (event) => {
        setSelectedFiles(event.target.files)
    }

    React.useEffect(() => {

    }, [])

    return(
        <>
            <div className='container'>
                <div className='card'>
                    <h2 className='m-0'>Upload your files</h2>
                    <p  className='m-0' style={{color:"#C4C4C4", marginTop:"5px"}}>File should be txt, docx, doc, pdf</p>
                    <label className="btn btn-default p-0">
                        <input style={{display:"none"}} type="file" multiple onChange={selectFiles} accept=".doc, .docx,.txt,.pdf"/>
                        <div className='card-inner' style={{fontSize:"14px", paddingTop:"24px"}} multiple onChange={selectFiles} accept=".doc, .docx,.txt,.pdf"  >
                            <img style={{color:"#6696F1"}} width="100px" src={Upload} alt='upload'/>
                            <p  className='m-0' style={{color:"#C4C4C4", marginTop:"5px"}}>Click here to upload</p>
                        </div>
                    </label>
                    { false && <div style={{display: "flex"}}>
                        <p style={{color: "#C4C4C4", fontWeight: "600"}}>Uploading files..</p>
                    </div>}
                    <div>
                         <button
                            style={{marginTop: "10px"}}
                            disabled={!selectedFiles}
                            onClick={uploadFiles}
                            >
                            Upload
                        </button>
                    </div>
                    <div style={{paddingTop:"20px"}}>
                        <img src={IllinoisLOGO} alt="illinois tech" width="200px"/>
                    </div>
                </div>
            </div>
        </>
    );
}