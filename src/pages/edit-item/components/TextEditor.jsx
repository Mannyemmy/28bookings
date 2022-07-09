import React, { useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";
import escapeHtml from "escape-html";
import { Text } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

import { jsx } from "slate-hyperscript";

const deserialize = (el, markAttributes = {}) => {
  if (el.nodeType === Node.TEXT_NODE) {
    return jsx("text", markAttributes, el.textContent);
  } else if (el.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const nodeAttributes = { ...markAttributes };

  // define attributes for text nodes
  switch (el.nodeName) {
    case "strong":
      nodeAttributes.bold = true;
  }

  const children = Array.from(el.childNodes)
    .map((node) => deserialize(node, nodeAttributes))
    .flat();

  if (children.length === 0) {
    children.push(jsx("text", nodeAttributes, ""));
  }

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children
      );
    default:
      return children;
  }
};

// const initialValue = [
//     {
//         type: 'paragraph',
//         children: [{ text: '' }],
//       },
// ];

const TextEditor = (props) => {
  const document = new DOMParser().parseFromString(
    props.description,
    "text/html"
  );

  const [initialValue, setInitialValue] = useState(deserialize(document.body));

  const serialize = (node) => {
    if (Text.isText(node)) {
      let string = escapeHtml(node.text);
      if (node.bold) {
        string = `<strong>${string}</strong>`;
      }
      return string;
    }

    const children = node.children.map((n) => serialize(n)).join("");

    switch (node.type) {
      case "quote":
        return `<blockquote><p>${children}</p></blockquote>`;
      case "paragraph":
        return `<p>${children}</p>`;
      case "link":
        return `<a href="${escapeHtml(node.url)}">${children}</a>`;
      default:
        return children;
    }
  };

  const handleText = (value) => {
    const text = value.map((node) => {
      return serialize(node);
    });
    props.onChangeText(text.join(""));
  };

  const [editor] = useState(() => withReact(createEditor()));
  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => handleText(value)}
    >
      <Editable />
    </Slate>
  );
};

export default TextEditor;
