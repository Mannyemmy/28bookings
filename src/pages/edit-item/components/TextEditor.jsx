import React, { useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";
import escapeHtml from 'escape-html'
import { Text } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
      },
];

const TextEditor = (props) => {

    const serialize = (node) => {
       
        if (Text.isText(node)) {
          let string = escapeHtml(node.text)
          if (node.bold) {
            string = `<strong>${string}</strong>`
          }
          return string
        }
      
        const children = node.children.map(n => serialize(n)).join('')

        

        switch (node.type) {
          case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`
          case 'paragraph':
            return `<p>${children}</p>`
          case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
          default:
            return children
        }
      }

      const handleText =(value)=>{
            const text = value.map(node => {
                
                return serialize(node)
            })
            props.onChangeText(text.join(""));
      }

  const [editor] = useState(() => withReact(createEditor()));
  return (
    <Slate editor={editor} value={initialValue} onChange={(value) =>handleText(value)}>
      <Editable />
    </Slate>
  );
};

export default TextEditor;
