import Header from './header';
import Sidebar from './sidebar';
import main from '../styles/Home.module.scss';

export default function Layout({ children }) {
  return (
    <div className={main.main}>
      <Header />
      {/* <Sidebar /> */}
      <main >{children}</main>
    </div>
  )
}