import { title } from "@/components/primitives";

export default function HackNowPage({
  params,
}: {
  params: { problem_id: string };
}) {
  const problem_id = params.problem_id;
  return (
    <div>
      <h1 className={title()}>HackNowPage {problem_id}</h1>
    </div>
  );
}
