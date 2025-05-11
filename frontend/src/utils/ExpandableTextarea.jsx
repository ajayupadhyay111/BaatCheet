import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea"; // Assuming you're using shadcn/ui

export function ExpandableTextarea({ placeholder, text, setText }) {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // reset height
    textarea.style.height = textarea.scrollHeight + "px"; // set to scrollHeight
  };

  return (
    <Textarea
      ref={textareaRef}
      placeholder={placeholder}
      className="resize-none overflow-hidden md:w-[370px] break-words"
      onInput={handleInput}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
