import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import listMsg from '../styles/Home.module.scss';

export default function Sidebar(data) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(!data.user) {
      return;
    }
    fetch(`http://localhost:8080/customers/${data.user}/messages`)
      .then(res => res.json())
      .then(
        (result) => {
          setMessages(result);
          setLoading(false);
        }
      )
  }, [data.user]);

  const handleIsRead = async (id, messageId) => {
    console.log("in", messageId)
    await fetch(`http://localhost:8080/customers/${id}/messages/${messageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({read : true})
    });
  }
  
  return (
    <div className={listMsg.msgContainer}>
      {isLoading ? (
        <div className={listMsg.loader}></div>
      ) :
        <ul className={listMsg.listMsgs}>
            {messages.map(message => (
              <li className={`${listMsg.msg} ${message.read ? listMsg.msgRead : ""}`} key={message.id}> 
                <Link href={{
                  pathname:`/customers/[id]/messages/[messageId]`,
                  query: {
                    id: data.user,
                    messageId: message.id
                  }
                }}>
                  <a onClick={() => handleIsRead(data.user, message.id)}>
                    <div className={listMsg.msgGrid}>
                      <div>
                        <div className={`${listMsg[message.type]} ${listMsg.icon}`}></div>
                      </div>
                      <div className={listMsg.msgContent}>
                        <p className={listMsg.msgNames}>{message.contact.firstname} {message.contact.lastname}</p>
                        <p className={listMsg.msgResume}>{message.body}</p>
                      </div>
                      <div className={listMsg.msgDate}>
                        {new Date(message.date).toLocaleDateString("fr")}
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      }
    </div>
  )
}
