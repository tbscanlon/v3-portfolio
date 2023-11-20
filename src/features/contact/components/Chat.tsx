import { useEffect, useRef } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import { $isChatVisible } from "../lib/chatToggle";

const Chat = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isVisible = useStore($isChatVisible);

  useEffect(() => {
    if (isVisible) {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.close();
    }
  });

  return (
    <dialog ref={dialogRef} className="bg-red-dark fixed z-50 bottom-0">
      hello lol
    </dialog>
  );
};

export default Chat;
