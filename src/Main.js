import './App.css';
import React from 'react'
import IllinoisLOGO from './images/illinois-tech-with-seal.svg'
import Upload from './images/upload.svg'
import DocIcon from './images/doc.png'
import PdfIcon from './images/pdf.png'

export default function Main(props) {
    const [selectedFiles, setSelectedFiles] = React.useState(undefined);

    const uploadFiles = () => {
        fetchData('http://127.0.0.1:5001/upload', selectedFiles);
    }

    async function fetchData(url, attachments) {
        try {
            var formData = new FormData();
            // for (let i = 0; i < attachments.length; i++) {
            //     formData.append("file", attachments[i]);
            //     formData.append('filename', "test.docx");
            // }
            formData.append("file", attachments[0]);
            formData.append('filename', "test.docx");
            const response = await fetch(url, {
            method: 'POST',
            body: formData
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
                        <div className='card-inner' style={{fontSize:"14px"}} multiple onChange={selectFiles} accept=".doc, .docx,.txt,.pdf"  >
                            <img style={{color:"#6696F1"}} width="50px" src={Upload} alt='upload'/>
                            <p  className='m-0' style={{color:"#C4C4C4", marginTop:"5px"}}>Click here to select photos</p>
                        </div>
                    </label>
                    { false && <div style={{display: "flex"}}>
                        <p style={{color: "#C4C4C4", fontWeight: "600"}}>Uploading files..</p>
                    </div>}
                    <div>
                        {
                            selectedFiles && selectedFiles.length > 0 && (
                                <div>
                                    <p style={{color: "#C4C4C4", fontWeight: "600"}}>Selected files:</p>
                                        {Array.from(selectedFiles).map((file, index) => (
                                            <>
                                                <div style={{display: "flex", alignItems:"center",  background: "#ebebeb", padding: "5px", marginBottom: "1px"}}>
                                                    <img style= {{paddingRight:"10px"}}src = {PdfIcon} width="30px" alt="pdf"/>
                                                    {file.name}
                                                </div>
                                            </>
                                        ))}
                                </div>
                            )
                        }
                    </div>
                    <div>
                         <button
                         className='button'
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