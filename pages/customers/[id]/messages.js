import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import Sidebar from '../../../components/sidebar';
import listMsg from '../../../styles/Home.module.scss';

export default function Messages() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
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
  
  return (
    <>
      {isLoading ? (
        <div className={listMsg.loader}></div>
      ) : (
        <div>
          <Sidebar user={id} />
        </div>
      )}
    </>
  )
}