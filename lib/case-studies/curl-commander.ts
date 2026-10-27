import type { CaseStudy } from "./types";

// Copy taken from the Framer case study page. Lines marked TODO(verify) were not
// on that page (or were unreadable in the screenshot) and need a check.
export const curlCommander: CaseStudy = {
  slug: "curl-commander",
  title: "Curl Commander",
  year: "2026",
  tagline:
    "Most form coaching needs a mirror, a trainer, or a camera. I built one that fits on your wrist and works with a single accelerometer.",
  meta: "2026 · UX Research · Interaction Design · Wearable UX",
  scene: "curl",
  chapters: {
    overview: [
      {
        type: "figure",
        figure: {
          src: "/projects/smartwatch.png",
          alt: "Line illustration of a person wearing a smartwatch in a gym",
          aspect: "3/4",
          maxWidth: "420px",
        },
      },
      {
        type: "facts",
        items: [
          { label: "Year", value: "2026" },
          { label: "Platform", value: "Bangle.js 2 smartwatch" },
          { label: "Focus", value: "Wearable UX · Interaction Design" },
          { label: "Methods", value: ["Literature Review", "Usability Testing", "Iterative Prototyping"] },
        ],
      },
    ],
    problem: [
      {
        type: "text",
        body: "Good bicep curl form depends on controlled tempo, but most people training alone have no way to know if they're rushing. Existing form-feedback systems need a camera, a full IMU strapped to the limb, or a trainer watching.",
      },
      {
        type: "stats",
        items: [
          {
            value: "12.5 Hz",
            label: "sensor sampling rate: low enough to run on-device, high enough for reliable rep detection",
          },
          { value: "1", label: "accelerometer, no gyroscope, no external sensors" },
        ],
      },
      {
        type: "hmw",
        body: "How might a single wrist-worn accelerometer give useful form feedback without a phone, a camera, or a trainer?",
      },
    ],
    role: [
      {
        // TODO(verify): role wasn't stated on the Framer page — written from "I built one".
        type: "text",
        body: "Solo project. I handled the research, the interaction design, the on-watch implementation for the Bangle.js 2, and the usability testing.",
      },
    ],
    process: [
      { type: "tags", label: "Methods", items: ["Literature Review", "Usability Testing", "Iterative Prototyping"] },
      {
        type: "text",
        body: "Rep detection uses scalar projection: each accelerometer reading is projected onto the axis between two calibrated reference positions, arm fully extended and arm fully curled, collapsing three-axis motion data into a single number that moves predictably between rest and full curl. That value is what the tempo rules read against, checking not just whether a rep happened but how fast the arm moved through each phase. Scalar projection was chosen over raw threshold detection because it holds up across different arm lengths and curl styles without per-user tuning beyond the initial calibration, and it's light enough to run directly on the Bangle.js 2's hardware with no connected phone or external processing.",
      },
      {
        type: "insights",
        label: "What I learned",
        items: [
          {
            body: "O'Reilly's Formulift study showed a single wearable IMU can assess form quality, not just count reps, suggesting a wrist-only sensor might be enough.",
            // TODO(verify): journal issue and URL were unreadable in the screenshot.
            citation:
              "O'Reilly, M. A., Slevin, P., Ward, T., & Caulfield, B. (2018). A Wearable Sensor-Based Exercise Biofeedback System: Mixed Methods Evaluation of Formulift. JMIR mHealth and uHealth.",
          },
          {
            body: "Mortazavi found accurate posture detection is achievable at sampling rates as low as 10 Hz, which meant no machine learning was required.",
            citation:
              "Mortazavi, B., Nemati, E., VanderWall, K., Flores-Rodriguez, H. G., Cai, J. Y. J., Lucier, J., Naeim, A., & Sarrafzadeh, M. (2015). Can Smartwatches Replace Smartphones for Posture Tracking? Sensors, 15(10), 26783–26800. https://doi.org/10.3390/s151026783",
          },
          {
            body: "Swain et al. found overly critical or complex feedback reduces engagement during exercise, which shaped every message the watch displays.",
            citation:
              "Swain, T. A., McNarry, M. A., & Mackintosh, K. A. (2024). Assessing and Enhancing Movement Quality Using Wearables and Consumer Technologies: Thematic Analysis of Expert Perspectives. JMIR mHealth and uHealth. https://doi.org/10.2196/56784",
          },
        ],
      },
      {
        // Coded version of the former Gamma "Milestones" slide, in the site palette.
        type: "milestones",
        title: "Milestones",
        intro:
          "Three milestones, one research question: tracing the journey from concept to calibrated prototype on the Bangle.js 2.",
        items: [
          {
            icon: "research",
            title: "Milestone 1 · Research",
            body: "Literature review, concept definition, and early sketches",
          },
          {
            icon: "prototype",
            title: "Milestone 2 · Prototype",
            body: "Lo-fi to mid-fi, calibration flow, sensor exploration on Bangle.js 2",
          },
          {
            icon: "experience",
            title: "Milestone 3 · Experience",
            body: "Rep detection logic, timing-based feedback, usability testing, refinement",
          },
        ],
      },
    ],
    solution: [
      {
        type: "decisions",
        items: [
          {
            title: "Calibration with zero physical interaction",
            body: "The first version captured reference positions on a button press, but pressing the button shifted the arm, corrupting the reading. I replaced it with a five-second countdown that samples automatically while the arm is held still.",
            figure: {
              src: "/case-studies/curl-commander/screen-why-calibrate.webp",
              alt: "Bangle.js 2 showing the “Why Calibrate?” explainer: hold arm down for 5s, then up for 5s",
              aspect: "3/4",
              maxWidth: "320px",
            },
          },
          {
            title: "Tempo thresholds grounded in training research",
            body: "Wilk et al. found the 2-0-2-0 tempo produced the highest volume while keeping movement controlled. I used that as the baseline: under 2 seconds reads as momentum, 2–6 seconds as controlled, over 6 as fatigue.",
            citation:
              "Wilk, M., Stastny, P., Golas, A., Nawrocka, M., Jelen, K., Zajac, A., & Tufano, J. J. (2018). Does Tempo of Resistance Exercise Impact Training Volume? Journal of Human Kinetics, 62(1), 241–250. https://doi.org/10.2478/hukin-2018-0034",
            figure: {
              src: "/case-studies/curl-commander/tempo-table.png",
              alt: "Wilk et al. Table 1: simulations of exercise volume in resistance training at 2/0/2/0, 5/0/5/0 and 10/0/10/0 tempos",
              aspect: "563/285",
              fit: "contain",
              // Sits on a dark card with padding so the white scan reads as a designed element.
              inset: true,
            },
          },
        ],
      },
    ],
    impact: [
      {
        type: "text",
        body: "Two participants used the watch with no prior explanation, completing a full session from calibration to summary. The blind-start format was deliberate: it tested whether the interface could stand on its own. Three problems surfaced, each with a specific fix.",
      },
      {
        type: "fixes",
        label: "What changed",
        items: [
          {
            problem: "Small wrist movements from rest were counted as full reps",
            fix: "Tightened the detection threshold from 0.45 to 0.30 and added a 200ms debounce",
          },
          {
            problem: "A participant hesitated at calibration, unclear why it existed",
            fix: "Added an explainer screen before the countdown; both testers then completed calibration unassisted",
          },
          {
            problem: "The rep count was hard to read mid-exercise",
            fix: "Scaled the counter from 18px to 30px, making it the focal point of the workout screen",
          },
        ],
      },
      {
        type: "text",
        body: "The prototype demonstrates that a single wrist-mounted accelerometer, combined with user-specific calibration and rule-based logic, can produce a usable coaching experience without machine learning or additional body-worn sensors. The end-to-end flow runs reliably across all five screens.",
      },
    ],
    reflection: [
      {
        type: "columns",
        items: [
          {
            title: "What I'd do differently",
            body: "Testing with two participants was enough to catch obvious breakages but not enough to validate the thresholds. The 0.30 and 2s/6s values were tuned against two people's arm lengths and curl speeds; a wider pool would likely have pushed them somewhere else.",
          },
          {
            title: "Next steps",
            body: "Per-exercise calibration profiles so the system generalizes past bicep curls, and adaptive thresholds that learn a user's typical rep duration over multiple sessions rather than relying on hardcoded values.",
          },
        ],
      },
      {
        type: "gallery",
        label: "Final screens",
        // In flow order: start → explainer → calibration → workout → summary.
        items: [
          {
            src: "/case-studies/curl-commander/screen-start.jpg",
            alt: "Start screen: Rep Counter, Let's do Bicep Curls!, with a START button",
            aspect: "3/4",
          },
          {
            src: "/case-studies/curl-commander/screen-why-calibrate.webp",
            alt: "Calibration explainer: Why Calibrate?",
            aspect: "3/4",
          },
          {
            src: "/case-studies/curl-commander/screen-calibration.jpg",
            alt: "Calibration countdown: Hold arm DOWN, starting in 3",
            aspect: "3/4",
            // Square source (768x766) in a 3/4 frame: contain so the screen is not cropped.
            fit: "contain",
          },
          {
            src: "/case-studies/curl-commander/screen-workout.webp",
            alt: "Workout screen: Curl Commander, 3 reps, Start curling!, Arm: up, END button",
            aspect: "3/4",
          },
          {
            src: "/case-studies/curl-commander/screen-summary.webp",
            alt: "Summary screen: 8 total reps, 4 correct, 2 too fast, 2 too slow, 50% form, RESTART button",
            aspect: "3/4",
          },
        ],
      },
    ],
  },
  docs: {
    body: "The full process documentation for this project: research, calibration experiments, and iteration notes.",
    url: "https://drive.google.com/file/d/1oqiNFXcAZxbTCgU-DUmUHZZ0ZTymULPY/view?usp=sharing",
  },
};
