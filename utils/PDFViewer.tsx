import { Viewer } from '@react-pdf-viewer/core'
import { Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

interface IProps {
  file: string
}

const PDFViewer = ({ file }: IProps) => {
  return (
    <>
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.8.335/legacy/build/pdf.worker.js'></Worker>
      <div className='w-full'>
        <Viewer fileUrl={file} />
      </div>
    </>
  )
}

export default PDFViewer