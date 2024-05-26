import { NextPage } from "next";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
const DashboardPage: NextPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return <div className="w-full h-full">{session.user.name}</div>;
};

export default DashboardPage;
