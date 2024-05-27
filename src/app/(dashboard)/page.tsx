import { NextPage } from "next";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
const DashboardPage: NextPage = async () => {
  const session = await auth();

  console.log(session)

  if (session) {
    const {user } = session
    if(user && !user.emailVerified){
      redirect("/auth");
    }
  }else{
    redirect("/auth/login");
  }

  return <div className="w-full h-full">{session.user.name}</div>;
};

export default DashboardPage;
