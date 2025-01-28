import React from 'react';

export interface Props {
    author: string;
    message: string;
    onAuthorChange: (author: string) => void;
    onMessageChange: (message: string) => void;
    onSendMessage: () => void;
}

const MessageForm: React.FC<Props> = ({
        author,
        message,
        onSendMessage,
        onAuthorChange,
        onMessageChange,}) => {

    return (
        <div className="mb-4 row justify-content-between">
            <input
                type="text"
                value={author}
                onChange={(e) => onAuthorChange(e.target.value)}
                placeholder="Your name"
                className="border p-2 d-inline-block"
            />
            <input
                type="text"
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                placeholder="Type a message"
                className="border p-2 mr-2 d-inline-block"
            />
            <button
                onClick={onSendMessage}
                className="btn btn-primary p-2 d-inline-block"
            >Send</button>
        </div>
    );
};

export default MessageForm;