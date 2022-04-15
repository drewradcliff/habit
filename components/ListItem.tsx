import { XIcon } from "@heroicons/react/outline";

interface Props {
  text: string;
  checked: boolean;
  id: number;
  handleCheck: (id: number, checked: boolean) => void;
  handleDelete: (id: number) => void;
}

export default function ListItem({
  text,
  checked,
  id,
  handleCheck,
  handleDelete,
}: Props) {
  // const handleCheck = (id: number, checked: boolean) => {
  //   let newList = list.map((item) => {
  //     return item.id === id ? { ...item, checked } : item;
  //   });
  //   setList(newList);
  // };

  return (
    <div className="flex items-center p-2 text-3xl group relative">
      <p className="w-[36px] text-center mr-2">{text}</p>
      <input
        className="w-6 h-6 mr-2"
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck(id, !checked)}
      />
      <div
        className="w-6 h-6 absolute left-[85px]"
        onClick={() => handleDelete(id)}
      >
        <XIcon className="group-hover:block hidden hover:cursor-pointer dark:text-gray-100 hover:text-green-300" />
      </div>
    </div>
  );
}
