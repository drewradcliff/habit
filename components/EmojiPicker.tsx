import { useRef } from "react";
import dynamic from "next/dynamic";
import { IEmojiData } from "emoji-picker-react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface Props {
  picker: boolean;
  setPicker: (picker: boolean) => void;
  onEmojiClick: (e: React.MouseEvent, emojiObject: IEmojiData) => void;
}

export default function EmojiPicker({
  onEmojiClick,
  picker,
  setPicker,
}: Props) {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setPicker(false));

  return picker ? (
    <div ref={ref} className="absolute">
      <Picker onEmojiClick={onEmojiClick} pickerStyle={{ zIndex: "10" }} />
    </div>
  ) : null;
}
