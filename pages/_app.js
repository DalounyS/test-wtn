import '../styles/globals.css';
import Layout from '../components/Layout';
import { NewContextProvider } from "../context/state";

export default function MyApp({ Component, pageProps }) {
  return (
    <NewContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NewContextProvider>
  )
}