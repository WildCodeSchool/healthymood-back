import React from 'react';
import '../Styles/Editor.css';
import { Editor } from '@tinymce/tinymce-react';
import { Input, Button } from 'antd';

const EditorComponent = ({ pageTitle, onPageTitleChange, apiKey, initialValue, init, value, onEditorChange, onClick }) => {
  return (
    <div className='editor-container'>
      <Input onChange={(e) => onPageTitleChange(e)} value={pageTitle} className='editor-title' size='large' placeholder='Ajouter un titre' />
      <Editor
        apiKey={apiKey}
        initialValue={initialValue}
        init={init}
        value={value}
        onEditorChange={(e) => onEditorChange(e)}
      />
      <Button type='submit' onClick={onClick} className='editor-button' size='large'>Ajouter</Button>
    </div>
  );
};
export default EditorComponent;
