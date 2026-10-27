import type { CaseStudy } from "./types";

// Copy taken from the Framer case study page plus the research facts in the build
// brief. Lines marked TODO(verify) were not on the Framer page and need a check.
export const planIt: CaseStudy = {
  slug: "plan-it",
  title: "Plan-It – Group Planning Inside WhatsApp",
  year: "2025",
  tagline:
    "Group plans live and die in the chat. Instead of building another app nobody would download, we added planning to the one people already use.",
  meta: "2025 · UX Research · Mobile App · Interaction Design",
  scene: "planit",
  chapters: {
    overview: [
      {
        type: "figure",
        // TODO: swap for the colour hero illustration used on the Framer page.
        figure: {
          src: "/projects/plan-it.png",
          alt: "Illustration of four friends planning together in a living room",
          aspect: "16/10",
          position: "center 60%",
        },
      },
      {
        type: "facts",
        items: [
          { label: "Year", value: "2025" },
          { label: "Platform", value: "WhatsApp-integrated prototype" },
          { label: "Focus", value: "Mobile App · Interaction Design" },
          { label: "Methods", value: ["Survey", "User Interviews", "Experience Mapping", "Usability Testing"] },
        ],
      },
    ],
    problem: [
      {
        type: "text",
        body: "Group planning happens in messaging apps, but those apps have no structure for it. Decisions get buried in long threads, information scatters across Maps, Instagram, and Airbnb, and one person quietly ends up doing all the coordination.",
      },
      {
        type: "stats",
        items: [
          { value: "4/4", label: "interview participants named WhatsApp as the primary place planning happens" },
          { value: "5+", label: "separate apps used to coordinate a single trip: chat, maps, social, bookings, expenses" },
        ],
      },
      {
        type: "hmw",
        body: "How might we bring structure to group planning without pulling people out of the conversation where it already happens?",
      },
    ],
    role: [
      {
        // TODO(verify): role wasn't stated on the Framer page — this was a team project ("we").
        type: "text",
        body: "Team project. I worked across the research, concept development, prototyping, and usability testing.",
      },
    ],
    process: [
      {
        type: "tags",
        label: "Methods",
        items: [
          "Literature Review",
          "Competitive Analysis",
          "Survey",
          "User Interviews",
          "Experience Mapping",
          "Affinity Mapping",
          "Usability Testing",
        ],
      },
      {
        type: "text",
        body: "Secondary research drew on five sources spanning adjacent problem spaces: CamPlan's approach to shared trip logistics, research on redesigning peer-to-peer payment flows, OutWithFriendz's group-decision mechanics, and Trip Planner for Groups' coordination patterns, to understand how other tools balance individual input against group consensus. Competitive analysis looked at Wanderlog and PlanApple, both of which solve coordination by pulling users into a dedicated planning app, a choice that became the key point of contrast once the team's own research pointed a different direction. A survey of 10 respondents and 4 follow-up interviews grounded that secondary research in how this group actually plans, mostly inside existing WhatsApp threads, rather than assuming the dedicated-app pattern was the right starting point.",
      },
      {
        type: "stats",
        items: [
          { value: "n=10", label: "survey responses" },
          { value: "4", label: "user interviews" },
          { value: "3", label: "early concepts explored" },
        ],
      },
      // Findings (formerly its own chapter), unchanged wording.
      {
        type: "insights",
        label: "What I learned",
        items: [
          {
            body: "Nobody wanted another planning app. Every participant said they'd rather have structure inside the chat they already use than adopt a new tool.",
          },
          {
            body: "Roles emerge rather than get assigned. One person becomes the de facto organizer by taking initiative, then carries the bookings, reminders, and payments alone.",
          },
          {
            body: "Money is the emotionally loaded part. Participants wanted expense splitting to be convenient but not public: no callouts, no visible ledger of who owes whom.",
          },
        ],
      },
      {
        type: "figure",
        figure: {
          src: "/projects/plan-it/process-affinity-map.png",
          alt: "Affinity map clusters grouping findings into Kickoff/Origin, Messy Middle/Coordination, and Finalization/Booking",
          caption: "Affinity map",
          aspect: "624/574",
          fit: "contain",
          maxWidth: "640px",
          inset: true,
        },
      },
      {
        type: "figure",
        figure: {
          src: "/projects/plan-it/process-experience-map.png",
          alt: "Experience map of group trip planning across pre-planning, planning, during the event, post planning, and reflection, covering actions, touchpoints, pain points, emotions, and opportunities",
          caption: "Experience map",
          aspect: "624/617",
          fit: "contain",
          maxWidth: "640px",
          inset: true,
        },
      },
    ],
    solution: [
      {
        // Moved here from the Process stat row as a supporting detail.
        type: "text",
        body: "Affinity diagramming surfaced 4 major themes, which the team translated into 10 design requirements (R1–R10).",
      },
      {
        type: "features",
        label: "Four features",
        items: [
          { title: "AI Summarizer", body: "Catches you up on planning you missed in the chat." },
          { title: "Plan Shelf", body: "One central place for the plan's details." },
          { title: "Task Assignments", body: "Lightweight task claiming, so the organizer isn't doing everything." },
          { title: "Split", body: "Private expense splitting between the people involved." },
        ],
      },
      {
        type: "decisions",
        // Rows alternate automatically (image left, then right). Leaving a figure's
        // `src` empty shows the "Image coming soon" placeholder in the same frame.
        // Images: public/projects/plan-it/solution-1.png to solution-5.png.
        items: [
          {
            title: "Build inside WhatsApp, not beside it",
            body: "We sketched a standalone planner and a Trello-style board first. Both required users to leave the conversation, which was the exact behavior research said they'd reject. The WhatsApp layer was the only direction that added structure without asking anyone to change habits.",
            figure: {
              src: "/projects/plan-it/solution-1.png", // solution-1.png
              alt: "Early Plan-It concept screen inside a chat: a New Plan-It group option in the new chat menu, and a Split option in the chat attachment menu",
              aspect: "814/823",
              maxWidth: "420px",
              phoneMaxHeight: 280,
            },
          },
          {
            title: "Catch up without scrolling",
            body: "Participants kept scrolling long chats or asking someone to summarize, because decisions got buried. The summarizer turns a long thread into one compact card with the event, the date, the top options, and what still needs sorting out, with avatars showing how many people the recap reflects. After testing, it became private: the summary appears only for the person who taps the button, so no one speaks for the group and the chat stays free of AI noise.",
            figure: {
              src: "/projects/plan-it/solution-2.png", // solution-2.png
              alt: "Plan-It AI Summarizer screen: a Catch up button under 55 unread messages, and the resulting Birthday dinner planning summary card",
              aspect: "776/812",
              maxWidth: "420px",
              phoneMaxHeight: 280,
            },
          },
          {
            title: "One place for the plan, still inside the chat",
            body: "Links, dates, and decisions were scattered across WhatsApp, Maps, and booking sites. The Plan Shelf is a panel opened from the chat header that shows what is decided, what is pending, and stacked cards for tasks, poll results, and budget. In testing, users read it as the source of truth and found it clearer than scrolling back through chat history.",
            figure: {
              src: "/projects/plan-it/solution-3.png", // solution-3.png
              alt: "Plan-It Plan Shelf screen: the chat with a Plan Shelf button in the header, and the shelf showing the plan summary, people involved, and their tasks",
              aspect: "998/1044",
              maxWidth: "420px",
              phoneMaxHeight: 280,
            },
          },
          {
            title: "Claim a task, not a command",
            body: "In group planning the most invested person ends up doing everything. Tasks can be claimed voluntarily, show who is doing what, and are created in a single tap from the chat. Testing showed people were unsure an assignment had registered, so I added a confirmation message and high, medium, and low priority levels, with tasks organized by priority in the Plan Shelf.",
            figure: {
              src: "/projects/plan-it/solution-4.png", // solution-4.png
              alt: "Plan-It Task Assignment screen: Add Task in the attachment menu, and the Add Task sheet with assignee, due date, category, and priority",
              aspect: "924/972",
              maxWidth: "420px",
              phoneMaxHeight: 280,
            },
          },
          {
            title: "Private by default on money",
            body: "Research on P2P payments shows financial exchanges carry social weight. Public ledgers create discomfort, not accountability. Splits are visible only to the people involved, with no group-wide reminders or callouts.",
            figure: {
              src: "/projects/plan-it/solution-5.png", // solution-5.png
              alt: "Plan-It Split screen: the Create Split sheet, and the chat showing +$15 and -$15 tags visible only to the people involved",
              aspect: "786/812",
              maxWidth: "420px",
              phoneMaxHeight: 280,
            },
          },
        ],
      },
      {
        type: "gallery",
        label: "Hi-fi prototype",
        items: [
          {
            src: "/projects/plan-it/gallery-1.webp",
            alt: "Phone mockups of the attachment menu with Split, the Create Split sheet, the $15 owed card, and the chat with split tags",
            caption: "Split",
            aspect: "2000/1500",
          },
          {
            src: "/projects/plan-it/gallery-2.webp",
            alt: "Phone mockups of the attachment menu with Add Task, the Add Task sheet, and the chat with a task-added message",
            caption: "Task Assignments",
            aspect: "2000/1500",
          },
          {
            src: "/projects/plan-it/gallery-3.png",
            alt: "Phone mockup of the new chat menu with the New Plan-It group option",
            caption: "New Plan-It group",
            aspect: "800/600",
          },
          {
            src: "/projects/plan-it/gallery-4.webp",
            alt: "Phone mockup of a group chat with 55 unread messages and the Catch up button",
            caption: "Catch up",
            aspect: "2000/1500",
          },
        ],
      },
    ],
    impact: [
      {
        type: "text",
        body: "Participants were dropped into an active group chat where they'd “missed” days of birthday-dinner planning, then asked to catch up and coordinate while thinking aloud. The Plan Shelf and summarizer were immediately understood. The problems were about visibility and feedback, not comprehension, and each produced a specific change.",
      },
      {
        type: "fixes",
        label: "What changed",
        items: [
          {
            problem: "Users didn't know whether AI summaries were private or posted to the whole group",
            // TODO(verify): the Framer page repeats the problem text here; fix taken from the build brief.
            fix: "Made AI summaries private to each user, so asking for a catch-up never posts to the group",
          },
          {
            problem: "The split flow was text-heavy and felt like a separate product bolted onto WhatsApp",
            fix: "Replaced explanatory paragraphs with a numerical interface using +/− and red/green indicators, plus an explicit disclaimer that balances are private to the two people involved",
          },
          {
            problem: "After assigning a task, users weren't sure it had registered or how urgent it was",
            fix: "Added confirmation feedback on assignment, priority levels, and automatic surfacing of tasks in the Plan Shelf sorted by priority",
          },
        ],
      },
      {
        type: "text",
        body: "A high-fidelity WhatsApp-integrated prototype covering four features: an AI chat summarizer, a centralized Plan Shelf, lightweight task claiming, and private expense splitting. Participants said they'd choose a Plan-It group over a regular group chat for planning.",
      },
      {
        type: "note",
        body: "There are no quantified outcome metrics for this project. The evidence is qualitative: what testing surfaced, and the changes it led to.",
      },
    ],
    reflection: [
      {
        type: "columns",
        items: [
          {
            title: "What I'd do differently",
            body: "Testing revealed that how information surfaced mattered more than which features existed. Every iteration we made was about visibility, privacy, or feedback, not about adding capability. I'd front-load those questions in the next round rather than discovering them at the end.",
          },
          {
            title: "Next steps",
            body: "Extend beyond WhatsApp to iMessage and other chat platforms, and explore on-device summarization to address the privacy concerns raised around AI reading group conversations.",
          },
        ],
      },
      // TODO: add the social/ethical impact considerations from the project docs.
    ],
  },
  docs: {
    body: "The full process documentation for this project: survey and interview synthesis, requirements, wireframes, and iteration notes.",
    url: "https://drive.google.com/file/d/1xxoSGuyz2afE9iaLyomY2GZSPCJBtJ-v/view?usp=sharing",
  },
};
