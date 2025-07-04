import ReactHtmlParser from "react-html-parser";

const RichText = ({ content, className }) => {
  return content ? (
    <div className={className}>{ReactHtmlParser(content)}</div>
  ) : null;
};

export default RichText;
