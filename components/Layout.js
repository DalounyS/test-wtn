import Header from './header';
import Sidebar from './sidebar';
import main from '../styles/Home.module.scss';
import { useContext } from "react";
import { NewContext } from "../context/state";

export default function Layout({ children }) {
  const content = useContext(NewContext);
  console.log("NewContext", content)
  return (
    <div className={main.main}>
      <Header admins={content} />
      <main >{children}</main>
    </div>
  )
}