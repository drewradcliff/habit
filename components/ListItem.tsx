import { useState } from "react";
import dynamic from "next/dynamic";
import { XIcon, PlusIcon } from "@heroicons/react/outline";
import { IEmojiData } from "emoji-picker-react";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface Props {
  text: string;
  checked: boolean;
  id: string;
  index: number;
  handleCheck: (id: string, checked: boolean) => void;
  handleDelete: (id: string) => void;
  handleNew: (index: number, emoji: string) => void;
}

export default function ListItem({
  text,
  checked,
  id,
  index,
  handleCheck,
  handleDelete,
  handleNew,
}: Props) {
  const [picker, setPicker] = useState(false);

  const onEmojiClick = (e: React.MouseEvent, emojiObject: IEmojiData) => {
    handleNew(index, emojiObject.emoji);
    setPicker(false);
  };

  return (
    <div
      key={id}
      className="flex items-center p-2 text-3xl hover:outline outline-gray-200 group rounded-md box-content"
    >
      <div className="w-6 h-6" onClick={() => setPicker(true)}>
        <PlusIcon className="group-hover:block hidden hover:cursor-pointer text-gray-500" />
      </div>
      <p className="w-[36px] text-center mr-2">{text}</p>
      <input
        className="w-6 h-6 mr-2"
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck(id, !checked)}
      />
      <div className="w-6 h-6" onClick={() => handleDelete(id)}>
        <XIcon className="group-hover:block hidden hover:cursor-pointer text-gray-500" />
      </div>
      {picker && (
        <div className="absolute">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
}
