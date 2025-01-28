import React from 'react';
import {IMessage} from "../../types";

export interface Props {
    messages: IMessage[];
}

const MessageList: React.FC<Props> = ({messages}) => {
    return (
        <ul className="list-unstyled list-group text-start bg-success-subtle p-3">
            {messages.length === 0 ? (
                <p>No messages yet.</p>
            ) : (
                messages.map((msg) => (
                    <li className="m-3 p-3 border bg-white border-black rounded-1" key={msg._id}>
                        <strong>{msg.author}:</strong>
                        <hr/>
                        <p className="mt-3">{msg.message}</p>
                        <span>({new Date(msg.datetime).toLocaleString()})</span>
                    </li>
                ))
            )}
        </ul>
    );
};

export default MessageList;