export type OrionPax = typeof OrionPax;

export const OrionPax = {
  CompetitionCard: {
    title: "OrionPax",
    date: "2024-09-19",
    type: "Debugging and Optimisation",
    imageUrl: "/OrionPax.webp",
    redirect: "/competition/challenge/orionpax",
  },
  ChallengePage: {
    title: "OrionPax: Debugging and Optimisation Challenge",
    date: "2024-09-19",
    time: "16:30:00",
    description: `
      In this competition, participants will face a series of increasingly complex coding puzzles designed to test their skills in identifying and fixing bugs, as well as optimizing code for better performance.

      Key Challenge Areas:
      1. HTML/CSS Debugging: Identify and fix issues in web layouts and styles.
      2. API Optimisation: This is where you will be given an API and then you have to optimize it and build it further...

      Are you ready to prove your debugging prowess and optimization skills? Join us for a day of intense coding challenges and emerge as the ultimate problem-solver!
    `,
    imageUrl: "/OrionPax.webp", // Assuming a different image for the challenge page
    rounds: [
      {
        name: "Round 1: Web Layout Fixer",
        description:
          "Identify and correct issues in HTML and CSS to match the provided design.",
        duration: "60 minutes",
      },
      {
        name: "Round 2: FastAPI Optimizations",
        description:
          "Optimize the provided FastAPI code to improve performance and scalability.",
        duration: "60 minutes",
      },
    ],
    prizes: [
      {
        place: "1st",
        reward: "Direct Inclusion in top club projects of their choice",
      },
      {
        place: "2nd",
        reward: "Chance to skip to the final stage of the recruitment process",
      },
      {
        place: "3rd",
        reward: "Chance to skip to the final stage of the recruitment process",
      },
    ],
    eligibility:
      "Open to all 2nd and 3rd year students from the Computer Science department.",
    registrationDeadline: "2024-09-15",
    contactEmail: "githubcampusclubpsgct@gmail.com",
    buttonRedirect: "hacknow/OrionPax",
  },
};
