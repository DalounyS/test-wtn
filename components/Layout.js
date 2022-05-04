import Header from './header';
import main from '../styles/Home.module.scss';
import { useContext } from "react";
import { NewContext } from "../context/state";

export default function Layout({ children }) {
  const content = useContext(NewContext);
  return (
    <div>
      <Header admins={content} />
      <main className={main.main}>{children}</main>
    </div>
  )
}