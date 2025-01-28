import './App.css'
import {IMessage} from "./types";
import {useEffect, useState} from "react";
import MessageList from "./components/MessageList/MessageList.tsx";
import MessageForm from "./components/MessageForm/MessageForm.tsx";

const App = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [lastDatetime, setLastDatetime] = useState<string>();
    const [newMessage, setNewMessage] = useState("");
    const [author, setAuthor] = useState("User");


    const fetchMessages = async (datetime?: string): Promise<void> => {
        try {
            const url = datetime
                ? `http://146.185.154.90:8000/messages?datetime=${datetime}`
                : 'http://146.185.154.90:8000/messages';
            const response = await fetch(url);
            const data: IMessage[] = await response.json();

            setMessages((prevState) =>
                Array.from(new Map([...data, ...prevState].map((msg) => [msg._id, msg])).values())
            );

            if (data.length > 0) {
                setLastDatetime(data[data.length - 1].datetime);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sendMessage = async (): Promise<void> => {
        if (!newMessage.trim()) return;

        try {
            await fetch("http://146.185.154.90:8000/messages", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message: newMessage, author}),
            });
            setNewMessage("");
            await fetchMessages();
        } catch (error) {
            console.error(error);
        }
    };

        useEffect(() => {
            fetchMessages();
            const interval = setInterval(() => {
                if (lastDatetime) {
                    fetchMessages(lastDatetime);
                }
            }, 3000);

            return () => clearInterval(interval);
        }, [lastDatetime]);

        return (
            <>
                <div className="container align-items-center text-center">
                    <h1 className="mt-4 bg-success-subtle p-2 mb-4">Chat!!</h1>
                    <hr/>
                    <div className="p-4">
                        <MessageForm
                            author={author}
                            message={newMessage}
                            onAuthorChange={setAuthor}
                            onMessageChange={setNewMessage}
                            onSendMessage={sendMessage}
                        />

                        <div className="mt-5">
                            <h4 className="text-start">Messages</h4>
                            <div>
                                <MessageList messages={messages}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    };
export default App;