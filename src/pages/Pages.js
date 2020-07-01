import React from 'react';
import EditorComponent from '../components/EditorComponent';
import useEditor from '../hooks/useEditor';

const Pages = () => {
  const [pageTitle, content, handlePageTitle, handleEditorChange, handleSubmit] = useEditor('/generic_pages');
  return (
    <div>
      <h1>Pages</h1>
      <EditorComponent
        pageTitle={pageTitle}
        onPageTitleChange={(e) => handlePageTitle(e)}
        apiKey={process.env.REACT_APP_API_KEY}
        initialValue=''
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
        value={content}
        onEditorChange={(e) => handleEditorChange(e)}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Pages;
