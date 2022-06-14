import { useState } from "react";
import { IEmojiData } from "emoji-picker-react";
import { useMutation, useQueryClient } from "react-query";
import { updateHabit } from "../apis";
import { HabitResponse } from "../types/indext";
import EmojiPicker from "./EmojiPicker";

interface Props {
  habit: HabitResponse;
}

export default function ListItemEmoji({ habit }: Props) {
  const [picker, setPicker] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateHabit, {
    onMutate: async (habit) => {
      await queryClient.cancelQueries("habits");
      const previousValue = queryClient.getQueryData<HabitResponse[]>("habits");
      if (previousValue) {
        queryClient.setQueryData(
          "habits",
          previousValue.map((prevHabit) => {
            if (prevHabit.id === habit.id) return habit;
            else {
              return prevHabit;
            }
          })
        );
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

  const onEmojiClick = (e: React.MouseEvent, emojiObject: IEmojiData) => {
    mutate({
      id: habit.id,
      userId: habit.userId,
      createdAt: habit.createdAt,
      text: emojiObject.emoji,
    });
    setPicker(false);
  };

  return (
    <>
      <label
        onClick={() => setPicker(true)}
        className="w-[36px] text-center mr-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-900 rounded"
      >
        {habit.text}
      </label>
      <EmojiPicker
        picker={picker}
        setPicker={setPicker}
        onEmojiClick={onEmojiClick}
      />
    </>
  );
}
