import { useState } from 'react';

const useEditor = () => {
  const [content, setContent] = useState({ content: '' });

  const handleEditorChange = (content, editor) => {
    console.log(content);
    setContent({ content });
  };
  return [content, handleEditorChange];
};

export default useEditor;
