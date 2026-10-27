import type { CaseStudy } from "./types";

// Copy taken from the Framer case study page. Lines marked TODO(verify) were not
// on that page and need a check.
export const favoriteItems: CaseStudy = {
  slug: "favorite-items-list-redesign",
  title: "Favorite Items List Redesign",
  year: "2026",
  tagline:
    "Uline built a Favorites page for saving products. Customers used it to reorder. I worked with a team of seven to close that gap.",
  meta: "2026 · UX Research · E-commerce · UX Redesign",
  scene: "uline",
  chapters: {
    overview: [
      {
        type: "figure",
        figure: {
          src: "/projects/uline.webp",
          alt: "Uline box logo beside the title “UX Redesign: Uline Favorite Items and Shopping Lists”",
          aspect: "16/9",
        },
      },
      {
        type: "facts",
        items: [
          { label: "Year", value: "2026" },
          { label: "Sponsor", value: "Uline" },
          { label: "Team", value: "7 people" },
          { label: "Platform", value: "B2B e-commerce" },
        ],
      },
    ],
    problem: [
      {
        type: "text",
        body: "Uline's Favorite Items page was designed for saving preferred products, but analytics showed customers were using it to reach past orders instead. A newer Shopping Lists page with overlapping functionality made it worse: users couldn't tell the two apart, and it was generating support tickets.",
      },
      {
        type: "stats",
        items: [
          {
            value: "6 of 6",
            label: "participants went to the Products page instead of My Account when asked to find Favorites",
          },
          {
            value: "72.71%",
            label: "of users hit “Add to Cart” without ever using the order checkboxes the page was built around",
          },
        ],
      },
      {
        type: "hmw",
        body: "How might we make Favorite Items match how customers actually use it, and clearly distinguish it from Shopping Lists?",
      },
    ],
    role: [
      {
        // TODO(verify): role wasn't stated on the Framer page.
        type: "text",
        body: "One of a team of seven on a project sponsored by Uline, working with a data analyst on Uline's side whose site analytics anchored our findings.",
      },
    ],
    process: [
      {
        type: "tags",
        label: "Methods",
        items: [
          "Secondary Research",
          "Competitive Analysis",
          "Interface Audit",
          "Affinity Mapping",
          "Analytics Review",
          "Usability Testing",
          "Multivariate Testing",
        ],
      },
      {
        type: "tags",
        label: "Competitive analysis",
        items: ["Grainger", "Global Industrial", "McMaster-Carr", "Staples", "Amazon Business"],
      },
      {
        type: "text",
        body: "The team of 7 ran a competitive analysis across Grainger, Global Industrial, McMaster-Carr, Staples, and Amazon Business to see how other B2B platforms structure saved-item behavior, paired with a full interface audit of Uline's existing Favorite Items and Shopping Lists features. Affinity diagramming sorted findings from the audit and five multivariate test scenarios into recurring patterns rather than treating each session as an isolated data point. The sponsor's early hypothesis was that this was a labeling problem. The research was scoped specifically to test whether that assumption held, or whether the issue sat deeper in the interface's structure.",
      },
      {
        type: "stats",
        items: [
          { value: "7", label: "team members" },
          { value: "5", label: "task scenarios tested" },
          { value: "2", label: "returning usability participants" },
        ],
      },
      // Findings (formerly its own chapter), unchanged wording.
      {
        type: "stats",
        items: [
          { value: "6 of 6", label: "participants navigated the wrong path first, looking under Products" },
          { value: "72.71%", label: "of users skip the order checkboxes entirely" },
          { value: "1.65", label: "average items added per cart visit" },
          { value: "0.014%", label: "of users use the Favorites feature as it was designed" },
        ],
      },
      {
        type: "insights",
        label: "What I learned",
        items: [
          {
            body: "Every one of six test participants looked for Favorites on the Products page. It lives under My Account; the navigation contradicted their mental model completely.",
          },
          {
            body: "Uline's own analytics showed an average of 1.65 items added to cart per visit. The page was built around bulk checkbox selection for a task users were performing one item at a time.",
          },
          {
            body: "Research frames wishlists as a consideration space, distinct from a cart. Uline's page was serving a reorder function while wearing wishlist clothing. The mismatch was structural, not cosmetic.",
          },
        ],
      },
      {
        type: "figure",
        figure: {
          src: "/projects/uline/process-opportunity-map.png",
          alt: "Opportunity map: simplify navigation to increase focus, increase personalization, emphasize reduced complexity for a B2B audience, and align with users' definitions of Favorite Items vs. Wishlist",
          caption: "Opportunity map",
          aspect: "718/402",
        },
      },
    ],
    solution: [
      {
        type: "decisions",
        // Rows alternate automatically (image left, then right). Leaving a figure's
        // `src` empty shows the "Image coming soon" placeholder in the same frame.
        // Images: public/projects/uline/solution-1 to solution-5.
        items: [
          {
            title: "Put Favorites where users already look",
            body: "Adding Favorite Items to the My Account dropdown came straight from watching all six participants navigate to Products first. Surfacing it in the dropdown cut steps and matched the mental model rather than fighting it.",
            figure: {
              src: "/projects/uline/solution-1.webp", // solution-1.webp
              alt: "Uline homepage with Favorite Items in the My Account dropdown",
              aspect: "1440/1024",
              phoneMaxHeight: 280,
            },
          },
          {
            title: "A heart on every product page",
            body: "Users could only add to Favorites from the Favorite Items page, and had to know the model number. In testing, people preferred a prominent, highly visible button on the product page, so each product now has a heart button with a clear label. The heart is a convention users already know from other shops, and it lets people save an item at the moment they find it.",
            figure: {
              src: "/projects/uline/solution-2.webp", // solution-2.webp
              alt: "Product page with the Add to Favorites heart button",
              aspect: "2000/765",
              phoneMaxHeight: 280,
            },
          },
          {
            title: "Search by name, not just model number",
            body: "Adding an item from the Favorites page meant typing an exact model number, which participants found frustrating. The new Add Item modal searches as you type, shows when an item has been added, and lets you remove it in the same modal. A snackbar confirms each action, so users no longer wonder whether it went through. It also lets users browse products from recently ordered and add them to the list.",
            figure: {
              src: "/projects/uline/solution-3.png", // solution-3.png
              alt: "Add New Item modal with dynamic search",
              aspect: "1573/832",
              phoneMaxHeight: 280,
            },
          },
          {
            title: "One-click add, not bulk select",
            body: "With an average of 1.65 items per cart addition, the checkbox workflow was optimizing for a case that barely happened. Per-row “Add to Cart” buttons, with both icon and label, which testing showed users preferred, made the common path the fast one.",
            figure: {
              src: "/projects/uline/solution-4.png", // solution-4.png
              alt: "Redesigned Favorite Items table with per-row Add to Cart buttons",
              aspect: "1440/1024",
              phoneMaxHeight: 280,
            },
          },
          {
            title: "Table settings that stay out of the way",
            body: "The Favorite Items table showed more information than most users needed, and several participants felt overloaded. Sort and Table Settings now live together in one modal instead of a separate tab or extra buttons, so people choose which columns to show and how to order them while the page stays clean. Most testers wanted both options, so we kept both.",
            figure: {
              src: "/projects/uline/solution-5.png", // solution-5.png
              alt: "Table Settings and Sort modal",
              aspect: "1440/1024",
              phoneMaxHeight: 280,
            },
          },
        ],
      },
      {
        type: "gallery",
        label: "Hi-fi prototype",
        items: [
          { src: "/projects/uline/gallery-1.png", alt: "Favorite Items table with a snackbar: H-11 added to Shopping Cart, with Go to Cart and Undo", caption: "Added to cart", aspect: "1440/1024" },
          { src: "/projects/uline/gallery-2.png", alt: "Favorite Items table with the Customer Item # tooltip open", caption: "Customer Item # tooltip", aspect: "1440/1024" },
          { src: "/projects/uline/gallery-3.webp", alt: "Uline homepage with the My Account dropdown open, showing Favorite Items", caption: "My Account dropdown", aspect: "1440/1024" },
          { src: "/projects/uline/gallery-4.webp", alt: "Uline homepage with the account menu closed", caption: "Homepage", aspect: "1440/1024" },
          { src: "/projects/uline/gallery-5.png", alt: "Add Items to Favorites modal: search results for S-143 with Add buttons", caption: "Search by model number", aspect: "779/832" },
          { src: "/projects/uline/gallery-6.png", alt: "Add Items to Favorites modal: S-1436 added, with a Remove button", caption: "Item added", aspect: "779/832" },
          { src: "/projects/uline/gallery-7.png", alt: "Add Items to Favorites modal: Add from Recently Ordered, with one item added", caption: "Recently ordered, item added", aspect: "779/832" },
          { src: "/projects/uline/gallery-8.png", alt: "Add Items to Favorites modal: Add from Recently Ordered, grouped by order number", caption: "Add from recently ordered", aspect: "779/832" },
          { src: "/projects/uline/gallery-9.png", alt: "Add Items to Favorites modal: empty search by model number or customer item number", caption: "Empty state", aspect: "779/832" },
          { src: "/projects/uline/gallery-10.png", alt: "Uline shopping cart page with one item", caption: "Shopping cart", aspect: "1440/1024" },
          { src: "/projects/uline/gallery-11.png", alt: "Favorite Items table with a snackbar: S-1436 added to Favorite Items, with Undo", caption: "Added to Favorites", aspect: "1440/1024" },
          { src: "/projects/uline/gallery-12.png", alt: "Favorite Items table with a snackbar: H-1111 removed from Favorite Items, with Undo", caption: "Removed from Favorites", aspect: "1440/1024" },
          { src: "/projects/uline/gallery-13.png", alt: "Snackbar variants for multiple items, adding to cart, and removing an item", caption: "Snackbar variants", aspect: "977/927" },
          { src: "/projects/uline/gallery-14.png", alt: "Jiffy Rigi Bag Mailers product page with heart buttons beside each model", caption: "Product page", aspect: "1440/1024" },
        ],
      },
    ],
    impact: [
      {
        type: "text",
        body: "Final validation was with two participants from the original current-state sessions, so they could compare directly against the live site. Both described the redesign as “super clear.”",
      },
      {
        type: "fixes",
        label: "What changed",
        items: [
          {
            problem: "Users searched the Products page for Favorites; it lived buried under My Account",
            // TODO(verify): the Framer page repeats the problem text here; fix taken from the design decision above.
            fix: "Added Favorite Items to the My Account dropdown, where participants already expected it",
          },
          {
            problem: "Adding an item from the Favorites page itself meant knowing its model number, with no confirmation that it worked",
            fix: "Built an “Add New Item” modal with dynamic search that returns results as you type, marks items as added, allows removal without leaving the modal, and confirms each action with a snackbar",
          },
          {
            problem: "The table showed every field to every user with no way to reorder or reduce it, overloading the page",
            fix: "Combined Sort and Table Settings into a single modal, the variant testing preferred over separate tabs, letting users choose which fields display and in what order",
          },
        ],
      },
      {
        type: "text",
        body: "A high-fidelity Figma prototype delivered to Uline's UX and product teams, with a recommendations report covering navigation, list architecture, and interaction patterns. Both validation participants preferred it to the current site without qualification.",
      },
      {
        type: "note",
        body: "The numbers in Process are the measured baseline each change was designed against: 6 of 6 looking in the wrong place, 72.71% skipping checkboxes, 1.65 items per visit. We didn't have post-launch analytics, so there's no measured “after” yet. The evidence for the redesign is the validation sessions.",
      },
    ],
    reflection: [
      {
        type: "columns",
        items: [
          {
            title: "What I'd do differently",
            body: "Our testers were students, not Uline's actual B2B buyers. We asked them to imagine running a car parts business, which helps but isn't the same thing; procurement managers ordering in volume would likely surface needs we never saw. Testing with real Favorite Items users is the first thing I'd change.",
          },
          {
            title: "Next steps",
            body: "Validate with actual Uline customers, particularly heavy Favorites users. Add keyword search alongside model-number entry, a constraint we designed around for feasibility that users repeatedly asked to lift.",
          },
        ],
      },
    ],
  },
  docs: {
    body: "The full process documentation for this project: research artifacts, competitive analysis, wireframes, and iteration notes.",
    url: "", // TODO: add documentation link
  },
};
