import { currentUser } from "@clerk/nextjs/server";

import OrionpaxComponent from "@/components/OrionPax/orionpaxComponent";

export default async function HackNowPage({
  params,
}: {
  params: { problem_id: string };
}) {
  const problem_id = params.problem_id;
  const user = await currentUser();

  return (
    <div className="w-full gap-5">
      <h1 className="p-5 m-5 text-3xl font-light">{problem_id}</h1>
      <OrionpaxComponent />
    </div>
  );
}
