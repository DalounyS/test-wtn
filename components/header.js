import header from '../styles/Home.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [admins, setAdmins] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [adminInfos, setAdminInfos] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const {id} = router.query;

  function toggleMenu(){
    setShowMenu(!showMenu);
  }
  // call API
  useEffect(() => {
    fetch("http://localhost:8080/customers/")
      .then(res => res.json())
      .then(
        (result) => {
          setAdmins(result);
        }
      )
  }, [])

  const handleShowMessage = (id) => {
    if(!id) {
      return;
    }
    fetch(`http://localhost:8080/customers/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setAdminInfos(result);
          setLoading(false);
          setShowMenu(!showMenu)
        }
      )
  };

  console.log(adminInfos)

  return (
    <>
      <header className={header.header}>
        <div className={header.columns}>
          <div className={header.columnLeft}>
            <div className={header.logoContainer}>
              <p className={header.logoText}>ADMIN Customers</p>
              <p className={header.logo}>WETHENEW</p>
            </div>
            <div className={header.newMsgContainer}>
              <span className={header.newMsgIcon}></span>
              {isLoading ? (
                  <p>load</p>
                ) : (
                  <p className={header.newMsgNumber}>{ adminInfos.unread_messages }</p>
                )}
            </div>
          </div>
          <div className={header.columnRight}>
            <div onClick={toggleMenu}>
              <div className={header.adminLetter}>A</div>
              <i className={header.arrow}></i>
            </div>
            <ul className={header.admins} style={{display: showMenu?"block":"none"}}>
              {admins.map(admin => (
                <li key={admin.name} className={header.admin}>
                  <Link href={`/customers/${admin.id}/messages/`}>
                    <a className={header.adminLink}>
                      <Image src={admin.avatar} className={header.adminAvatar} alt="admin.name" width={32} height={32}/>
                      <p className={header.adminName}>{admin.name}</p>
                    </a>
                  </Link>
                  {/* <button className={header.adminLink} onClick={() => handleShowMessage(admin.id)}>
                    <a className={header.adminLink}>
                      <Image src={admin.avatar} className={header.adminAvatar} alt="admin.name" width={32} height={32}/>
                      <p className={header.adminName}>{admin.name}</p>
                    </a>
                  </button> */}
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
