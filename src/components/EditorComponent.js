import React from 'react';
import '../Styles/Editor.css';
import { Editor } from '@tinymce/tinymce-react';
import { Input, Button } from 'antd';

const EditorComponent = () => {
  return (
    <div className='editor-container'>
      <Input className='editor-title' size='large' placeholder='Ajouter un titre' />
      <Editor
        apiKey={process.env.REACT_APP_API_KEY}
        initialValue="<p>This is the initialorem Ipsum is simply
                            dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived
                        not only five centuries, but also the leap into electronic
                        typesetting, remaining essentially unchanged. It was popularised in
                        the 1960s with the release of Letraset sheets containing Lorem
                        Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsu content of the editor</p>"
        init={{
          height: 500,

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
      <Button className='editor-button' size='large'>Ajouter</Button>
    </div>
  );
};
export default EditorComponent;
