import Head from "next/head";
import AuthForms from "../modules/AuthForms";

export default function Home() {
  return (
    <div className="font-sans">
      <Head>
        <title>Authentication | emilohlund-git</title>
        <link rel="icon" href="/devchallenges.png" />
      </Head>
      <div className="flex flex-col justify-center items-center h-screen">
        <AuthForms />
      </div>
    </div>
  );
}
