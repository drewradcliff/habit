import dynamic from "next/dynamic";
import { PlusIcon } from "@heroicons/react/outline";
import { IEmojiData } from "emoji-picker-react";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { newHabit } from "../apis";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import Tooltip from "./Tooltip";
import { HabitResponse } from "../types/indext";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export default function AddHabit() {
  const queryClient = useQueryClient();
  const [picker, setPicker] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setPicker(false));

  const onEmojiClick = (e: React.MouseEvent, emojiObject: IEmojiData) => {
    mutate({ text: emojiObject.emoji });
    setPicker(false);
  };

  const { mutate } = useMutation(newHabit, {
    onMutate: async (habit) => {
      await queryClient.cancelQueries("habits");
      const previousValue = queryClient.getQueryData<HabitResponse[]>("habits");
      if (previousValue) {
        queryClient.setQueryData("habits", [...previousValue, habit]);
      }
      return { previousValue };
    },
    onError: (err, newHabit, context: any) => {
      queryClient.setQueryData("habits", context.previousValue);
    },
    onSettled: () => {
      queryClient.invalidateQueries("habits");
    },
  });

  return (
    <>
      <button onClick={() => setPicker(true)} className="hover:text-green-300">
        <Tooltip content="Add new habit">
          <PlusIcon className="w-6 h-6 m-4" />
        </Tooltip>
      </button>
      {picker && (
        <div ref={ref} className="absolute">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </>
  );
}
