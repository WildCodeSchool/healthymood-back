import React from 'react';
import '../Styles/Editor.css';
import { Editor } from '@tinymce/tinymce-react';
import { Input } from 'antd';

const EditorComponent = () => {
    return (
        <div className='editor-container'>
            <Input className='editor-title' size='large' placeholder='Titre' />
            <Editor
                apiKey='amntzl33pmjmf0hj96f03mr21hnr3lwuxt2dry7jsxi2wjdx'
                initialValue='<p>This is the initial content of the editor</p>'
                init={{
                    autosave_interval: '2s',
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor blockquote | alignleft aligncenter alignright alignjustify | link image media | bullist numlist outdent indent | removeformat | help'
                }}
            />
        </div>
    )
}
export default EditorComponent;