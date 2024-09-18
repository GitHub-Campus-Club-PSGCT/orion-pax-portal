import { OrionPax } from "@/data/OrionPax";
import CompetitionPage from "@/components/competition/challengePage";

// CompetitionPageProps
//   challenge_id: string;
//   title: string;
//   date: string;
//   time: string;
//   description: string;
//   imageUrl: string;

export default function ChallengePage({
  params,
}: {
  params: { challenge_id: string };
}) {
  const challenge_id = params.challenge_id;
  //testing
  // const [title, setTitle] = useState<string>("");
  // const [date, setDate] = useState<string>("");
  // const [time, setTime] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [imageUrl, setImageUrl] = useState<string>("");

  // useEffect(() => {
  //   // TODO - Add the function that fetch the competition details from Supabase...
  // }, []);

  // return (
  //   <div>
  //     <CompetitionPage
  //       date={date}
  //       description={description}
  //       imageUrl={imageUrl}
  //       time={time}
  //       title={title}
  //     />
  //   </div>
  // );

  return (
    <div className="w-full">
      <CompetitionPage {...OrionPax.ChallengePage} />
    </div>
  );
}
