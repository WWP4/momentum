export const COURSES = [
  {
    id: "sports-training-performance",
    title: "Sports Training & Performance",
    credit: "1.0",
    tagline:
      "Technique | Discipline | Strength Foundation | Game IQ | Skill Progression",

    description:
      "An athlete development course focused on mechanics, discipline, strength foundations, and game intelligence.",

    requirements: {
      credit: [
        "1.0 Credit = 9,000 minutes",
        "Eligible for .25 / .50 / 1.0 credit"
      ],
      qualifyingMinutes: [
        "Technical drills",
        "Footwork",
        "Skill sessions",
        "Strength training",
        "Film study",
        "Team practice"
      ],
      expectations: [
        "Commitment to repetition",
        "Improve technique",
        "Understand biomechanics",
        "Increase game IQ",
        "Train consistently"
      ]
    },

    grading: {
      lab: "60% - Skill work and training logs",
      reflection: "20% - Self analysis",
      final: "20% - Final written summary"
    },

    syllabus: {
      overview:
        "Focuses on improving athletic technique, movement efficiency, and decision making.",
      outcomes: [
        "Improve skill execution",
        "Understand movement mechanics",
        "Increase game awareness",
        "Apply corrections independently"
      ],
      weekly: [
        "Skill training",
        "Footwork drills",
        "Strength work",
        "Game drills"
      ],
      materials: ["Training access", "Notes", "Optional film"]
    },

    modules: [
      { n: 1, title: "Technique", prompt: "What technique improved?" },
      { n: 2, title: "Control", prompt: "How did you stay controlled?" },
      { n: 3, title: "Efficiency", prompt: "What movement improved?" },
      { n: 4, title: "Consistency", prompt: "What became more consistent?" },
      { n: 5, title: "Correction", prompt: "What did you fix?" }
    ],

    exitExam: {
      title: "Performance Summary",
      prompt:
        "Write a summary explaining your technical improvements and performance growth."
    }
  },

  {
    id: "strength-conditioning",
    title: "Strength & Conditioning",
    credit: "1.0",
    tagline:
      "Strength | Endurance | Progression | Injury Prevention | Recovery",

    description:
      "A course focused on building strength, endurance, and structured training habits.",

    requirements: {
      credit: [
        "1.0 Credit = 9,000 minutes",
        "Eligible for .25 / .50 / 1.0 credit"
      ],
      qualifyingMinutes: [
        "Weight training",
        "Conditioning",
        "Mobility",
        "Speed drills",
        "Recovery work"
      ],
      expectations: [
        "Consistent training",
        "Proper form",
        "Track progress",
        "Improve endurance"
      ]
    },

    grading: {
      lab: "60% - Workout logs",
      reflection: "20% - Training awareness",
      final: "20% - Final summary"
    },

    syllabus: {
      overview:
        "Focuses on strength progression, conditioning, and recovery.",
      outcomes: [
        "Increase strength",
        "Improve endurance",
        "Track performance",
        "Understand training cycles"
      ],
      weekly: [
        "Strength training",
        "Conditioning",
        "Mobility",
        "Recovery tracking"
      ],
      materials: ["Gym access", "Tracking log", "Training space"]
    },

    modules: [
      { n: 1, title: "Consistency", prompt: "How consistent were you?" },
      { n: 2, title: "Overload", prompt: "How did you increase intensity?" },
      { n: 3, title: "Form", prompt: "What improved?" },
      { n: 4, title: "Endurance", prompt: "What improved?" },
      { n: 5, title: "Recovery", prompt: "What did you learn?" }
    ],

    exitExam: {
      title: "Training Summary",
      prompt:
        "Write a summary explaining your strength, endurance, and training progress."
    }
  }
];
