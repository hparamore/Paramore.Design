/* ============================================================
   PLUG — the web app store
   Catalog data. Everything the store renders comes from here.
   To add an app: copy any entry in STORE.apps, change the
   fields, and (optionally) add its id to a collection below.
   ============================================================ */

window.STORE = {
  name: "Plug",
  tagline: "The web app store",

  /* ---------- Categories ---------- */
  categories: [
    { id: "tools",        name: "Tools",        emoji: "🛠️", bg: "linear-gradient(135deg,#434343,#1a1a1a)" },
    { id: "productivity", name: "Productivity", emoji: "✅", bg: "linear-gradient(135deg,#0F9D58,#0a6b3c)" },
    { id: "games",        name: "Games",        emoji: "🎮", bg: "linear-gradient(135deg,#7b2ff7,#4a0fb8)" },
    { id: "ai",           name: "AI",           emoji: "🤖", bg: "linear-gradient(135deg,#00c6ff,#0072ff)" },
    { id: "design",       name: "Design",       emoji: "🎨", bg: "linear-gradient(135deg,#ff512f,#dd2476)" },
    { id: "finance",      name: "Finance",      emoji: "💸", bg: "linear-gradient(135deg,#11998e,#38ef7d)" },
    { id: "health",       name: "Health",       emoji: "🫀", bg: "linear-gradient(135deg,#f857a6,#ff5858)" },
    { id: "social",       name: "Social",       emoji: "💬", bg: "linear-gradient(135deg,#4facfe,#00f2fe)" },
    { id: "music",        name: "Music",        emoji: "🎧", bg: "linear-gradient(135deg,#c31432,#240b36)" },
    { id: "education",    name: "Education",    emoji: "📚", bg: "linear-gradient(135deg,#f7971e,#ffd200)" }
  ],

  /* ---------- Apps ----------
     icon.bg      : CSS gradient behind the emoji (placeholder until real icons)
     theme        : two colors used to draw placeholder screenshots
     shots        : screenshot mock variants — feed | dashboard | chat | list |
                    game | profile | editor | cards | grid | stats
     url          : where the PWA actually lives ("#" = placeholder)
  ------------------------------ */
  apps: [
    {
      id: "venture-generator",
      name: "Venture Generator",
      subtitle: "Startup ideas on demand",
      developer: "Paramore.Design",
      category: "tools",
      url: "https://paramore.design/venture-generator.html",
      icon: { emoji: "🚀", bg: "linear-gradient(135deg,#FF6B00,#c93900)" },
      theme: ["#FF6B00", "#2b1300"],
      shots: ["cards", "dashboard", "list"],
      screenshots: ["assets/shots/venture-1.jpg", "assets/shots/venture-2.jpg", "assets/shots/venture-3.jpg"],
      rating: 4.8, ratingCount: 412,
      ratingDist: [82, 12, 3, 2, 1],
      age: "4+",
      description: [
        "Stuck staring at a blank page? Venture Generator mashes up markets, mechanics, and business models to hand you fresh startup ideas in one tap.",
        "Each idea comes with a name, a pitch, and an angle you probably haven't considered. Keep tapping until something makes you put your phone down and start building.",
        "Built as a fast, zero-install web app. No sign-up, no tracking — just ideas."
      ],
      reviews: [
        { stars: 5, title: "Dangerously good", author: "sideprojectserial", date: "Aug 12", body: "I came for a laugh and left with the idea I'm actually building now. Send help." },
        { stars: 5, title: "Perfect shower-thought machine", author: "makerkate", date: "Jul 30", body: "The combinations are unhinged in the best way. Great for brainstorm warmups with my team." },
        { stars: 4, title: "More filters please", author: "b2b_brian", date: "Jul 18", body: "Love it. Would pay for an industry filter so I can stay in my lane." }
      ]
    },
    {
      id: "checkin",
      name: "CheckIn",
      subtitle: "Stay close to your people",
      developer: "Paramore.Design",
      category: "social",
      url: "#",
      icon: { emoji: "🏡", bg: "linear-gradient(135deg,#4facfe,#0059c9)" },
      theme: ["#4facfe", "#031c33"],
      shots: ["feed", "chat", "profile"],
      rating: 4.9, ratingCount: 1284,
      ratingDist: [90, 6, 2, 1, 1],
      age: "4+",
      description: [
        "CheckIn is the easiest way for families and close friends to stay in each other's lives without the noise of social media.",
        "Share small moments, answer a daily prompt, and see everyone's updates in one calm, private feed. No ads, no algorithm, no strangers.",
        "Designed for the people you'd actually call — grandparents included."
      ],
      reviews: [
        { stars: 5, title: "Replaced our group chat", author: "gmaof6", date: "Aug 20", body: "Even my mother-in-law figured it out in one evening. The daily prompt is the best part of my morning." },
        { stars: 5, title: "Calm is the right word", author: "quietfeed", date: "Aug 02", body: "It's social media without the doomscroll. Our family thread is genuinely wholesome." },
        { stars: 4, title: "Want widgets", author: "dadmode", date: "Jul 22", body: "Five stars when I can pin the family feed to my home screen." }
      ]
    },
    {
      id: "taskloop",
      name: "TaskLoop",
      subtitle: "To-dos that reschedule themselves",
      developer: "Loopworks",
      category: "productivity",
      url: "#",
      icon: { emoji: "🔁", bg: "linear-gradient(135deg,#0F9D58,#075c33)" },
      theme: ["#0F9D58", "#04170d"],
      shots: ["list", "dashboard", "feed"],
      rating: 4.6, ratingCount: 862,
      ratingDist: [70, 19, 6, 3, 2],
      age: "4+",
      description: [
        "TaskLoop is a to-do list for people who abandon to-do lists. Anything you don't finish today quietly rolls forward and re-prioritizes itself — no guilt, no manual dragging.",
        "Set loops for recurring work, let streaks build momentum, and watch your week organize itself."
      ],
      reviews: [
        { stars: 5, title: "The roll-forward is genius", author: "inboxzeroish", date: "Aug 15", body: "My Monday list finally stopped being a graveyard. It just… handles it." },
        { stars: 4, title: "Simple and fast", author: "gtd4life", date: "Aug 01", body: "Opens instantly from my home screen. Wish it had calendar sync." }
      ]
    },
    {
      id: "promptpal",
      name: "PromptPal",
      subtitle: "Your prompt library, everywhere",
      developer: "Neural Tinker Co.",
      category: "ai",
      url: "#",
      icon: { emoji: "🧠", bg: "linear-gradient(135deg,#00c6ff,#0041c9)" },
      theme: ["#00c6ff", "#001a33"],
      shots: ["chat", "list", "editor"],
      rating: 4.5, ratingCount: 530,
      ratingDist: [64, 22, 8, 3, 3],
      age: "4+",
      description: [
        "Stop retyping your best prompts. PromptPal keeps your entire prompt library one tap away — organized, versioned, and ready to paste into any AI tool.",
        "Fill-in-the-blank variables turn your prompts into reusable templates. Share a link to any prompt with your team."
      ]
    },
    {
      id: "pixelpad",
      name: "PixelPad",
      subtitle: "Tiny pixel art studio",
      developer: "8-Bit Garden",
      category: "design",
      url: "#",
      icon: { emoji: "👾", bg: "linear-gradient(135deg,#ff512f,#a3125f)" },
      theme: ["#ff512f", "#2b0510"],
      shots: ["editor", "grid", "profile"],
      rating: 4.7, ratingCount: 951,
      ratingDist: [76, 15, 5, 2, 2],
      age: "4+",
      description: [
        "A pocket pixel-art studio that loads in under a second. Draw sprites, animate frames, and export transparent PNGs or GIFs — all in your browser.",
        "Layers, palettes, onion-skinning, and a community gallery to show off your work."
      ],
      reviews: [
        { stars: 5, title: "Better than paid apps", author: "spriteful", date: "Aug 18", body: "The onion-skin animation preview is smoother than my desktop editor. On a phone. Wild." }
      ]
    },
    {
      id: "ledgerlite",
      name: "LedgerLite",
      subtitle: "Know where the money went",
      developer: "Honest Numbers",
      category: "finance",
      url: "#",
      icon: { emoji: "🧾", bg: "linear-gradient(135deg,#11998e,#0b5c55)" },
      theme: ["#38ef7d", "#04211a"],
      shots: ["dashboard", "stats", "list"],
      rating: 4.4, ratingCount: 388,
      ratingDist: [58, 24, 10, 5, 3],
      age: "4+",
      description: [
        "LedgerLite is expense tracking with zero ceremony: type \"14.50 lunch\", done. It figures out the category, the trends, and the gentle nudge you need before the weekend.",
        "Your data stays on your device. Export to CSV anytime."
      ]
    },
    {
      id: "habithive",
      name: "HabitHive",
      subtitle: "Small habits, compound results",
      developer: "Hive Mindful",
      category: "health",
      url: "#",
      icon: { emoji: "🐝", bg: "linear-gradient(135deg,#f7971e,#c96a00)" },
      theme: ["#ffd200", "#332900"],
      shots: ["grid", "stats", "list"],
      rating: 4.6, ratingCount: 743,
      ratingDist: [69, 20, 6, 3, 2],
      age: "4+",
      description: [
        "HabitHive turns your habits into a honeycomb: every day you follow through, a cell fills in. Miss a day and the hive forgives you — streaks bend, they don't break.",
        "Track anything from water to workouts, with weekly hive reports that actually feel good to read."
      ],
      reviews: [
        { stars: 5, title: "The forgiving streaks!!", author: "serial_restarter", date: "Aug 09", body: "Every other habit app punished me into quitting. This one gets how humans work." }
      ]
    },
    {
      id: "wordwisp",
      name: "WordWisp",
      subtitle: "A daily word duel",
      developer: "Foggy Peak Games",
      category: "games",
      url: "#",
      icon: { emoji: "🌪️", bg: "linear-gradient(135deg,#7b2ff7,#3d0a8f)" },
      theme: ["#a06bff", "#150233"],
      shots: ["game", "grid", "stats"],
      rating: 4.7, ratingCount: 2109,
      ratingDist: [78, 14, 4, 2, 2],
      age: "4+",
      description: [
        "One board. Five minutes. Every letter you bank steals from your rival's pool. WordWisp is a daily word duel against a friend — or the whole world.",
        "New board at midnight. Bragging rights forever."
      ],
      reviews: [
        { stars: 5, title: "Our office is at war", author: "deskjockey", date: "Aug 21", body: "Marketing vs engineering, every lunch break. HR is aware." },
        { stars: 4, title: "Addictive", author: "lexiconnie", date: "Aug 10", body: "Just wish the daily board dropped at 6am, midnight is dangerous." }
      ]
    },
    {
      id: "orbitdash",
      name: "OrbitDash",
      subtitle: "One-thumb gravity racer",
      developer: "Foggy Peak Games",
      category: "games",
      url: "#",
      icon: { emoji: "🪐", bg: "linear-gradient(135deg,#240b36,#c31432)" },
      theme: ["#ff4d6d", "#12001f"],
      shots: ["game", "stats", "profile"],
      rating: 4.5, ratingCount: 1567,
      ratingDist: [66, 20, 8, 3, 3],
      age: "9+",
      description: [
        "Hold to orbit, release to sling. OrbitDash is a one-thumb racer where gravity is your engine and every planet is a corner you can take too fast.",
        "60 hand-built systems, daily time trials, and ghosts of your friends' best runs."
      ]
    },
    {
      id: "stacknotes",
      name: "StackNotes",
      subtitle: "Notes that file themselves",
      developer: "Paper Trail Labs",
      category: "productivity",
      url: "#",
      icon: { emoji: "🗂️", bg: "linear-gradient(135deg,#636fa4,#2c3357)" },
      theme: ["#8ea0ff", "#0c1024"],
      shots: ["feed", "editor", "list"],
      rating: 4.3, ratingCount: 296,
      ratingDist: [55, 25, 11, 5, 4],
      age: "4+",
      description: [
        "Write first, organize never. StackNotes auto-tags and auto-files every note as you type, so your inbox of thoughts sorts itself into tidy stacks.",
        "Instant full-text search, markdown support, and offline everything."
      ]
    },
    {
      id: "snappalette",
      name: "SnapPalette",
      subtitle: "Color palettes from any photo",
      developer: "8-Bit Garden",
      category: "design",
      url: "#",
      icon: { emoji: "🎨", bg: "linear-gradient(135deg,#dd2476,#78125e)" },
      theme: ["#ff5fa2", "#2b021c"],
      shots: ["grid", "editor", "cards"],
      rating: 4.6, ratingCount: 623,
      ratingDist: [71, 18, 6, 3, 2],
      age: "4+",
      description: [
        "Point SnapPalette at anything — a sunset, a cereal box, a rug you like — and get a production-ready palette with hex codes, contrast checks, and CSS variables.",
        "Save palettes to your library and export straight to Figma or code."
      ]
    },
    {
      id: "formforge",
      name: "FormForge",
      subtitle: "Forms without the fuss",
      developer: "Anvil & Ampersand",
      category: "tools",
      url: "#",
      icon: { emoji: "⚒️", bg: "linear-gradient(135deg,#485563,#1c2228)" },
      theme: ["#9ab8d0", "#0d1318"],
      shots: ["editor", "list", "dashboard"],
      rating: 4.2, ratingCount: 214,
      ratingDist: [52, 26, 12, 6, 4],
      age: "4+",
      description: [
        "Build a signup form, RSVP, or survey in about ninety seconds. Share the link, watch responses roll into a clean table, export when you're done.",
        "No account required for respondents. No branding on your forms."
      ]
    },
    {
      id: "mindmeld",
      name: "MindMeld",
      subtitle: "Brainstorm with an AI partner",
      developer: "Neural Tinker Co.",
      category: "ai",
      url: "#",
      icon: { emoji: "🫧", bg: "linear-gradient(135deg,#0072ff,#00c6a7)" },
      theme: ["#4dd6ff", "#00222e"],
      shots: ["chat", "cards", "grid"],
      rating: 4.4, ratingCount: 447,
      ratingDist: [61, 22, 9, 4, 4],
      age: "4+",
      description: [
        "MindMeld is a whiteboard where an AI riffs with you in real time — clustering your sticky notes, challenging weak ideas, and suggesting the branch you didn't see.",
        "Great for solo thinking, better with a team."
      ]
    },
    {
      id: "budgetbee",
      name: "BudgetBee",
      subtitle: "Budgets for two",
      developer: "Honest Numbers",
      category: "finance",
      url: "#",
      icon: { emoji: "🍯", bg: "linear-gradient(135deg,#ffd200,#c98a00)" },
      theme: ["#ffc93c", "#2b1e00"],
      shots: ["dashboard", "list", "stats"],
      rating: 4.5, ratingCount: 519,
      ratingDist: [67, 19, 8, 3, 3],
      age: "4+",
      description: [
        "The first budgeting app designed for couples from day one. Shared pots, private pots, and a weekly money date summary that keeps the conversation easy.",
        "Bank-free by design: log spending in seconds, no account linking required."
      ]
    },
    {
      id: "tinytunes",
      name: "TinyTunes",
      subtitle: "Pocket synth & beat maker",
      developer: "Waveform Workshop",
      category: "music",
      url: "#",
      icon: { emoji: "🎹", bg: "linear-gradient(135deg,#c31432,#5b0723)" },
      theme: ["#ff7096", "#1f0110"],
      shots: ["editor", "grid", "game"],
      rating: 4.7, ratingCount: 1032,
      ratingDist: [75, 16, 5, 2, 2],
      age: "4+",
      description: [
        "A full synth, drum machine, and 8-track looper that fits in a web page. Sketch a beat on the bus, export a WAV, drop it into your DAW later.",
        "MIDI keyboard support and a shared riff gallery for happy accidents."
      ],
      reviews: [
        { stars: 5, title: "Made a whole EP on this", author: "lofidan", date: "Jul 28", body: "Started as a joke. Three tracks are keepers. The looper workflow is fast." }
      ]
    },
    {
      id: "quizcraft",
      name: "QuizCraft",
      subtitle: "Turn notes into quizzes",
      developer: "Study Sprout",
      category: "education",
      url: "#",
      icon: { emoji: "🧪", bg: "linear-gradient(135deg,#f7971e,#a34d00)" },
      theme: ["#ffb347", "#2b1500"],
      shots: ["cards", "list", "stats"],
      rating: 4.3, ratingCount: 341,
      ratingDist: [56, 24, 11, 5, 4],
      age: "4+",
      description: [
        "Paste your class notes and QuizCraft turns them into flashcards and practice quizzes with spaced repetition baked in.",
        "Track weak spots, cram smart before exams, and share decks with your study group."
      ]
    },
    {
      id: "reciperadar",
      name: "RecipeRadar",
      subtitle: "Cook with what you have",
      developer: "Pantry Pilot",
      category: "tools",
      url: "#",
      icon: { emoji: "🍳", bg: "linear-gradient(135deg,#38ef7d,#0b7a43)" },
      theme: ["#6dff9e", "#03230f"],
      shots: ["feed", "grid", "list"],
      rating: 4.4, ratingCount: 587,
      ratingDist: [62, 21, 9, 4, 4],
      age: "4+",
      description: [
        "Tell RecipeRadar what's in your fridge and it finds real recipes you can make right now — ranked by how few extra ingredients you need.",
        "Smart substitutions, portion scaling, and a grocery list for the gaps."
      ]
    },
    {
      id: "focusfox",
      name: "FocusFox",
      subtitle: "Pomodoro with a personality",
      developer: "Loopworks",
      category: "productivity",
      url: "#",
      icon: { emoji: "🦊", bg: "linear-gradient(135deg,#ff8008,#b33b00)" },
      theme: ["#ffa94d", "#2b1000"],
      shots: ["game", "stats", "list"],
      rating: 4.5, ratingCount: 902,
      ratingDist: [68, 19, 7, 3, 3],
      age: "4+",
      description: [
        "A focus timer with a tiny fox who naps while you work. Break your focus early and… you'll wake the fox. You don't want to wake the fox.",
        "Session stats, ambient soundscapes, and a den that fills with trophies as your deep-work hours stack up."
      ],
      reviews: [
        { stars: 5, title: "I work for the fox now", author: "gradstudent99", date: "Aug 16", body: "I have never been so productive out of pure guilt. 10/10." }
      ]
    }
  ],

  /* ---------- Today tab editorial cards ---------- */
  today: [
    {
      type: "hero",
      kicker: "APP OF THE DAY",
      title: "Out of ideas? Never again.",
      blurb: "Venture Generator serves unhinged, oddly viable startup ideas on tap.",
      app: "venture-generator"
    },
    {
      type: "list",
      kicker: "COLLECTION",
      title: "Plan a week that actually happens",
      blurb: "Four little apps that quietly run your life.",
      apps: ["taskloop", "focusfox", "habithive", "stacknotes"]
    },
    {
      type: "hero",
      kicker: "NOW TRENDING",
      title: "The word game starting office wars",
      blurb: "WordWisp's daily duel is tearing lunch breaks apart.",
      app: "wordwisp"
    },
    {
      type: "hero",
      kicker: "FROM THE MAKERS",
      title: "A calmer way to stay close",
      blurb: "Why CheckIn ditched the algorithm — and your family loves it.",
      app: "checkin"
    },
    {
      type: "list",
      kicker: "MADE WITH AI",
      title: "Your new thinking partners",
      blurb: "AI tools that pull their weight.",
      apps: ["promptpal", "mindmeld", "quizcraft"]
    }
  ],

  /* ---------- Apps tab ---------- */
  appsTab: {
    banners: ["venture-generator", "checkin", "tinytunes"],
    rows: [
      { title: "New This Week",    subtitle: "Fresh out of the oven",        apps: ["reciperadar", "mindmeld", "budgetbee", "snappalette", "formforge"] },
      { title: "Editors' Choice",  subtitle: "Hand-picked favorites",         apps: ["venture-generator", "checkin", "pixelpad", "tinytunes", "habithive"] },
      { title: "Essential Tools",  subtitle: "Do more in the browser",        apps: ["formforge", "snappalette", "reciperadar", "ledgerlite", "promptpal"] }
    ],
    chart: { title: "Top Free Apps", apps: ["checkin", "venture-generator", "taskloop", "habithive", "tinytunes", "pixelpad", "ledgerlite", "focusfox", "stacknotes"] }
  },

  /* ---------- Games tab ---------- */
  gamesTab: {
    banners: ["wordwisp", "orbitdash"],
    rows: [
      { title: "Quick Sessions",  subtitle: "Fun in five minutes",  apps: ["wordwisp", "orbitdash", "focusfox", "quizcraft"] },
      { title: "Play With Friends", subtitle: "Better together",    apps: ["wordwisp", "quizcraft", "orbitdash"] }
    ],
    chart: { title: "Top Free Games", apps: ["wordwisp", "orbitdash", "quizcraft"] }
  },

  /* Placeholder reviews used for apps without their own */
  defaultReviews: [
    { stars: 5, title: "Exactly what it says", author: "earlyadopterella", date: "Aug 14", body: "Installed to my home screen in ten seconds. Works offline. This is how apps should be." },
    { stars: 4, title: "Solid little app", author: "webappfan", date: "Aug 05", body: "Does one thing well and loads instantly. Looking forward to what's next." },
    { stars: 5, title: "No install, no nonsense", author: "pwa_believer", date: "Jul 26", body: "Shared the link with three friends and everyone was using it within a minute." }
  ]
};
