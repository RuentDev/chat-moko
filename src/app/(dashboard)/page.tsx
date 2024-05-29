import { NextPage } from "next";
import { auth } from "../../auth";
const DashboardPage: NextPage = async () => {
  const session = await auth();

  return <div className="w-full h-full">{session ? JSON.stringify(session.user) : null}</div>;
};

export default DashboardPage;
