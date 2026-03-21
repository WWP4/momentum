const sportsTrainingPerformanceCourse = {
  id: "sports-training-performance",
  title: "Sports Training & Performance",
  credit: "1.0 Credit",
  category: "Momentum Technical Athlete Development",
  tagline: "Technique | Discipline | Strength Foundation | Game IQ | Skill Progression",

  courseDescription:
    "Sports Training & Performance is an in-depth athlete development course designed to transform a student’s natural ability into refined, intelligent, technical performance. This course focuses on the building blocks of high-level athletic execution: sound mechanics, disciplined training habits, foundational strength, game understanding, and sport-specific skill development.",

  essentialQuestion:
    "How does disciplined technical training improve athletic performance, movement efficiency, and game intelligence over time?",

  outcomes: [
    "Improve execution of key sport-specific skills",
    "Understand how mechanics influence speed, accuracy, and consistency",
    "Demonstrate improved game IQ including spacing, timing, strategy, and anticipation",
    "Apply corrective feedback with independence",
    "Show improved discipline in repetition and skill cycles",
    "Develop more efficient, balanced, and controlled movement patterns",
    "Communicate why certain techniques work and how they improved"
  ],

  requirements: {
    creditMinutes: 9000,
    weeklyTrainingExpectation: "Typically 5–12 hours or more of consistent weekly training",
    qualifyingActivities: [
      "Technical drills",
      "Footwork patterns",
      "Mechanics correction",
      "Skill sessions",
      "Strength foundations",
      "Film for technique and IQ",
      "Team practice",
      "Coach-directed private sessions",
      "Independent form-building work"
    ]
  },

  grading: {
    labWork: 60,
    reflections: 20,
    finalExam: 20
  },

  finalExam: {
    title: "Exit Exam — Sports Training & Performance",
    type: "Written Technical Summary",
    prompt:
      "Write a one-page technical summary of your athletic development this season. Your summary should include a specific technique or skill you improved, the mechanical adjustments you made, how improved form changed your performance, what you learned about spacing, timing, or game IQ, a situation where better technique led to better execution, and what you plan to improve next season. This exam should read like a thoughtful, technical analysis—not a highlight reel. Focus on the how and why of your growth."
  },

  modules: [
    {
      id: 1,
      slug: "technique-breakdown",
      title: "Technique Breakdown",
      prompt: "Describe one technique you improved. What specific adjustments made it better?",
      focus: "Technical self-analysis and mechanical improvement",
      objectives: [
        "Identify a specific technique that improved over time",
        "Explain the exact adjustment or correction that was made",
        "Connect the adjustment to improved athletic execution"
      ],
      instruction:
        "Choose one technical skill from your sport and break it down clearly. Focus on what the technique looked like before, what adjustment you made, and why that adjustment improved the result. Be specific instead of general.",
      reflectionQuestions: [
        "What specific technique were you working on?",
        "What was wrong or inefficient about it before?",
        "What adjustment did you make?",
        "Who or what helped you recognize the needed change?",
        "How did that correction improve your performance?"
      ],
      evidenceRequirements: [
        "Training notes or drill records",
        "Coach feedback if available",
        "Specific example from practice or competition"
      ],
      masteryIndicator:
        "Student can clearly explain a technical correction and connect it to better performance."
    },
    {
      id: 2,
      slug: "form-vs-speed",
      title: "Form vs. Speed",
      prompt: "What happens to your form when you rush? How are you learning to stay controlled?",
      focus: "Form control under pressure and pace",
      objectives: [
        "Recognize how rushing affects form",
        "Analyze the relationship between speed and control",
        "Describe methods used to stay technically sound"
      ],
      instruction:
        "Reflect on moments when your pace got too fast and your mechanics suffered. Identify what breaks down first and explain how you are learning to stay under control without losing effectiveness.",
      reflectionQuestions: [
        "What usually happens when you rush?",
        "Which part of your technique breaks down first?",
        "What situations make you speed up too much?",
        "What cues or habits help you stay controlled?",
        "How are you improving your balance between speed and form?"
      ],
      evidenceRequirements: [
        "Practice or game examples",
        "Coach correction notes",
        "Personal observations from repetition work"
      ],
      masteryIndicator:
        "Student can explain how rushing impacts technique and describe a strategy for improving control."
    },
    {
      id: 3,
      slug: "movement-efficiency",
      title: "Movement Efficiency",
      prompt: "Identify a movement pattern you made more efficient. What changed?",
      focus: "Biomechanics and movement quality",
      objectives: [
        "Identify one movement pattern that improved",
        "Explain what made the old movement less efficient",
        "Describe the changes that created more efficiency"
      ],
      instruction:
        "Choose a movement pattern such as sprinting, cutting, jumping, rotating, shuffling, or sport-specific movement. Explain what became more efficient and why that matters for performance.",
      reflectionQuestions: [
        "What movement pattern improved?",
        "How did you move before the correction?",
        "What inefficiency did you notice?",
        "What did you change in your body position, timing, or mechanics?",
        "How did the new movement pattern improve execution or reduce wasted effort?"
      ],
      evidenceRequirements: [
        "Movement notes from training",
        "Drill-based examples",
        "Before-and-after observations"
      ],
      masteryIndicator:
        "Student can explain how better movement efficiency supports stronger performance."
    },
    {
      id: 4,
      slug: "skill-consistency",
      title: "Skill Consistency",
      prompt: "What drill helped you create more consistent execution?",
      focus: "Repetition and reliable skill development",
      objectives: [
        "Identify a drill connected to improved consistency",
        "Explain how repetition built reliability",
        "Connect drill work to actual performance"
      ],
      instruction:
        "Choose one drill that helped make your skill execution more repeatable. Focus on how repetition improved your control, timing, mechanics, or confidence.",
      reflectionQuestions: [
        "What drill helped you the most?",
        "What skill was it targeting?",
        "Why was that drill effective for you?",
        "How did repeated work improve consistency?",
        "Where did you start seeing the results of that drill?"
      ],
      evidenceRequirements: [
        "Drill logs",
        "Repetition counts or summaries",
        "Examples from live play or practice"
      ],
      masteryIndicator:
        "Student can connect repeated drill work to more dependable skill execution."
    },
    {
      id: 5,
      slug: "correction-moment",
      title: "Correction Moment",
      prompt: "Describe a moment when you realized your technique was wrong. How did you correct it?",
      focus: "Self-awareness and correction",
      objectives: [
        "Recognize a clear technique error",
        "Explain how the mistake was identified",
        "Describe the correction process"
      ],
      instruction:
        "Reflect on a specific moment when you realized your technique was not working correctly. Focus on how you noticed it, what you changed, and what that taught you about learning.",
      reflectionQuestions: [
        "What mistake did you notice in your technique?",
        "How did you realize it was wrong?",
        "Did someone point it out, or did you notice it yourself?",
        "What correction did you make?",
        "What changed after the adjustment?"
      ],
      evidenceRequirements: [
        "Practice example",
        "Coach or peer feedback if relevant",
        "Short summary of the correction process"
      ],
      masteryIndicator:
        "Student can identify a technical mistake and explain how it was corrected."
    },
    {
      id: 6,
      slug: "coach-feedback-application",
      title: "Coach Feedback Application",
      prompt: "What technical correction did a coach give you this season? Explain how it changed your performance.",
      focus: "Applying external feedback",
      objectives: [
        "Recall meaningful coach feedback",
        "Explain how the feedback was applied",
        "Connect feedback to improved execution"
      ],
      instruction:
        "Use a real example of coach feedback from this season. Focus on what the coach said, how you applied it, and what changed because of that correction.",
      reflectionQuestions: [
        "What exact feedback did your coach give you?",
        "Why was that correction needed?",
        "How did you apply the feedback in training?",
        "Did it feel natural right away or take repetition?",
        "How did it improve your performance?"
      ],
      evidenceRequirements: [
        "Coach feedback notes",
        "Training follow-up example",
        "Specific performance result"
      ],
      masteryIndicator:
        "Student can demonstrate the ability to take feedback and turn it into better performance."
    },
    {
      id: 7,
      slug: "control-and-accuracy",
      title: "Control & Accuracy",
      prompt: "How has your accuracy in your sport improved? Be specific.",
      focus: "Precision and execution",
      objectives: [
        "Identify an area where accuracy improved",
        "Explain what changed technically or mentally",
        "Show how control supports precision"
      ],
      instruction:
        "Be specific about the skill involved. Describe what accuracy means in your sport and explain how you improved it through mechanics, focus, repetition, or correction.",
      reflectionQuestions: [
        "What type of accuracy improved for you?",
        "How was your execution less accurate before?",
        "What adjustment improved your control?",
        "How did repetition affect your precision?",
        "Where have you seen the improvement show up most clearly?"
      ],
      evidenceRequirements: [
        "Examples from games or practice",
        "Coach notes if available",
        "Training observations"
      ],
      masteryIndicator:
        "Student can explain how technical changes improved control and precision."
    },
    {
      id: 8,
      slug: "footwork-body-positioning",
      title: "Footwork / Body Positioning",
      prompt: "What footwork or body positioning improvement made the biggest difference?",
      focus: "Body alignment and movement setup",
      objectives: [
        "Identify an important footwork or positioning change",
        "Explain why body positioning matters",
        "Connect body setup to performance outcomes"
      ],
      instruction:
        "Choose the body positioning or footwork improvement that had the biggest impact on your play. Explain why it mattered and how it changed your efficiency, timing, or control.",
      reflectionQuestions: [
        "What footwork or positioning issue were you working on?",
        "Why did it matter in your sport?",
        "What changed in your setup or movement?",
        "How did the improvement affect your execution?",
        "What result became more consistent because of it?"
      ],
      evidenceRequirements: [
        "Footwork drill summaries",
        "Practice observations",
        "Examples of improved positioning in competition"
      ],
      masteryIndicator:
        "Student can explain how better body positioning improved execution."
    },
    {
      id: 9,
      slug: "timing",
      title: "Timing",
      prompt: "Describe how your timing in your sport has improved.",
      focus: "Rhythm, sequencing, and reaction",
      objectives: [
        "Recognize the role of timing in performance",
        "Describe how timing improved through training",
        "Connect timing to successful execution"
      ],
      instruction:
        "Focus on one area where timing mattered in your sport. Explain what improved and how better timing changed your consistency, control, or results.",
      reflectionQuestions: [
        "What part of your sport depends heavily on timing?",
        "How did your timing use to be off?",
        "What helped you improve it?",
        "How does better timing affect your decisions or execution?",
        "What proof do you see that your timing is better now?"
      ],
      evidenceRequirements: [
        "Situational examples",
        "Drill or game references",
        "Coach or self-evaluation notes"
      ],
      masteryIndicator:
        "Student can describe how better timing improved sport performance."
    },
    {
      id: 10,
      slug: "game-iq-growth",
      title: "Game IQ Growth",
      prompt: "What is one new game insight you understand now that you didn’t before?",
      focus: "Strategic awareness and understanding",
      objectives: [
        "Identify a new game concept or insight",
        "Explain how understanding developed",
        "Connect knowledge to performance decisions"
      ],
      instruction:
        "Describe one game concept, pattern, or strategic insight that became clearer to you this season. Focus on understanding, not just effort.",
      reflectionQuestions: [
        "What game insight did you learn this season?",
        "Why did you not understand it fully before?",
        "What helped you understand it better now?",
        "How has this changed the way you play?",
        "How does this show growth in your game IQ?"
      ],
      evidenceRequirements: [
        "Film, practice, or live-play examples",
        "Strategic observations",
        "Coach instruction if relevant"
      ],
      masteryIndicator:
        "Student can explain a meaningful increase in sport understanding and decision-making."
    },
    {
      id: 11,
      slug: "scenario-recognition",
      title: "Scenario Recognition",
      prompt: "Describe a game scenario you reacted to better because of improved IQ.",
      focus: "Recognition and response in competition",
      objectives: [
        "Identify a specific scenario from sport",
        "Explain how improved awareness led to a better reaction",
        "Connect mental recognition to execution"
      ],
      instruction:
        "Choose a game situation where your reaction improved because you understood the scenario better. Explain what you saw, what you recognized, and how you responded more effectively.",
      reflectionQuestions: [
        "What was the situation?",
        "What did you notice faster or more clearly than before?",
        "How would you have reacted earlier in the season?",
        "What did you do differently this time?",
        "How did improved recognition change the outcome?"
      ],
      evidenceRequirements: [
        "Game or scrimmage example",
        "Film notes if available",
        "Self-evaluation of decision-making"
      ],
      masteryIndicator:
        "Student can show how mental recognition led to stronger in-game response."
    },
    {
      id: 12,
      slug: "technique-under-pressure",
      title: "Technique Under Pressure",
      prompt: "Does your technique fall apart under pressure? How have you improved?",
      focus: "Execution under stress",
      objectives: [
        "Evaluate technique under pressure",
        "Recognize pressure-related breakdowns",
        "Describe improvement in stressful situations"
      ],
      instruction:
        "Be honest about what happens to your mechanics when the moment gets stressful. Then explain how you have improved your ability to stay technically sound under pressure.",
      reflectionQuestions: [
        "What happens to your technique under pressure?",
        "What part of your execution breaks down most often?",
        "What situations trigger that breakdown?",
        "What have you done to improve under pressure?",
        "Where have you seen progress?"
      ],
      evidenceRequirements: [
        "Competition examples",
        "Pressure drill observations",
        "Self-reflection on performance moments"
      ],
      masteryIndicator:
        "Student can analyze technical performance under pressure and describe real improvement."
    },
    {
      id: 13,
      slug: "balance-and-control",
      title: "Balance & Control",
      prompt: "Give an example where better balance changed your outcome.",
      focus: "Body control and stability",
      objectives: [
        "Recognize the role of balance in performance",
        "Identify one performance outcome changed by better control",
        "Connect stability to successful execution"
      ],
      instruction:
        "Use a specific example where improved balance directly affected your result. Explain what changed physically and why balance mattered in that moment.",
      reflectionQuestions: [
        "What moment showed the importance of balance?",
        "How did poor balance affect you before?",
        "What changed in your body control or mechanics?",
        "How did improved stability affect the result?",
        "What have you learned about balance in your sport?"
      ],
      evidenceRequirements: [
        "Practice or game example",
        "Movement notes",
        "Coach or self-observation"
      ],
      masteryIndicator:
        "Student can explain how balance supports control and better execution."
    },
    {
      id: 14,
      slug: "strength-foundations",
      title: "Strength Foundations",
      prompt: "What strength improvements supported your technique?",
      focus: "Physical support for technical growth",
      objectives: [
        "Identify strength gains connected to skill development",
        "Explain how strength supported technique",
        "Recognize the relationship between physical preparation and performance"
      ],
      instruction:
        "Focus on how strength work supported technical execution. This is not just about getting stronger—it is about how strength improved your control, power, posture, or movement quality.",
      reflectionQuestions: [
        "What area of strength improved?",
        "How did that strength support your technique?",
        "Did it affect power, control, posture, or balance?",
        "What training helped build that foundation?",
        "How did you notice the transfer into your sport?"
      ],
      evidenceRequirements: [
        "Strength training notes",
        "Movement or technique examples",
        "Observed performance improvement"
      ],
      masteryIndicator:
        "Student can explain how foundational strength supported technical development."
    },
    {
      id: 15,
      slug: "repetition-discipline",
      title: "Repetition Discipline",
      prompt: "How has repetition changed your skill level?",
      focus: "Discipline, repetition, and long-term skill growth",
      objectives: [
        "Understand the role of repetition in skill development",
        "Reflect on how discipline shaped progress",
        "Connect repeated practice to higher execution"
      ],
      instruction:
        "Reflect on the importance of repetition in your development. Focus on what repeated work changed in your confidence, mechanics, consistency, or decision-making.",
      reflectionQuestions: [
        "What skill improved most through repetition?",
        "How often did you work on it?",
        "What was difficult about staying disciplined?",
        "How did repetition affect confidence or consistency?",
        "What would your skill level look like without that repeated work?"
      ],
      evidenceRequirements: [
        "Training logs",
        "Drill frequency notes",
        "Examples of improvement over time"
      ],
      masteryIndicator:
        "Student can explain how disciplined repetition drove measurable skill development."
    },
    {
      id: 16,
      slug: "film-study-insight",
      title: "Film Study Insight",
      prompt: "What did film help you understand about your technique?",
      focus: "Visual analysis and self-awareness",
      objectives: [
        "Use film as a learning tool",
        "Identify something film revealed about technique",
        "Connect observation to correction"
      ],
      instruction:
        "Reflect on what film showed you that you might not have noticed in real time. Focus on a technical lesson gained through watching yourself or another athlete.",
      reflectionQuestions: [
        "What did you notice through film study?",
        "Why was that hard to notice live?",
        "What did film reveal about your mechanics or timing?",
        "How did that insight change your training?",
        "What correction came from that observation?"
      ],
      evidenceRequirements: [
        "Film notes",
        "Visual analysis summary",
        "Follow-up correction example"
      ],
      masteryIndicator:
        "Student can explain how film analysis improved technical awareness."
    },
    {
      id: 17,
      slug: "habit-formation",
      title: "Habit Formation",
      prompt: "What training habit have you built that improves performance?",
      focus: "Daily habits and long-term development",
      objectives: [
        "Identify a meaningful training habit",
        "Explain how the habit supports performance",
        "Recognize the value of consistency"
      ],
      instruction:
        "Choose one habit you built this season that improved your performance. Focus on why it matters and how it helps you become a more disciplined athlete.",
      reflectionQuestions: [
        "What habit did you build?",
        "How consistently did you practice it?",
        "Why does this habit matter in your development?",
        "How has it improved your training or performance?",
        "What would happen if you stopped doing it?"
      ],
      evidenceRequirements: [
        "Habit or routine notes",
        "Training examples",
        "Observed changes in consistency or performance"
      ],
      masteryIndicator:
        "Student can identify a performance-supporting habit and explain its impact."
    },
    {
      id: 18,
      slug: "self-correction",
      title: "Self-Correction",
      prompt: "Describe a moment you adjusted yourself mid-drill. What does that show about your growth?",
      focus: "Independent correction and maturity",
      objectives: [
        "Recognize a self-correction moment",
        "Explain what was adjusted and why",
        "Reflect on what self-correction reveals about growth"
      ],
      instruction:
        "Describe a moment when you noticed a mistake and corrected yourself without waiting for someone else to tell you. Focus on why that matters in athlete development.",
      reflectionQuestions: [
        "What did you notice mid-drill?",
        "What did you correct?",
        "How quickly did you recognize the issue?",
        "Why is self-correction important?",
        "What does this moment show about your maturity as an athlete?"
      ],
      evidenceRequirements: [
        "Training example",
        "Short description of correction",
        "Reflection on independent awareness"
      ],
      masteryIndicator:
        "Student can demonstrate independent awareness and explain its importance in technical growth."
    },
    {
      id: 19,
      slug: "skill-evaluation",
      title: "Skill Evaluation",
      prompt: "What skill still needs major work? What is your plan to fix it?",
      focus: "Honest evaluation and future planning",
      objectives: [
        "Identify a skill weakness honestly",
        "Analyze why it still needs work",
        "Create a plan for improvement"
      ],
      instruction:
        "Choose one skill that still needs major improvement. Be honest and specific. Then explain the plan you will use to improve it going forward.",
      reflectionQuestions: [
        "What skill still needs major work?",
        "Why has it not improved enough yet?",
        "What specific weakness shows up in that skill?",
        "What training plan will help fix it?",
        "How will you measure progress?"
      ],
      evidenceRequirements: [
        "Current weakness description",
        "Improvement plan",
        "Specific future training actions"
      ],
      masteryIndicator:
        "Student can honestly evaluate a weakness and build a practical improvement plan."
    },
    {
      id: 20,
      slug: "mind-body-awareness",
      title: "Mind-Body Awareness",
      prompt: "What did you learn about how your body moves, responds, or adapts?",
      focus: "Body awareness and athletic understanding",
      objectives: [
        "Reflect on how the body responds to training",
        "Recognize adaptation and awareness growth",
        "Connect physical understanding to athletic development"
      ],
      instruction:
        "Think about what this season taught you about your body. Focus on movement, fatigue, adaptation, response, or control. Show that you understand yourself better as an athlete now.",
      reflectionQuestions: [
        "What did you learn about your body this season?",
        "How does your body respond to repetition, fatigue, or correction?",
        "What adaptation surprised you most?",
        "How are you more aware of your movement now?",
        "How will this awareness help you moving forward?"
      ],
      evidenceRequirements: [
        "Personal observations from training",
        "Examples of physical adaptation",
        "Reflection on body awareness"
      ],
      masteryIndicator:
        "Student can reflect on body awareness and explain how understanding the body supports better training."
    }
  ]
};
