import "../css/index.css";
import Head from "next/head";
import Layout from "@components/layout";
import { makeStore } from '../store'
import { Provider } from "react-redux";

const store = makeStore()

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Provider store = {store}>
        <Head>
          <title> FINU </title>
          <meta
            name="Description"
            content="FINU Landing Page"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default MyApp;
