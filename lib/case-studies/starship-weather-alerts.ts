import type { CaseStudy } from "./types";

const HERO = "/case-studies/starship-weather-alerts/hero.jpg";

export const starshipWeatherAlerts: CaseStudy = {
  slug: "starship-weather-alerts",
  title: "Starship Weather Alerts",
  year: "2025",
  tagline:
    "Students miss Purdue Alerts. Delivery robots are already on every sidewalk. We designed ways for them to carry the warning.",
  meta: "2025 · UX Research · Human-Robot Interaction · Safety",
  scene: "starship",
  chapters: {
    overview: [
      {
        type: "figure",
        figure: {
          src: HERO,
          alt: "Illustration of a student waving at a Starship delivery robot under the Purdue University gateway arch at sunset",
          aspect: "1942/1266",
        },
      },
      {
        type: "facts",
        items: [
          { label: "Year", value: "2025" },
          { label: "Platform", value: "Starship delivery robots and the Starship app" },
          { label: "Focus", value: "Human-robot interaction, emergency communication" },
          {
            label: "Methods",
            value: [
              "Literature Review",
              "Contextual Inquiry",
              "Stakeholder Interview",
              "Street Interviews",
              "Affinity Mapping",
              "Prototyping",
              "Usability Testing",
            ],
          },
        ],
      },
      {
        type: "text",
        body: "A CGT 52200 project with Purdue Emergency Preparedness & Planning (PEPP), exploring how Starship robots could help during severe weather beyond making deliveries.",
      },
    ],
    problem: [
      {
        type: "text",
        body: "Purdue sends Purdue Alerts for severe weather, but students often miss them because they are busy or not looking at their phones. PEPP's main outdoor channel is seven sirens that only prompt people to check their phones. Meanwhile, Starship robots travel the same sidewalks every day, with speakers, lights, and an app students open to order food.",
      },
      {
        type: "stats",
        items: [
          {
            value: "1 in 3",
            label: "college students feel ready for a natural disaster (Tanner & Doberstein, 2015)",
          },
          { value: "7", label: "outdoor sirens, which only tell people to go check their phones" },
        ],
      },
      {
        type: "hmw",
        body: "How might Starship delivery robots help students notice severe weather alerts without disrupting deliveries?",
      },
    ],
    role: [
      {
        type: "text",
        body: "Team project of three. I ran the contextual inquiry and the secondary research on the robot's sensors and autonomy, conducted the PEPP interview and design feedback sessions, led ideation and design on both concepts, built the prototypes, ran the user feedback and usability testing, and wrote most of the documentation.",
      },
    ],
    process: [
      {
        type: "text",
        body: "We started with the robot itself: its sensors, its \"bubble of awareness,\" and its Level 4 autonomy. A structured literature review then covered trust in delivery robots, robots in emergencies, and student weather preparedness. On campus, a contextual inquiry showed how the robots actually behave around pedestrians. We interviewed a PEPP team member about their responsibilities and expectations, and ten people around the Engineering Mall about trust and weather habits. Over fifty data points from all of this went into a color-coded affinity map in Miro, which led to two personas and two separate concepts.",
      },
      {
        type: "stats",
        items: [
          { value: "10", label: "street interviews (4 on trust, 6 on weather)" },
          { value: "50+", label: "affinity map data points" },
          { value: "5", label: "early ideas narrowed to 2 directions" },
        ],
      },
      // Findings, in two groups with continuous numbering.
      {
        type: "insights",
        label: "From the literature",
        items: [
          {
            body: "Most research on delivery robots reports high trust, and over half of respondents were comfortable sharing sidewalks with them.",
            citation: "Patel (2024); Gehrke et al. (2025)",
          },
          {
            body: "Ground robots are rarely used for emergency response, since the literature focuses on aerial and aquatic vehicles.",
            citation: "Wang et al. (2025)",
          },
          {
            body: "Robot design shapes trust, and aesthetic design increased it.",
            citation: "Shin, Choi & Oh (2024)",
          },
          {
            body: "Students are \"marginally aware of vulnerabilities\" and \"do very little to prepare.\"",
            citation: "Lovekamp & Tate (2008)",
          },
        ],
      },
      {
        type: "insights",
        label: "From the field",
        start: 5,
        items: [
          {
            body: "The robots already signal and speak. They blink turn indicators and say \"Hi, can you please let me pass?\" when blocked, so a spoken alert fits what people expect from them.",
            citation: "Source: Contextual inquiry",
          },
          {
            body: "PEPP wanted robots to broadcast pre-approved verbal alerts while moving, and named data governance as the main challenge, since Starship is a private company.",
            citation: "Source: PEPP interview",
          },
          {
            body: "People trust the robots but not with critical items like medication, and many never open the Starship app. So an alert needed a channel outside the app, plus a smaller one inside it.",
            citation: "Source: Street interviews",
          },
        ],
      },
      {
        type: "features",
        label: "Personas",
        items: [
          { title: "Sarah", body: "An on-campus observer who sees robots daily but misses alerts." },
          { title: "Pranay", body: "An app user who stays indoors and orders through Starship." },
        ],
      },
    ],
    solution: [
      {
        type: "decisions",
        items: [
          {
            title: "LED lights around the chassis, not a pole",
            body: "Our first concepts were a siren light and an LED strip on a pole. PEPP pointed out that sirens signal police, not weather, and users said lights around the body are easier to notice. Users found a continuous beep irritating and preferred a short message such as \"Alert! Thunderstorm warning at 8pm.\" I tested it with a cardboard box, LED strips, and a speaker running text-to-speech.",
            figure: {
              src: "/case-studies/starship-weather-alerts/robot-cue-sketch.png",
              alt: "Sketch of a student hearing a Starship robot announce a tornado warning until 7pm, with an orange light band around its body",
              aspect: "390/219",
              fit: "contain",
              // White sketch on the dark page: pad it inside a dark card.
              inset: true,
            },
          },
          {
            title: "An in-app banner and a button for the full alert",
            body: "Pranay sees a hazard banner on the home screen. PEPP suggested making it tappable, so I added a pulsing floating action button that opens the complete Purdue Alert message.",
            figure: {
              src: "/case-studies/starship-weather-alerts/in-app-banner.png",
              alt: "Starship app home screen with a thunderstorm warning banner, and the alert dialog explaining that deliveries may be delayed",
              aspect: "804/874",
              maxWidth: "400px",
            },
          },
          {
            title: "An onboarding screen that explains the robot cues",
            body: "Added to the final onboarding step so new users know the cues exist and can tell others.",
            figure: {
              src: "/case-studies/starship-weather-alerts/onboarding.png",
              alt: "Onboarding screen showing robot light colors for thunderstorm, tornado, blizzard, and heat alerts",
              aspect: "402/874",
              maxWidth: "260px",
            },
          },
        ],
      },
      {
        type: "video",
        src: "/case-studies/starship-weather-alerts/solutions-walkthrough.mp4",
        caption: "This video gives a glimpse of what the solutions are.",
        title: "Starship Weather Alerts solutions walkthrough",
      },
    ],
    impact: [
      {
        type: "text",
        body: "The robot cue concepts went to a PEPP team member and a few students. The in-app design went through a usability test with one user. Nothing shipped, so there are no outcome metrics. Each change below came directly from that feedback.",
      },
      {
        type: "fixes",
        label: "What changed",
        items: [
          {
            problem: "A siren suggests police or an emergency nearby, not weather.",
            fix: "Dropped the siren for LED lighting plus a spoken message.",
          },
          {
            problem: "A continuous beep and constant flashing would be irritating, especially with several robots nearby.",
            fix: "A short spoken alert, with lights flashing only for a Warning.",
          },
          {
            problem: "The in-app button kept pulsing after the user had tapped it.",
            fix: "The pulse stops once the user interacts with it.",
          },
        ],
      },
      {
        type: "text",
        body: "The concepts show two low-impact ways to extend an alert students already miss: a lit and spoken cue for people on the sidewalk, and a banner with a full-alert button for people ordering indoors. Both depend on Starship allowing changes to its hardware and app, which we could not confirm.",
      },
    ],
    reflection: [
      {
        type: "columns",
        items: [
          {
            title: "What I'd do differently",
            body: "The usability test covered one user, and the robot cues only existed as a cardboard prototype powered indoors, so we could not test how visible the LEDs are in direct sunlight. One tester was also unsure the Purdue-logo button held an alert, and we did not resolve that. With more time I'd test outdoors with several robots at different times of day.",
          },
          {
            title: "Next steps",
            body: "Test richer visual cues and clearer color coding, since many users did not know the National Weather Service colors. Explore whether the robots' sensors could report traction loss and debris, which PEPP called the most valuable winter data. Plan an awareness effort with PEPP and Starship, and study how robots could help emergency crews after an event.",
          },
        ],
      },
      {
        type: "bullets",
        label: "Ethical considerations",
        items: [
          "Pulsing lights could distract drivers and cyclists, so they might need to switch off near busy roads such as Mitch Daniels Blvd.",
          "Alerts must be accurate and come from official sources.",
          "Too many alerts cause alert fatigue.",
          "Robots and apps should supplement official alerts, not replace them.",
        ],
      },
      {
        type: "gallery",
        label: "Final screens",
        items: [
          {
            src: "/case-studies/starship-weather-alerts/gallery-1-mockups.webp",
            alt: "Three phone mockups: the onboarding screen, the weather alert dialog, and the home screen with the hazard banner",
            caption: "Final screens",
            aspect: "2000/1500",
          },
          {
            src: "/case-studies/starship-weather-alerts/gallery-2-hazard-banner.png",
            alt: "Starship home screen with a thunderstorm warning banner and the glowing Purdue alert button",
            caption: "Hazard banner and pulsing alert button",
            aspect: "402/874",
          },
          {
            src: "/case-studies/starship-weather-alerts/gallery-3-intro-overlay.png",
            alt: "Alert dialog: thunderstorm warning, stay indoors, deliveries may be delayed or canceled, with an Understood button",
            caption: "Intro overlay",
            aspect: "402/874",
          },
          {
            src: "/case-studies/starship-weather-alerts/gallery-4-led-sketch.jpg",
            alt: "Early sketch of a delivery robot with a band of lights around its body",
            caption: "Early LED band sketch",
            aspect: "358/247",
            fit: "contain",
            inset: true,
          },
          {
            src: "/case-studies/starship-weather-alerts/gallery-5-onboarding.png",
            alt: "Onboarding screen showing robot light colors for thunderstorm, tornado, blizzard, and heat alerts",
            caption: "Onboarding screen",
            aspect: "402/874",
          },
        ],
      },
    ],
  },
  docs: {
    body: "The full process documentation for this project: research, interviews, personas, and design iterations.",
    url: "https://drive.google.com/file/d/1Wy50AtTMKW4kbV6mnCkYgcUwLTFTAlqo/view?usp=sharing",
  },
};
