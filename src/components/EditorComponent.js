import React from 'react';
import '../Styles/Editor.css';
import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = ({ apiKey, initialValue, init, value, onSaveContent }) => {
  console.log(window.localStorage);
  return (
    <div className='editor-container'>
      <Editor
        apiKey={apiKey}
        initialValue={initialValue}
        init={init}
        value={value}
        onSaveContent={(e) => onSaveContent(e)}
      />
    </div>
  );
};
export default EditorComponent;
