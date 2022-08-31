import { useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import data from "@emoji-mart/data";
// @ts-ignore no typescript support
import Picker from "@emoji-mart/react";
import { EmojiData } from "../types";

interface Props {
  picker: boolean;
  setPicker: (picker: boolean) => void;
  onEmojiClick: (emojiObject: EmojiData) => void;
}

export default function EmojiPicker({
  onEmojiClick,
  picker,
  setPicker,
}: Props) {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setPicker(false));

  return picker ? (
    <div
      ref={ref}
      className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Picker data={data} onEmojiSelect={onEmojiClick} />
    </div>
  ) : null;
}
