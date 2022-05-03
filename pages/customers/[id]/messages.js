import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '../../../components/sidebar';
import listMsg from '../../../styles/Home.module.scss';

export default function Messages() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {id} = router.query;

  useEffect(() => {
    if(!id) {
      return;
    }
    fetch(`http://localhost:8080/customers/${id}/messages`)
      .then(res => res.json())
      .then(
        (result) => {
          setMessages(result);
          setLoading(false);
        }
      )
  }, [router]);

  const handleIsRead = async (id, messageId, value) => {
    await fetch(`http://localhost:8080/customers/${id}/messages/${messageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({read : value})
    });
  }

  const handleShowMessage = (id, messageId) => {
    fetch(`http://localhost:8080/customers/${id}/messages/${messageId}`)
      .then(response => console.log(response))
      .then(
        (result) => {
          setMessage(result);
          setLoading(false);
        }
      );
  };
  
  return (
    <div className={listMsg.msgContainer}>
      {isLoading ? (
        <p>ça load</p>
      ) : (
        <div>
          <Sidebar user={id} />
        </div>
      )}
    </div>
  )
}