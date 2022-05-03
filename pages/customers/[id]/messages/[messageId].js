import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import msg from '../../../../styles/Home.module.scss';

export default function Sidebar() {
  const router = useRouter();
  const {id} = router.query;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute:'numeric' };

  // useEffect(() => {
  //   if(!id) {
  //     return;
  //   }
  //   fetch(`http://localhost:8080/customers/${id}/messages`)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setMessages(result);
  //         setLoading(false);
  //       }
  //     )
  // }, [messages]);
  
  // call API to get all messages
  useEffect(() => {
    const {id, messageId} = router.query;
    if(!id && !messageId) {
      return;
    }
    fetch(`http://localhost:8080/customers/${id}/messages/${messageId}`)
      .then(res => res.json())
      .then(
        (result) => {
          setMessage(result);
          setLoading(false);
        }
      )
  }, [id]);

  console.log("message", message)
  
  return (
    <div>
      {isLoading ? (
        <p>ça load</p>
      ) : message ? (
        <div className={msg.detailsMsg}>
          <Sidebar user={id} />
          <div className={msg.detailsMsgHeader}>
            <p className={msg.detailsMsgNames}>{message.contact.firstname} {message.contact.lastname}</p>
            <p className="customerMail">{message.contact.email}</p>
            <p className={msg.detailsMsgTel}>{message.contact.phone}</p>
          </div>
          <div className={msg.detailsMsgContainer}>
            <div className={msg.detailsMsgHead}>
              <div className={`${msg[message.type]} ${msg.icon}`}></div>
              <div className={msg.detailsMsgHeadInfos}>
                <p className={msg.detailsMsgNames}>{message.contact.firstname} {message.contact.lastname}</p>
                <p className={msg.detailsMsgEmail}>{message.contact.email}</p>
                <p className={msg.detailsMsgDate}>{new Date(message.date).toLocaleDateString("fr", options)}</p>
              </div>
            </div>
            <div className={msg.detailsMsgBody}>
              <p>{message.body}</p>
            </div>
          </div>
          <button className={msg.detailsMsgBackBtn} onClick={() => router.back()}>Revenir à la liste</button>
        </div>
        ) : (
          <p>Impossible d'afficher le message</p>
        )}
    </div>
  )
}