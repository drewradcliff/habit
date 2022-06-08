import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Button } from "./Button";

interface Props {
  onSubmit: () => void;
  description: string;
  trigger: React.ReactNode;
}

export default function AlertDialog({ onSubmit, description, trigger }: Props) {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>
        {trigger}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="bg-black fixed top-0 left-0 h-full w-full opacity-30" />
        <AlertDialogPrimitive.Content className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 w-[90vw] max-w-sm fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-lg">
          <AlertDialogPrimitive.Title className="dark:text-green-200 text-xl">
            Are you sure?
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="text-gray-400 dark:text-gray-300 text-sm mt-2">
            {description}
          </AlertDialogPrimitive.Description>
          <div className="flex justify-end mt-2">
            <AlertDialogPrimitive.Cancel asChild>
              <div className="mr-4">
                <Button intent="secondary">Cancel</Button>
              </div>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button onClick={onSubmit} intent="primary">
                Delete
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
