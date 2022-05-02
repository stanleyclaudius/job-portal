import { useRef } from 'react'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'

const container = [
  ['bold', 'italic', 'underline'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'align': [] }]
]

interface IProps {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

const Editor: React.FC<IProps> = ({ content, setContent }) => {
  const quillRef = useRef<typeof ReactQuill>(null)

  const modules = { toolbar: { container }}

  return (
    <div className='mt-3'>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={e => setContent(e)}
        value={content}
        // @ts-ignore
        ref={quillRef}
      />
    </div>
  )
}

export default Editor