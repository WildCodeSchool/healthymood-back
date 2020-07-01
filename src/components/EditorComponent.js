import React from 'react';
import '../Styles/Editor.css';
import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = ({ apiKey, initialValue, init, value, onEditorChange }) => {
  return (
    <div className='editor-container'>
      <Editor
        apiKey={apiKey}
        initialValue={initialValue}
        init={init}
        value={value}
        onEditorChange={(e) => onEditorChange(e)}
      />
    </div>
  );
};
export default EditorComponent;
