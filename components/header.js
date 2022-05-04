import header from '../styles/Home.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

export default function Header(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [adminInfos, setAdminInfos] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const {id, messageId} = router.query;
  const isDesktop = useMediaQuery({query: '(min-width: 1024px)'})

  function toggleMenu(){
    setShowMenu(!showMenu);
  }

  // get all admins for the menu
  useEffect(() => {
    if(!id) {
      return;
    }
    fetch(`http://localhost:8080/customers/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setAdminInfos(result);
          setLoading(false);
          setShowMenu(false);
        }
      )
  }, [id, messageId]);

  return (
    <>
      <header className={header.header}>
        <div className={header.columns}>
          <div className={header.columnLeft}>
            <div className={header.logoContainer}>
              <p className={header.logoText}>ADMIN Customers</p>
              <h1 className={header.logo}>WETHENEW</h1>
            </div>
            {adminInfos ?
              <div className={header.newMsgContainer}>
                <span className={header.newMsgIcon}></span>
                {isLoading ? (
                    <div className={listMsg.loader}></div>
                  ) : (
                    <p className={header.newMsgNumber}>{ adminInfos.unread_messages }</p>
                  )}
              </div>
            : null }
          </div>
          <div className={header.columnRight}>
            <div className={header.admin} onClick={toggleMenu}>
              <div className={header.adminLetter}>A</div>
              <i className={header.arrow}></i>
              {adminInfos && isDesktop ? <p className={header.adminNameDesktop}>{ adminInfos.name }</p> : null}
            </div>
            <ul className={header.admins} style={{display: showMenu?"block":"none"}}>
              {props.admins.map(admin => (
                <li key={admin.name} className={header.admin}>
                  <Link href={`/customers/${admin.id}/messages/`}>
                    <a className={header.adminLink}>
                      <Image src={admin.avatar} className={header.adminAvatar} alt="admin.name" width={32} height={32}/>
                      <p className={header.adminName}>{admin.name}</p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className={header.headerText}>Gestion des messages clients</p>
      </header>
    </>
  )
}
