import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import msg from '../../../../styles/Home.module.scss';
import Sidebar from '../../../../components/sidebar';
import { useMediaQuery } from 'react-responsive';

export default function Message() {
  const router = useRouter();
  const [message, setMessage] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute:'numeric' };
  const {id, messageId} = router.query;

  const isDesktop = useMediaQuery({query: '(min-width: 1024px)'})
  
  // call API to get detail message
  useEffect(() => {
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
  }, [messageId]);
  
  return (
    <div>
      {isLoading ? (
        <div className={msg.loader}></div>
      ) : message ? (
        <div className={msg.detailsMsg}>
          {isDesktop && <Sidebar user={id} />}
          <div className={msg.detailsMsgContent}>
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
          </div>
          {!isDesktop && <div className={msg.btnContainer}><button className={msg.detailsMsgBackBtn} onClick={() => router.back()}>Revenir à la liste</button></div>}
        </div>
        ) : (
          <div className={msg.detailsMsg}>
            {isDesktop && <Sidebar user={id} />}
            <div className={msg.detailsMsgContent}>
              <p>Impossible d'afficher le message</p>
            </div>
          </div>
        )}
    </div>
  )
}