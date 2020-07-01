import { useState } from 'react';

const useEditor = () => {
  const [pageTitle, setPageTitle] = useState();
  const [content, setContent] = useState({ content: '' });

  const handlePageTitle = (e) => {
    console.log(e.target.value);
    setPageTitle(e.target.value);
  };

  const handleEditorChange = (content, editor) => {
    console.log(content);
    setContent({ content });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title: pageTitle, content: content.content });
  };
  return [pageTitle, content, handlePageTitle, handleEditorChange, handleSubmit];
};

export default useEditor;
