import './App.css'
import {IMessage} from "./types";
import {useEffect, useState} from "react";
import MessageList from "./components/MessageList/MessageList.tsx";

const App = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [lastDatetime, setLastDatetime] = useState<string>();


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
            console.error('Error fetching messages:', error);
        }
    };


    useEffect(() => {
        fetchMessages(); // Initial fetch
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
          <form className="row mt-5">
              <div className="w-75">
                  <input
                  type="text"
                  className="form-control border-black"
                  placeholder="What's up?"
                  />
              </div>
              <button
              type="submit"
              className="btn btn-primary w-25"
              >Send</button>
          </form>
          <div className="mt-5">
              <h4 className="text-start">Messages</h4>
              <div>
                  <MessageList messages={messages} />
              </div>
          </div>
      </div>
    </>
  )
};

export default App
