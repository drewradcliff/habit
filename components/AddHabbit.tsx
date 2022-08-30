import { PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { newHabit } from "../apis";
import Tooltip from "./Tooltip";
import { HabitResponse, EmojiData } from "../types";
import EmojiPicker from "./EmojiPicker";

export default function AddHabit() {
  const queryClient = useQueryClient();
  const [picker, setPicker] = useState(false);

  const onEmojiClick = (emojiObject: EmojiData) => {
    mutate({ text: emojiObject.native });
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
      <EmojiPicker
        picker={picker}
        setPicker={setPicker}
        onEmojiClick={onEmojiClick}
      />
    </>
  );
}
