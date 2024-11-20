import { useState, useEffect } from "react"
import { Textarea } from "flowbite-react"
import useFetch from "#root/hooks/useFetch"
import { sendRoomMessage } from "#root/api/room"

const MessageInput = ({ roomId, info: { isDisable } }) => {
    const [message, setMessage] = useState("")
    const [textareaHeight, setTextareaHeight] = useState("auto")
    const [dispatchSend, isSent, isLoading, error] = useFetch()

    const onEnter = () => {
        if (message) {
            dispatchSend(() => sendRoomMessage(roomId, { message }))
        }
    }

    useEffect(() => {
        if (isSent) {
            setMessage("")
        }
    }, [isSent])

    useEffect(() => {
        if (isDisable) {
            setMessage("")
        }
    }, [isDisable])

    useEffect(() => {
        const textarea = document.getElementById("message-input")
        if (textarea) {
            textarea.style.height = "auto"
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }, [message])

    return (
        <div className="flex gap-4 py-2 px-3 z-20 bg-stone-200 dark:bg-slate-800 relative">
            <Textarea
                id="message-input"
                aria-label="Type a message"
                className="bg-white dark:bg-slate-600 w-full overflow-hidden max-h-40"
                placeholder={isDisable ? "Chat closed" : "Type a message"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        onEnter()
                    }
                }}
                disabled={isDisable}
                rows={1}
                style={{ height: "auto", maxHeight: "10rem" }}
            />
            {error && (
                <p className="text-red-500 text-sm mt-2" role="alert">
                    Error sending message: {error}
                </p>
            )}
            {isLoading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                </div>
            )}
        </div>
    )
}

export default MessageInput
