// Full courses-data.js rebuilt from the provided curriculum text.
// Structured to work with your existing course.js and module.js.

export const COURSES = [
  {
    id: "sports-training-performance",
    title: "Sports Training & Performance",
    credit: "1.0",
    tagline: "Technique | Discipline | Strength Foundation | Game IQ | Skill Progression",
    description:
      "An in-depth athlete development course designed to transform a student’s natural ability into refined, intelligent, technical performance through sound mechanics, disciplined training habits, foundational strength, game understanding, and sport-specific skill development.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Eligible for .25 / .50 / 1.0 credit"],
      qualifyingMinutes: [
        "Technical drills",
        "Footwork patterns",
        "Mechanics correction",
        "Skill sessions",
        "Strength foundations",
        "Film for technique and IQ",
        "Team practice",
        "Coach-directed private sessions",
        "Independent form-building work"
      ],
      expectations: [
        "Commitment to skill repetition",
        "Effort toward improved form and execution",
        "Basic understanding of biomechanics in sport",
        "Progress in game intelligence and decision-making",
        "Consistent weekly training (5–12 hours+)"
      ]
    },
    grading: {
      lab: "60% - Technique work, repetition cycles, footwork mechanics, timing, control, game scenario drills, and IQ-based study",
      reflection: "20% - Self-correction, technical weakness analysis, footwork and decision-making growth",
      final: "20% - Written technical summary of athletic development"
    },
    syllabus: {
      overview:
        "Athletes learn how to move with efficiency, apply skill with intention, and read the game with intelligence by blending technique, biomechanics, decision-making, and strength fundamentals.",
      outcomes: [
        "Improve execution of key sport-specific skills",
        "Understand how mechanics influence speed, accuracy, and consistency",
        "Demonstrate improved game IQ including spacing, timing, strategy, and anticipation",
        "Apply corrective feedback with independence",
        "Show improved discipline in repetition and skill cycles",
        "Develop a more efficient, balanced, and controlled movement pattern",
        "Communicate why certain techniques work and how they improved"
      ],
      weekly: [
        "Technical skill sessions",
        "Footwork or movement cycles",
        "Game situational drills",
        "Strength foundation work",
        "Repetition-based training",
        "Weekly technical evaluation"
      ],
      materials: [
        "Access to regular skill training",
        "Film access if using IQ or study drills",
        "Ability to record and track training notes",
        "Appropriate athletic gear"
      ]
    },
    modules: [
      { n: 1, title: "Technique Breakdown", prompt: "Describe one technique you improved. What specific adjustments made it better?", subtitle: "Break down one technical skill and explain how adjustment improved execution." },
      { n: 2, title: "Form vs. Speed", prompt: "What happens to your form when you rush? How are you learning to stay controlled?", subtitle: "Reflect on the relationship between speed, control, and sound mechanics." },
      { n: 3, title: "Movement Efficiency", prompt: "Identify a movement pattern you made more efficient. What changed?", subtitle: "Show how improved movement quality reduced wasted motion and improved performance." },
      { n: 4, title: "Skill Consistency", prompt: "What drill helped you create more consistent execution?", subtitle: "Explain how repetition-based work built reliability in a specific skill." },
      { n: 5, title: "Correction Moment", prompt: "Describe a moment when you realized your technique was wrong. How did you correct it?", subtitle: "Reflect on a mistake, recognition, and the correction process." },
      { n: 6, title: "Coach Feedback Application", prompt: "What technical correction did a coach give you this season? Explain how it changed your performance.", subtitle: "Show how coaching feedback turned into measurable improvement." },
      { n: 7, title: "Control & Accuracy", prompt: "How has your accuracy in your sport improved? Be specific.", subtitle: "Connect better mechanics and focus to improved precision." },
      { n: 8, title: "Footwork / Body Positioning", prompt: "What footwork or body positioning improvement made the biggest difference?", subtitle: "Analyze a body-positioning change that improved execution." },
      { n: 9, title: "Timing", prompt: "Describe how your timing in your sport has improved.", subtitle: "Reflect on how better timing changed your performance." },
      { n: 10, title: "Game IQ Growth", prompt: "What is one new game insight you understand now that you didn’t before?", subtitle: "Show growth in your strategic understanding of the game." },
      { n: 11, title: "Scenario Recognition", prompt: "Describe a game scenario you reacted to better because of improved IQ.", subtitle: "Explain how faster recognition led to better decisions." },
      { n: 12, title: "Technique Under Pressure", prompt: "Does your technique fall apart under pressure? How have you improved?", subtitle: "Analyze what happens to your mechanics when pressure increases." },
      { n: 13, title: "Balance & Control", prompt: "Give an example where better balance changed your outcome.", subtitle: "Reflect on how balance and body control influenced a result." },
      { n: 14, title: "Strength Foundations", prompt: "What strength improvements supported your technique?", subtitle: "Connect physical strength development to technical performance." },
      { n: 15, title: "Repetition Discipline", prompt: "How has repetition changed your skill level?", subtitle: "Show how disciplined repetition drove growth." },
      { n: 16, title: "Film Study Insight", prompt: "What did film help you understand about your technique?", subtitle: "Use visual analysis to explain a technical lesson." },
      { n: 17, title: "Habit Formation", prompt: "What training habit have you built that improves performance?", subtitle: "Identify a routine that made you a stronger athlete." },
      { n: 18, title: "Self-Correction", prompt: "Describe a moment you adjusted yourself mid-drill. What does that show about your growth?", subtitle: "Reflect on independent technical awareness and maturity." },
      { n: 19, title: "Skill Evaluation", prompt: "What skill still needs major work? What is your plan to fix it?", subtitle: "Use honest evaluation to identify a weakness and build a plan." },
      { n: 20, title: "Mind-Body Awareness", prompt: "What did you learn about how your body moves, responds, or adapts?", subtitle: "Reflect on physical awareness and athletic adaptation." }
    ],
    exitExam: {
      title: "Exit Exam — Sports Training & Performance",
      prompt:
        "Write a one-page technical summary of your athletic development this season. Include a specific technique or skill you improved, the mechanical adjustments you made, how improved form changed your performance, what you learned about spacing, timing, or game IQ, a situation where better technique led to better execution, and what you plan to improve next season. Focus on the how and why of your growth."
    }
  },
  {
    id: "strength-conditioning",
    title: "Strength & Conditioning",
    credit: "1.0",
    tagline: "Resistance | Conditioning | Progression Tracking | Injury Prevention",
    description:
      "A performance science course designed to help student-athletes build stronger, faster, safer bodies through structured resistance training, conditioning cycles, and progression tracking.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Eligible for .25 / .50 / 1.0 credit"],
      qualifyingMinutes: [
        "Resistance training",
        "Weightlifting fundamentals",
        "Conditioning sessions",
        "Speed and agility work",
        "Mobility training",
        "Injury-prevention exercises",
        "Warm-up/cool-down sequences",
        "Certified coach or trainer sessions",
        "Documented home or gym workouts"
      ],
      expectations: [
        "Consistent commitment to progression",
        "Safe and responsible training practices",
        "Proper form in lifts and conditioning work",
        "Measurable improvement in strength or conditioning",
        "Weekly training typically between 4–10 hours"
      ]
    },
    grading: {
      lab: "60% - Logged workouts, sets, reps, metrics, mobility, recovery, and safety notes",
      reflection: "20% - Mind-body connection, progression, fatigue, and injury-prevention awareness",
      final: "20% - One-page strength and conditioning summary"
    },
    syllabus: {
      overview:
        "Builds athletes from the inside out through safe progression, conditioning science, mobility, recovery, and measurable performance tracking.",
      outcomes: [
        "Demonstrate improved strength markers",
        "Show measurable increases in conditioning",
        "Understand safe lifting and form",
        "Apply progressive overload",
        "Track workouts and analyze long-term progress",
        "Recognize and prevent common overuse injuries",
        "Explain recovery strategies and their importance"
      ],
      weekly: [
        "Strength workouts",
        "Conditioning sessions",
        "Warm-up and mobility",
        "Post-workout recovery",
        "Weekly data entry and self-evaluation"
      ],
      materials: ["Gym access or home-equipment setup", "Ability to log workouts", "Athletic shoes and training equipment"]
    },
    modules: [
      { n: 1, title: "Training Consistency", prompt: "How consistent were you this season? What patterns helped or hurt you?", subtitle: "Reflect on consistency and routine in training." },
      { n: 2, title: "Progressive Overload", prompt: "Describe one exercise where you successfully increased weight, reps, or intensity.", subtitle: "Explain how progression happened over time." },
      { n: 3, title: "Movement Quality", prompt: "What lift or movement improved the most in terms of proper form?", subtitle: "Focus on technical improvement and safe execution." },
      { n: 4, title: "Conditioning Benchmark", prompt: "What conditioning metric (time, speed, endurance) improved for you?", subtitle: "Reflect on a measurable conditioning gain." },
      { n: 5, title: "Strength Plateau", prompt: "Describe a moment where progress slowed. How did you push through it?", subtitle: "Analyze a plateau and how you responded." },
      { n: 6, title: "Recovery Awareness", prompt: "What did you learn about how your body recovers?", subtitle: "Explain what recovery taught you about readiness." },
      { n: 7, title: "Mobility Improvement", prompt: "Identify one mobility area that changed your performance.", subtitle: "Connect mobility gains to better movement." },
      { n: 8, title: "Core Stability", prompt: "How did core strength influence your training or sport?", subtitle: "Show how stability supported performance." },
      { n: 9, title: "Discipline Under Fatigue", prompt: "What did you learn about training when tired?", subtitle: "Reflect on discipline and execution under fatigue." },
      { n: 10, title: "Warm-Up Effectiveness", prompt: "What warm-up routine prepared you best?", subtitle: "Identify a warm-up that improved readiness." },
      { n: 11, title: "Safety & Form", prompt: "Describe a moment you corrected unsafe form.", subtitle: "Show awareness of safe training mechanics." },
      { n: 12, title: "Mental Toughness in Workouts", prompt: "What workout demanded the most mental endurance?", subtitle: "Reflect on the mental side of training." },
      { n: 13, title: "Conditioning Confidence", prompt: "How did improved conditioning affect your confidence in your sport?", subtitle: "Connect preparedness to confidence." },
      { n: 14, title: "Injury Prevention Insight", prompt: "What did you learn about preventing injuries?", subtitle: "Explain what helped you reduce risk." },
      { n: 15, title: "Body Awareness", prompt: "How did your understanding of your body deepen this season?", subtitle: "Reflect on fatigue, soreness, and readiness awareness." },
      { n: 16, title: "Strength-to-Sport Transfer", prompt: "Give one example of how strength work improved sport performance.", subtitle: "Show how training carried over into your sport." },
      { n: 17, title: "Training Habit Formation", prompt: "Which training habit had the biggest long-term impact?", subtitle: "Identify a routine that supported long-term growth." },
      { n: 18, title: "Self-Coaching Moment", prompt: "Describe a time you noticed a mistake and fixed it yourself.", subtitle: "Reflect on independent awareness during training." },
      { n: 19, title: "Nutrition / Fuel Awareness", prompt: "What did you learn about fueling your training?", subtitle: "Connect nutrition to performance and recovery." },
      { n: 20, title: "Next-Phase Development", prompt: "What is your next strength or conditioning goal — and why?", subtitle: "Set a meaningful next training goal." }
    ],
    exitExam: {
      title: "Exit Exam — Strength & Conditioning",
      prompt:
        "Write a one-page Strength & Conditioning summary describing your progression this season. Include strength improvements, conditioning gains, a plateau or challenge and how you overcame it, a safety or form correction you made, how training improved your sport performance, and your top goal for the next training cycle."
    }
  },
  {
    id: "high-performance-athletic-development",
    title: "High-Performance Athletic Development",
    credit: "1.0",
    tagline: "Multi-Sport | Advanced Concepts | Adaptability | Performance Science",
    description:
      "Momentum’s advanced training theory course for serious or multi-sport athletes, blending physical preparation, performance science, adaptability, cross-training, and elite mindset habits.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Eligible for .25 / .50 / 1.0 credit"],
      qualifyingMinutes: ["Multi-sport practices", "Cross-training sessions", "Speed, agility, and explosive work", "Multi-skill coordination development", "Strength and advanced conditioning", "Recovery sessions", "Cross-sport film study", "Pre-season or off-season training cycles", "Performance planning or goal-setting sessions"],
      expectations: ["Adaptability across training styles", "Willingness to try new methods or disciplines", "Advanced physical awareness", "Purposeful focused training", "Consistent schedule (6–15 hours weekly)", "High-level reflection on performance"]
    },
    grading: { lab: "60% - Cross-training logs, data tracking, explosive work, recovery, and performance-cycle notes", reflection: "20% - Adaptability, elite mindset, stress management, and regulation", final: "20% - One-page elite development summary" },
    syllabus: {
      overview: "Prepares athletes for peak performance through adaptability, cross-sport transfer, advanced training concepts, recovery, regulation, and long-term development.",
      outcomes: ["Demonstrate improved performance across multiple domains", "Explain how cross-training enhances sport performance", "Apply periodization, adaptation, and energy-system concepts", "Recognize performance peaks, plateaus, and recovery cycles", "Develop elite performance habits", "Demonstrate emotional regulation under pressure"],
      weekly: ["Multi-sport or advanced training sessions", "Speed, strength, or explosive work", "Weekly reflection on adjustments", "Data tracking", "Film or performance analysis"],
      materials: ["Access to structured athletic training", "Film access if available", "Ability to track multi-method training", "Athletic gear for multiple environments"]
    },
    modules: [
      { n: 1, title: "Adaptability Moment", prompt: "Describe a situation where you had to adapt your training or mindset quickly.", subtitle: "Reflect on a quick adjustment in training or mentality." },
      { n: 2, title: "Cross-Sport Transfer", prompt: "What is one lesson or skill from a different sport that improved your performance?", subtitle: "Show how crossover learning strengthened you." },
      { n: 3, title: "Physical Intelligence", prompt: "How did your awareness of your body improve this season?", subtitle: "Reflect on growth in body awareness." },
      { n: 4, title: "Energy Systems Awareness", prompt: "What did you learn about fatigue, pacing, or explosive energy?", subtitle: "Analyze what your body taught you about performance demands." },
      { n: 5, title: "Multidimensional Growth", prompt: "Identify one improvement in strength, one in conditioning, and one in skill.", subtitle: "Evaluate progress across multiple athletic qualities." },
      { n: 6, title: "Periodization Experience", prompt: "Describe a time your training intensity changed (pre-season vs in-season). What did you learn?", subtitle: "Explain what phase-based training taught you." },
      { n: 7, title: "Peak vs. Plateau", prompt: "Explain a moment where you hit a peak — and a moment where you hit a plateau.", subtitle: "Compare a breakthrough with a slowdown." },
      { n: 8, title: "Mental Regulation", prompt: "What strategy helped you regain focus under pressure?", subtitle: "Identify a focus-reset tool that worked." },
      { n: 9, title: "Long-Term Development", prompt: "How has your thinking shifted about long-term athletic growth?", subtitle: "Show growth in maturity and perspective." },
      { n: 10, title: "Recovery Intelligence", prompt: "What did you learn about rest, recovery, or injury prevention?", subtitle: "Reflect on what better recovery thinking changed." },
      { n: 11, title: "Identity as an Athlete", prompt: "How has your identity evolved through multi-sport or advanced training?", subtitle: "Describe how your athlete identity changed." },
      { n: 12, title: "Strategic Choice", prompt: "Describe one strategic adjustment that changed your performance.", subtitle: "Show how one decision improved results." },
      { n: 13, title: "Movement Versatility", prompt: "What new type of movement did you improve?", subtitle: "Reflect on growth in a new movement demand." },
      { n: 14, title: "High-Performance Habit", prompt: "What habit did you adopt that made you a stronger high-performance athlete?", subtitle: "Identify a routine that supported elite development." },
      { n: 15, title: "Emotional Endurance", prompt: "How did you manage frustration, fear, or pressure this season?", subtitle: "Reflect on emotional resilience." },
      { n: 16, title: "Self-Evaluation", prompt: "What did you learn about evaluating your performance honestly?", subtitle: "Show growth in honest self-analysis." },
      { n: 17, title: "Multi-Environment Training", prompt: "How did training in different environments change you?", subtitle: "Explain what varied settings taught you." },
      { n: 18, title: "Competitive Maturity", prompt: "What does being a mature competitor mean to you now?", subtitle: "Define mature competition through your experience." },
      { n: 19, title: "Elite Preparation", prompt: "What pre-performance routine helped you perform at a higher level?", subtitle: "Identify a routine that improved readiness." },
      { n: 20, title: "Next-Stage Development", prompt: "What do you believe is your next breakthrough — physically, mentally, or strategically?", subtitle: "Project the next phase of your growth." }
    ],
    exitExam: { title: "Exit Exam — High-Performance Athletic Development", prompt: "Write a one-page summary explaining your growth as a high-performance athlete. Include how you adapted throughout the season, what you learned from cross-training or multi-sport involvement, a key breakthrough, how your understanding of long-term development changed, what high-performance habits you built, and your next-phase athletic plan." }
  },
  {
    id: "competitive-athletics",
    title: "Competitive Athletics",
    credit: "1.0",
    tagline: "High-Level Leagues | Tournaments | Showcases | Performance Execution",
    description: "A performance-driven course for athletes who compete in leagues, tournaments, club circuits, or showcase environments where execution, focus, composure, and readiness matter.",
    requirements: {
      credit: ["1.0 Credit = 9,000 verified minutes", "Eligible for .25 / .50 / 1.0 credit"],
      qualifyingMinutes: ["League games", "Tournaments", "Showcases", "Competitive travel events", "Pre-game warmups", "Post-game recovery", "Film for competition review", "Strategy sessions", "High-level practices preparing for competition", "Performance planning or scouting assignments"],
      expectations: ["Active competitive participation", "Responsible travel and time management", "Emotional maturity during games", "Ability to analyze competitive performance", "Consistent effort and sportsmanship"]
    },
    grading: { lab: "60% - Tournament logs, performance reviews, warmups, adjustments, scouting and recovery notes", reflection: "20% - Pressure handling, emotional maturity, resilience, and lessons from wins and losses", final: "20% - One-page competition summary" },
    syllabus: {
      overview: "Teaches athletes how to prepare, perform, adjust, and recover in high-pressure competitive environments.",
      outcomes: ["Demonstrate improved competitive awareness", "Navigate high-pressure moments with composure", "Understand warmup, mindset, and preparation cycles", "Adjust strategically in competition", "Evaluate personal performance honestly", "Show maturity in wins, losses, and adversity"],
      weekly: ["Active participation in games or tournaments", "Pre-game preparation", "Game-day execution", "Competitive review notes", "Weekly reflection submissions"],
      materials: ["Access to competitive events", "Ability to track game performance", "Athletic equipment for competition", "Internet access for submissions"]
    },
    modules: [
      { n: 1, title: "Game-Day Mindset", prompt: "How do you feel before a big game? What helps you regulate your nerves?", subtitle: "Reflect on your pre-competition mindset." },
      { n: 2, title: "Pressure Moment", prompt: "Describe a high-pressure play. How did you respond?", subtitle: "Analyze a critical moment under pressure." },
      { n: 3, title: "Competitive Adjustment", prompt: "What mid-game or mid-match adjustment did you make?", subtitle: "Show how you adapted during live competition." },
      { n: 4, title: "Opponent Awareness", prompt: "What did you learn from watching or playing against tougher opponents?", subtitle: "Reflect on lessons from stronger competition." },
      { n: 5, title: "Travel Fatigue", prompt: "How did travel, hotels, or long days impact performance?", subtitle: "Explain how travel affected readiness and execution." },
      { n: 6, title: "Game Speed", prompt: "Describe how the game felt faster — and how you adapted.", subtitle: "Analyze how you adjusted to a faster pace." },
      { n: 7, title: "Mistake Recovery", prompt: "How quickly do you recover mentally after a mistake? How has this changed?", subtitle: "Reflect on resilience after mistakes." },
      { n: 8, title: "Emotional Control", prompt: "What emotion is hardest for you to manage during competition?", subtitle: "Identify an emotion that affects your performance." },
      { n: 9, title: "Performance Under Pressure", prompt: "Identify a moment you executed well when it mattered.", subtitle: "Describe a success in a critical moment." },
      { n: 10, title: "Performance Breakdown", prompt: "Choose a poor moment. Why did it happen?", subtitle: "Reflect honestly on a poor competitive moment." },
      { n: 11, title: "Role Identity", prompt: "What is your role on your competitive team? Has it evolved?", subtitle: "Explain your role and how it changed." },
      { n: 12, title: "Showcase Experience", prompt: "If you’ve competed at a showcase, what did that environment teach you?", subtitle: "Reflect on lessons from showcase settings." },
      { n: 13, title: "Tournament Adaptability", prompt: "What did you learn about playing multiple games in one weekend?", subtitle: "Analyze the demands of tournament play." },
      { n: 14, title: "Game IQ Under Stress", prompt: "How did your decision-making change when the game got tight?", subtitle: "Reflect on your thinking when pressure increased." },
      { n: 15, title: "Competitive Strength", prompt: "What is your greatest competitive strength?", subtitle: "Identify your strongest competitive quality." },
      { n: 16, title: "Competitive Weakness", prompt: "What weakness did competition expose?", subtitle: "Show what competition revealed that still needs work." },
      { n: 17, title: "Rivalry Motivation", prompt: "Describe a team or opponent that pushes you to be better.", subtitle: "Reflect on how rivalry sharpened your development." },
      { n: 18, title: "Winning & Losing", prompt: "What did a win or loss this season teach you?", subtitle: "Compare the lessons of victory and defeat." },
      { n: 19, title: "Leadership in Competition", prompt: "How do you lead in competitive moments?", subtitle: "Describe your leadership under pressure." },
      { n: 20, title: "Competitive Goal", prompt: "What is one competitive goal for next season?", subtitle: "Set a clear goal for your next season." }
    ],
    exitExam: { title: "Exit Exam — Competitive Athletics", prompt: "Write a one-page summary of your competitive season. Include a major tournament, league game, or showcase, your preparation before the event, a key moment where you had to adjust under pressure, what the experience revealed about your strengths and weaknesses, how competition changed you as an athlete, and what you will focus on for your next season." }
  },
  {
    id: "health-wellness-for-athletes",
    title: "Health & Wellness for Athletes",
    credit: "1.0",
    tagline: "Sleep | Stress | Mental Health | Recovery | Lifestyle Habits",
    description: "A holistic development course focused on sleep, recovery, stress, emotional regulation, self-care, and sustainable wellness habits for athletes.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Eligible for .25 / .50 / 1.0 credit"],
      qualifyingMinutes: ["Sleep tracking", "Stress-management activities", "Breathwork or mindfulness practice", "Recovery sessions", "Wellness journaling", "Mental health exercises", "Lifestyle habit routines", "Assigned wellness content", "Nutrition prep or hydration planning"],
      expectations: ["Effort toward healthier routines", "Tracking recovery habits", "Awareness of emotional and physical well-being", "Consistent and honest reflection", "Engagement in wellness practices beyond training"]
    },
    grading: { lab: "60% - Sleep analysis, stress management, recovery, journaling, and wellness routine logs", reflection: "20% - Emotional awareness, burnout insight, self-compassion, and habit growth", final: "20% - One-page wellness summary" },
    syllabus: { overview: "Helps athletes build lives that support performance through sleep, recovery, emotional regulation, mental health awareness, hydration, and healthy routines.", outcomes: ["Understand how the body responds to stress, rest, and routine", "Build healthy sleep and recovery habits", "Identify emotional triggers and regulate responses", "Develop self-care strategies and healthy boundaries", "Recognize burnout signs and apply correction strategies", "Develop healthier relationships with training and self"], weekly: ["Daily wellness habits", "Sleep and stress tracking", "Recovery routines", "Emotional reflection", "Weekly wellness review"], materials: ["Journal or notes app", "Comfortable recovery space", "Access to sleep tracking"] },
    modules: [
      { n: 1, title: "Sleep Awareness", prompt: "How has sleep affected your mood or energy this season?", subtitle: "Reflect on the connection between sleep and performance." },
      { n: 2, title: "Stress Trigger", prompt: "Identify one source of stress. How did it affect your mind or body?", subtitle: "Analyze a meaningful stressor." },
      { n: 3, title: "Emotional Check-In", prompt: "What emotion did you experience most this season? Why?", subtitle: "Reflect on your most common emotional state." },
      { n: 4, title: "Recovery Habit", prompt: "Which recovery routine helped your body the most?", subtitle: "Identify a recovery habit that made a difference." },
      { n: 5, title: "Breathwork or Calm Moment", prompt: "Describe a moment when deep breathing or calm focus helped you reset.", subtitle: "Show how slowing down supported recovery." },
      { n: 6, title: "Mental Fatigue", prompt: "When did your mind feel tired? What caused it?", subtitle: "Analyze a period of mental fatigue." },
      { n: 7, title: "Physical Fatigue", prompt: "When did your body feel overworked? How did you respond?", subtitle: "Describe how you noticed and handled overload." },
      { n: 8, title: "Boundaries", prompt: "Where did you learn to say no or set a limit this season?", subtitle: "Reflect on a healthy boundary." },
      { n: 9, title: "Eating or Hydration Habit", prompt: "What small nutrition or hydration change made a difference?", subtitle: "Identify a simple change that supported wellness." },
      { n: 10, title: "Self-Compassion", prompt: "When did you show kindness to yourself instead of criticism?", subtitle: "Reflect on a healthier internal response." },
      { n: 11, title: "Mind-Body Connection", prompt: "What did you learn about how your thoughts affect your energy?", subtitle: "Explain how mindset influenced physical wellness." },
      { n: 12, title: "Burnout Sign", prompt: "Identify one sign of burnout you experienced. What helped?", subtitle: "Describe how you recognized and addressed burnout." },
      { n: 13, title: "Daily Routine", prompt: "What part of your daily routine supports your wellness the most?", subtitle: "Identify a routine that gives you stability." },
      { n: 14, title: "Emotional Growth", prompt: "Describe a moment when you handled a tough emotion better than before.", subtitle: "Show growth in emotional regulation." },
      { n: 15, title: "Stress Response", prompt: "How do you react when overwhelmed? How has this changed?", subtitle: "Reflect on your stress response pattern." },
      { n: 16, title: "Recovery Priority", prompt: "What recovery strategy are you learning to value more?", subtitle: "Explain what recovery practice matters more now." },
      { n: 17, title: "Lifestyle Choice", prompt: "What lifestyle decision improved your overall well-being?", subtitle: "Identify a choice that supported healthier living." },
      { n: 18, title: "Support System", prompt: "Who helps you stay mentally and emotionally healthy?", subtitle: "Reflect on the people who support your well-being." },
      { n: 19, title: "Mental Reset", prompt: "Describe a moment you intentionally slowed down.", subtitle: "Show the value of pausing and resetting." },
      { n: 20, title: "Future Wellness Goal", prompt: "What is one wellness habit you want to develop next?", subtitle: "Set one practical wellness goal." }
    ],
    exitExam: { title: "Exit Exam — Health & Wellness for Athletes", prompt: "Write a one-page wellness summary describing how you grew as a whole athlete this season. Include how your sleep, stress, or recovery habits changed, what you learned about your emotional health, a moment where you managed stress or burnout effectively, how lifestyle habits improved your training, energy, or mindset, and the wellness habit you want to strengthen next." }
  },
  {
    id: "athletic-health-recovery",
    title: "Athletic Health & Recovery",
    credit: "1.0",
    tagline: "Mobility | Stretching | Recovery Protocols | Safe Training Practices",
    description: "A science-based course designed to help athletes protect their bodies, maintain mobility, prevent injuries, and improve long-term performance through structured recovery routines and safe training practices.",
    requirements: { credit: ["1.0 Credit = 9,000 minutes", "Eligible for .25 / .50 / 1.0 credit"], qualifyingMinutes: ["Mobility training", "Active and passive stretching", "Dynamic warmups", "Cooldown routines", "Foam rolling or soft-tissue techniques", "Contrast recovery", "Mobility circuits", "Stability exercises", "Safe training practice and form reviews", "Hydration and tissue-health routines"], expectations: ["Consistent mobility or recovery work", "Responsible use of recovery techniques", "Understanding of movement quality", "Ability to identify soreness vs. injury", "Awareness of safe training patterns"] },
    grading: { lab: "60% - Mobility sessions, stretching protocols, stability work, recovery routines, and soreness tracking", reflection: "20% - Body awareness, tightness patterns, safe movement, and recovery insights", final: "20% - One-page recovery summary" },
    syllabus: { overview: "Teaches athletes how to care for their bodies through mobility science, flexibility training, tissue recovery, hydration, warmup and cooldown systems, and safe movement mechanics.", outcomes: ["Demonstrate improved mobility or range of motion", "Apply safe stretching and mobility techniques", "Identify early signs of strain, tightness, or overuse", "Use proper warmup and cooldown systems", "Understand recovery cycles and tissue repair", "Build habits that protect long-term athletic health"], weekly: ["Daily or weekly mobility routines", "Warmup and cooldown design", "Tracking soreness and recovery", "Weekly self-evaluation", "Form review and safe training awareness"], materials: ["Space for stretching or mobility work", "Foam roller, bands, or recovery tools (optional)", "Access to warm-up/cool-down routines", "Notes app or journal"] },
    modules: [
      { n: 1, title: "Body Scan Awareness", prompt: "Describe one muscle group that tends to get tight. What causes it?", subtitle: "Reflect on a repeated tightness pattern." },
      { n: 2, title: "Range of Motion", prompt: "What area of your body gained the most mobility this season?", subtitle: "Identify a meaningful mobility gain." },
      { n: 3, title: "Movement Limitation", prompt: "Identify a movement you couldn’t do as well because of tightness or stiffness.", subtitle: "Explain how limited mobility affected performance." },
      { n: 4, title: "Warmup Check-In", prompt: "What warmup routine prepares your body the best?", subtitle: "Reflect on a warmup that improves readiness." },
      { n: 5, title: "Cooldown Realization", prompt: "What did you learn about cooling down after training?", subtitle: "Show what cooldowns taught you about recovery." },
      { n: 6, title: "Soreness Pattern", prompt: "What soreness pattern did you notice? Where does it show up most?", subtitle: "Analyze recurring soreness and what it revealed." },
      { n: 7, title: "Tension Release", prompt: "Describe a stretching or mobility exercise that gave immediate relief.", subtitle: "Identify a recovery tool that helped quickly." },
      { n: 8, title: "Joint Health Awareness", prompt: "Which joint needs more support or mobility?", subtitle: "Reflect on a joint that needs extra care." },
      { n: 9, title: "Recovery Mistake", prompt: "Describe a time you didn’t recover properly. What happened next?", subtitle: "Analyze the consequences of poor recovery." },
      { n: 10, title: "Form Safety", prompt: "Share a moment where you fixed unsafe form or mechanics.", subtitle: "Show awareness of safer movement." },
      { n: 11, title: "Injury Prevention Insight", prompt: "What did you learn about preventing overuse injuries?", subtitle: "Explain a lesson in staying healthy." },
      { n: 12, title: "Hydration or Tissue Health", prompt: "How did hydration affect soreness or muscle function?", subtitle: "Connect hydration to recovery and function." },
      { n: 13, title: "Stability Training", prompt: "What stability exercise helped you feel more balanced?", subtitle: "Reflect on an exercise that improved support and control." },
      { n: 14, title: "Muscle Activation", prompt: "Which activation drill makes you feel the most prepared?", subtitle: "Identify a drill that improves readiness." },
      { n: 15, title: "Flexibility Progress", prompt: "Where did you see real improvement in flexibility?", subtitle: "Explain a meaningful flexibility gain." },
      { n: 16, title: "Body Awareness Growth", prompt: "What did you learn about listening to your body?", subtitle: "Reflect on greater self-awareness and responsiveness." },
      { n: 17, title: "Recovery Routine You Value", prompt: "Which recovery habit will you continue after this course?", subtitle: "Identify a sustainable body-care habit." },
      { n: 18, title: "Movement Quality", prompt: "How has focusing on movement quality changed your training?", subtitle: "Show how quality-first movement improved performance." },
      { n: 19, title: "Early Warning Signs", prompt: "What early signs of strain or fatigue did you catch this season?", subtitle: "Reflect on recognizing issues before they grew." },
      { n: 20, title: "Long-Term Health Goal", prompt: "What is one long-term body-care or mobility goal you now have?", subtitle: "Set a long-term physical health goal." }
    ],
    exitExam: { title: "Exit Exam — Athletic Health & Recovery", prompt: "Write a one-page summary of your recovery and mobility development this season. Include areas where you gained mobility or flexibility, a recovery routine that changed how your body felt, a form or safety correction you learned, one moment when recovery prevented injury or soreness, how improved mobility changed your performance, and the recovery habit you plan to keep long-term." }
  },
  {
    id: "nutrition-for-athletes",
    title: "Nutrition for Athletes",
    credit: "0.5–1.0",
    tagline: "Hydration | Sports Nutrition | Fuel Timing | Recovery-Based Eating",
    description: "A performance-fueling course that teaches student-athletes how to nourish their bodies for strength, endurance, recovery, and overall athletic success through practical sports nutrition.",
    requirements: { credit: ["0.5 Credit = 4,500 minutes", "1.0 Credit = 9,000 minutes"], qualifyingMinutes: ["Meal planning", "Fuel logs", "Hydration tracking", "Game-day fueling plans", "Grocery list building", "Post-game recovery meals", "Nutrition education videos or readings", "Tracking hunger cues or energy levels", "Creating balanced meals or snacks", "Pre- and post-workout fueling routines"], expectations: ["Improved understanding of fueling", "Consistent meal or hydration tracking", "Application of nutrition concepts to training", "Ability to explain how foods impact performance", "Creation of at least one personalized fueling plan"] },
    grading: { lab: "60% - Fuel logs, hydration logs, meal planning, energy tracking, and nutrition experiments", reflection: "20% - Energy patterns, recovery needs, hydration habits, fueling awareness, and corrections", final: "20% - One-page fueling summary" },
    syllabus: { overview: "Teaches athletes how to fuel their bodies with intention by understanding macronutrients, hydration science, recovery-based eating, and performance-fueling strategies.", outcomes: ["Build a balanced athlete-focused meal", "Identify foods that boost or drain energy", "Understand hydration needs and electrolytes", "Create pre- and post-game fueling plans", "Track energy levels and connect them to nutrition", "Explain how nutrition impacts recovery", "Make smart eating decisions during tournaments or travel"], weekly: ["Meal or hydration tracking", "Fueling plan creation", "Weekly energy evaluation", "Nutrition-based corrections", "Recovery meal planning"], materials: ["Access to meals or snacks", "Hydration tools", "Notes app or journal", "Ability to track daily intake"] },
    modules: [
      { n: 1, title: "Energy Awareness", prompt: "When did you feel the most energized during practice, and what did you eat beforehand?", subtitle: "Connect energy levels to pre-practice fueling." },
      { n: 2, title: "Pre-Game Fueling", prompt: "What pre-practice or pre-game snack works best for you?", subtitle: "Identify a snack or meal that supports performance." },
      { n: 3, title: "Hydration Check-In", prompt: "How does hydration change your focus or stamina?", subtitle: "Reflect on the performance effects of hydration." },
      { n: 4, title: "Electrolyte Insight", prompt: "Describe a moment when electrolytes improved your performance.", subtitle: "Explain how electrolyte support changed how you felt or performed." },
      { n: 5, title: "Recovery Meal", prompt: "What post-game meal made your body feel restored?", subtitle: "Reflect on a recovery meal that worked well." },
      { n: 6, title: "Energy Crash Moment", prompt: "Describe one time you felt tired during a workout. What caused it nutritionally?", subtitle: "Analyze a fueling mistake or gap." },
      { n: 7, title: "Food Label Awareness", prompt: "What is one thing you learned from reading a food label this season?", subtitle: "Show growth in nutrition awareness." },
      { n: 8, title: "Balanced Plate", prompt: "Describe your most balanced athlete meal this season.", subtitle: "Break down a strong performance-supporting meal." },
      { n: 9, title: "Hunger Cues", prompt: "What did you learn about listening to hunger or fullness signals?", subtitle: "Reflect on body awareness related to fueling." },
      { n: 10, title: "Tournament Fueling", prompt: "How did food affect your performance during a long day or tournament?", subtitle: "Explain how tournament fueling changed your energy." },
      { n: 11, title: "Protein Importance", prompt: "What protein choice helped your recovery the most?", subtitle: "Identify a recovery-supporting protein source." },
      { n: 12, title: "Breakfast Pattern", prompt: "How does your breakfast impact your morning energy?", subtitle: "Reflect on the importance of breakfast and early energy." },
      { n: 13, title: "Snack Timing", prompt: "Describe how timing your snacks changed your performance.", subtitle: "Connect food timing to performance changes." },
      { n: 14, title: "Hydration Mistake", prompt: "Describe a day when you did not hydrate well. What happened?", subtitle: "Analyze the cost of poor hydration." },
      { n: 15, title: "Healthy Habit Formation", prompt: "What fueling habit did you develop this season?", subtitle: "Identify a sustainable nutrition habit." },
      { n: 16, title: "Nutrient Timing", prompt: "What did you learn about eating before vs. after training?", subtitle: "Reflect on how timing affects energy and recovery." },
      { n: 17, title: "Food Sensitivity Awareness", prompt: "Did any food make you feel sluggish, bloated, or tired?", subtitle: "Identify a food response that affected performance." },
      { n: 18, title: "Travel Fueling", prompt: "What fueling choices worked well during travel?", subtitle: "Reflect on practical nutrition decisions away from home." },
      { n: 19, title: "Performance Connection", prompt: "Which nutrition change had the biggest impact on your performance?", subtitle: "Identify the most important nutrition adjustment you made." },
      { n: 20, title: "Future Fuel Goal", prompt: "What fueling habit will you carry into next season?", subtitle: "Set a long-term fueling goal." }
    ],
    exitExam: { title: "Exit Exam — Nutrition for Athletes", prompt: "Write a one-page fueling summary describing how your nutrition changed your performance this season. Include a nutrition change that improved your energy, a hydration habit that made a difference, one fueling mistake you corrected, your pre-game and post-game fueling plan, how nutrition supported recovery or stamina, and your next fueling goal moving forward." }
  },
  {
    id: "sports-leadership",
    title: "Sports Leadership",
    credit: "1.0",
    tagline: "Captains | Influence | Team Standards | Communication | Responsibility",
    description: "An impact-driven course designed for athletes who want to lead, inspire, and elevate the people around them through communication, accountability, standards-setting, and emotional maturity.",
    requirements: { credit: ["1.0 Credit = 9,000 minutes", "Available in .25 / .50 / 1.0 formats"], qualifyingMinutes: ["Leadership roles in practice or games", "Team communication responsibilities", "Captains’ meetings", "Warm-ups led by the athlete", "Peer mentoring", "Handling team logistics", "Conflict resolution moments", "Encouragement or morale-building actions", "Film or strategy discussions", "Reflection on leadership scenarios"], expectations: ["Positive leadership effort", "Responsibility and maturity", "Engagement in communication tasks", "Honest reflection on successes and failures", "Upholding and modeling team standards"] },
    grading: { lab: "60% - Leadership actions, communication logs, influence moments, and team support", reflection: "20% - Integrity, responsibility, influence, accountability, and emotional intelligence", final: "20% - One-page leadership summary" },
    syllabus: { overview: "Teaches athletes how to become the voice, example, and stabilizing presence a team needs through communication, support, accountability, and culture-building.", outcomes: ["Demonstrate improved communication in team settings", "Lead warm-ups or drills effectively", "Set and reinforce positive team standards", "Resolve or de-escalate peer conflict", "Support teammates emotionally and mentally", "Reflect deeply on leadership strengths and weaknesses", "Articulate a personal leadership style"], weekly: ["Leadership in at least one team moment", "Reflection on communication or influence", "Observations on team culture", "Responsibility in practice or game situations", "Weekly leadership growth journal"], materials: ["Access to team practices or games", "Ability to track leadership actions", "Notes app or journal"] },
    modules: [
      { n: 1, title: "Standard Setting", prompt: "What standard did you personally raise for yourself this season?", subtitle: "Reflect on a higher personal standard you committed to." },
      { n: 2, title: "Team Influence", prompt: "Describe one moment you influenced the effort or energy of your team.", subtitle: "Show how your presence affected the group." },
      { n: 3, title: "Leadership Strength", prompt: "What is your strongest leadership trait right now?", subtitle: "Identify a current leadership strength." },
      { n: 4, title: "Leadership Weakness", prompt: "What leadership habit needs the most growth?", subtitle: "Reflect honestly on a leadership weakness." },
      { n: 5, title: "Communication Moment", prompt: "Share a moment when your communication helped a teammate.", subtitle: "Describe communication that made a positive difference." },
      { n: 6, title: "Conflict Resolution", prompt: "Describe a time you helped calm tension or solve a problem.", subtitle: "Analyze a moment of conflict resolution." },
      { n: 7, title: "Leading by Example", prompt: "When did your actions speak louder than words?", subtitle: "Reflect on a moment when behavior set the tone." },
      { n: 8, title: "Responsibility Check", prompt: "Describe a mistake you owned publicly.", subtitle: "Show maturity in taking responsibility." },
      { n: 9, title: "Encouragement", prompt: "How did you support someone who was struggling?", subtitle: "Reflect on emotional support and encouragement." },
      { n: 10, title: "Tough Conversation", prompt: "Describe a moment when you had to tell a teammate something hard but helpful.", subtitle: "Analyze a difficult but necessary conversation." },
      { n: 11, title: "Emotional Control", prompt: "How do you manage your emotions when leading?", subtitle: "Reflect on emotional regulation in leadership." },
      { n: 12, title: "Leadership in Loss", prompt: "How did you show leadership after a disappointing game?", subtitle: "Show how you responded to disappointment as a leader." },
      { n: 13, title: "Leadership in Success", prompt: "How did you demonstrate humility after a great performance?", subtitle: "Reflect on humility when things went well." },
      { n: 14, title: "Mentoring", prompt: "Describe a teammate you invested in. What did they need?", subtitle: "Explain how you supported someone else’s growth." },
      { n: 15, title: "Team Culture", prompt: "What is one cultural change you contributed to?", subtitle: "Show how you shaped team culture." },
      { n: 16, title: "Pressure Leadership", prompt: "Describe how you led when the team felt anxious or overwhelmed.", subtitle: "Analyze leadership under stress." },
      { n: 17, title: "Accountability Moment", prompt: "How did you help a teammate get back on track?", subtitle: "Reflect on helping restore accountability." },
      { n: 18, title: "Listening Skill", prompt: "What did you learn about the importance of listening as a leader?", subtitle: "Show why listening matters in leadership." },
      { n: 19, title: "Leadership Growth", prompt: "How have you grown as a leader since the beginning of the season?", subtitle: "Reflect on leadership development over time." },
      { n: 20, title: "Leadership Legacy", prompt: "What do you want teammates to remember about your leadership?", subtitle: "Define the impact you want to leave." }
    ],
    exitExam: { title: "Exit Exam — Sports Leadership", prompt: "Write a one-page leadership summary describing how you grew as a leader this season. Include how you influenced or supported teammates, a moment where leadership felt difficult, a leadership win you are proud of, how your communication and responsibility improved, what leadership now means to you, and the leader you hope to become moving forward." }
  },
  {
    id: "sportsmanship-character-development",
    title: "Sportsmanship & Character Development",
    credit: "1.0",
    tagline: "Ethics | Attitude | Respect | Emotional Maturity | Self-Control",
    description: "A values-driven course designed to shape not just athletes, but people, by teaching integrity, humility, emotional maturity, respect, self-control, and ethical behavior.",
    requirements: { credit: ["1.0 Credit = 9,000 minutes", "Available for .25 / .50 / 1.0 credit"], qualifyingMinutes: ["Acts of sportsmanship", "Emotional regulation moments", "Ethical decision-making", "Apologies, accountability, and restitution", "Respect-centered actions", "Team and opponent interactions", "Observation of professional role models", "Community or team service", "Reflection and character journals"], expectations: ["Effort to grow in character", "Honest reflection on emotions and reactions", "Support for teammates", "Respect toward opponents, coaches, and officials", "Responsibility when falling short"] },
    grading: { lab: "60% - Character actions, accountability moments, sportsmanship logs, service, and ethical decisions", reflection: "20% - Emotional maturity, integrity, respect, self-control, and values", final: "20% - One-page character reflection" },
    syllabus: { overview: "Helps athletes understand that sport is shaping their character through emotional regulation, humility, honesty, respect, responsibility, and ethical decision-making.", outcomes: ["Demonstrate respect for opponents, officials, teammates, and coaches", "Communicate with maturity and self-control", "Recognize emotional triggers and regulate responses", "Show honesty, humility, and responsibility", "Make ethical decisions during competition", "Reflect deeply on attitudes, motives, and behaviors"], weekly: ["Character-based reflection", "Observations of sportsmanship moments", "Team or community support actions", "Emotional check-ins", "Ethical decision analysis"], materials: ["Notes app or journal", "Access to competitive or practice environments", "Willingness to reflect honestly"] },
    modules: [
      { n: 1, title: "Attitude Check", prompt: "Describe a moment this season when your attitude shaped your experience — positively or negatively.", subtitle: "Reflect on how attitude affected an outcome." },
      { n: 2, title: "Respect in Action", prompt: "How did you show respect to teammates, coaches, officials, or opponents?", subtitle: "Show how respect looked in real situations." },
      { n: 3, title: "Emotional Trigger", prompt: "What situation triggers frustration in you? How did you respond differently this season?", subtitle: "Analyze a trigger and your response." },
      { n: 4, title: "Integrity Moment", prompt: "When did you do the right thing even when no one noticed?", subtitle: "Reflect on a private moment of integrity." },
      { n: 5, title: "Taking Responsibility", prompt: "Describe a moment you took ownership instead of making excuses.", subtitle: "Show growth in accountability." },
      { n: 6, title: "Grace in Defeat", prompt: "How did you handle a moment of disappointment or loss?", subtitle: "Reflect on your response to defeat." },
      { n: 7, title: "Humility in Victory", prompt: "When did you show maturity or humility after success?", subtitle: "Describe success handled with character." },
      { n: 8, title: "Influence on Others", prompt: "Describe a way your character impacted someone else.", subtitle: "Reflect on the effect of your conduct on others." },
      { n: 9, title: "Handling Conflict", prompt: "What did you learn about addressing conflict respectfully?", subtitle: "Analyze a conflict and what respectful response required." },
      { n: 10, title: "Self-Control", prompt: "Describe one moment you controlled your emotions instead of reacting.", subtitle: "Show a moment of restraint and maturity." },
      { n: 11, title: "Ethical Decision", prompt: "What ethical choice did you face, and what did you choose?", subtitle: "Reflect on a right-versus-easy decision." },
      { n: 12, title: "Words That Matter", prompt: "Share a moment when your words built someone up — or tore someone down. What did you learn?", subtitle: "Analyze the impact of your words." },
              { n: 13, title: "Compassion", prompt: "Describe a moment when you helped or comforted a teammate.", subtitle: "Reflect on compassion shown in a real team moment." },
      { n: 14, title: "Personal Weakness", prompt: "Which character trait needs the most growth in your life right now?", subtitle: "Identify a character area that still needs work." },
      { n: 15, title: "Personal Strength", prompt: "Which character trait do you feel proud of developing?", subtitle: "Reflect on a trait that has grown stronger." },
      { n: 16, title: "Role Model", prompt: "Who do you look up to for character? What quality do they show that you want?", subtitle: "Identify a role model and the trait you admire." },
      { n: 17, title: "Growth Through Sports", prompt: "What part of your sport has grown your character the most?", subtitle: "Explain how sport has shaped who you are." },
      { n: 18, title: "Forgiveness", prompt: "Describe a moment you forgave or were forgiven. What did it teach you?", subtitle: "Reflect on what forgiveness taught you about maturity." },
      { n: 19, title: "Moral Courage", prompt: "When did you stand up for what was right this season?", subtitle: "Show a moment when character required courage." },
      { n: 20, title: "The Person You're Becoming", prompt: "Who are you becoming through your athletic journey — and who do you want to be?", subtitle: "Reflect on identity, growth, and future character." }
    ],
    exitExam: {
      title: "Exit Exam — Sportsmanship & Character Development",
      prompt: "Write a one-page reflection about how your character developed through sports this season. Include a moment where your character was tested, a moment when you displayed respect or maturity, a mistake or failure you learned from, how your attitude and emotional responses evolved, the character traits you want to continue building, and how you want to treat others moving forward."
    }
  }, 

    {
    id: "team-dynamics-communication",
    title: "Team Dynamics & Communication",
    credit: "1.0",
    tagline: "Group Communication | Conflict Resolution | Team Chemistry | Athlete Relationships",
    description: "A relationship-based course that teaches athletes how to work effectively inside a team environment by strengthening communication, active listening, trust, conflict resolution, and team chemistry.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Eligible for .25 / .50 / 1.0 credit"],
      qualifyingMinutes: [
        "Communication-led team moments",
        "Participation in team huddles or discussions",
        "Active listening practices",
        "Conflict resolution attempts",
        "Relationship-building actions",
        "Collaborative strategy meetings",
        "Helping teammates through frustration",
        "Group communication observations",
        "Relational check-ins",
        "Team-bonding or group-building exercises"
      ],
      expectations: [
        "Consistent communication effort",
        "Maturity in conflict situations",
        "Relational observation and awareness",
        "Participation in teamwork environments",
        "Honest reflection on interactions"
      ]
    },
    grading: {
      lab: "60% - Communication logs, conflict resolution attempts, team interaction reports, and group observations",
      reflection: "20% - Communication habits, listening, conflict growth, group patterns, and relational awareness",
      final: "20% - One-page team communication summary"
    },
    syllabus: {
      overview: "Focuses on the interpersonal side of sports by teaching athletes how to communicate clearly, listen actively, resolve conflict, build trust, and contribute to healthier team culture.",
      outcomes: [
        "Identify different communication styles",
        "Use active listening in team settings",
        "Recognize misunderstood messages and correct them",
        "Navigate conflict with maturity",
        "Help teammates feel heard and valued",
        "Read group dynamics and adjust behavior",
        "Strengthen team unity through relational awareness"
      ],
      weekly: [
        "Weekly team interaction analysis",
        "Participation in team conversations",
        "Documentation of communication moments",
        "Reflection on group dynamics",
        "Relational self-awareness check"
      ],
      materials: [
        "Access to team practices or games",
        "Notes app or journal",
        "Willingness to reflect on team interactions"
      ]
    },
    modules: [
      { n: 1, title: "Communication Style Awareness", prompt: "What communication style (direct, quiet, emotional, calm, etc.) do you naturally use?", subtitle: "Reflect on your natural way of communicating in group settings." },
      { n: 2, title: "Misunderstanding Moment", prompt: "Describe a moment where communication went wrong. What caused the misunderstanding?", subtitle: "Analyze a team misunderstanding and its cause." },
      { n: 3, title: "Listening Experience", prompt: "When did listening carefully change the outcome of a situation?", subtitle: "Show how active listening improved a result." },
      { n: 4, title: "Teammate Perspective", prompt: "Describe a moment when you considered things from a teammate’s point of view.", subtitle: "Reflect on empathy and perspective-taking." },
      { n: 5, title: "Conflict Trigger", prompt: "What situation tends to create conflict for you or your team?", subtitle: "Identify a repeated source of tension." },
      { n: 6, title: "Conflict Resolution Attempt", prompt: "Describe a conflict you helped resolve. What did you learn?", subtitle: "Reflect on what resolving conflict required." },
      { n: 7, title: "Tension in the Team", prompt: "When did you feel tension within the group? What contributed to it?", subtitle: "Analyze a moment of group tension." },
      { n: 8, title: "Encouragement in Action", prompt: "How did you use communication to encourage a teammate?", subtitle: "Show how your words supported someone else." },
      { n: 9, title: "Body Language Awareness", prompt: "What did you notice about body language — your own or others’?", subtitle: "Reflect on how nonverbal communication shaped interactions." },
      { n: 10, title: "Tone of Voice", prompt: "How has your tone affected team interactions?", subtitle: "Analyze the impact of tone on trust and clarity." },
      { n: 11, title: "Accountability Conversation", prompt: "Describe a moment when you had to communicate a tough truth kindly.", subtitle: "Reflect on honesty delivered with maturity." },
      { n: 12, title: "Positive Chemistry Moment", prompt: "What moment made your team feel united or on the same page?", subtitle: "Identify a strong team-chemistry moment." },
      { n: 13, title: "Communication Mistake", prompt: "What communication mistake did you make, and how did you fix it?", subtitle: "Show growth through repairing a communication error." },
      { n: 14, title: "Trust Building", prompt: "How did you build trust with a teammate?", subtitle: "Reflect on how trust develops through communication and consistency." },
      { n: 15, title: "Conflict Avoidance", prompt: "Did you avoid a conflict this season? What happened because of that?", subtitle: "Analyze the consequences of avoiding a needed conversation." },
      { n: 16, title: "Emotional Regulation", prompt: "How did you manage your emotions during a communication challenge?", subtitle: "Reflect on self-control during a difficult interaction." },
      { n: 17, title: "Group Roles", prompt: "What role do you naturally take in groups (leader, listener, mediator, etc.)?", subtitle: "Identify your natural role within a team." },
      { n: 18, title: "Team Culture Impact", prompt: "What is one communication habit that strengthens (or weakens) team culture?", subtitle: "Connect communication habits to culture." },
      { n: 19, title: "Relationship Growth", prompt: "How did your relationships with teammates grow this season?", subtitle: "Reflect on how team relationships developed over time." },
      { n: 20, title: "Communication Goal", prompt: "What communication skill do you want to develop next?", subtitle: "Set a specific next-step communication goal." }
    ],
    exitExam: {
      title: "Exit Exam — Team Dynamics & Communication",
      prompt: "Write a one-page summary explaining how your communication and teamwork skills developed this season. Include a communication challenge you faced, how you helped resolve or improve a team situation, what you learned about listening and understanding others, how your relationships with teammates evolved, and the communication habits you want to strengthen moving forward."
    }
  },

    {
    id: "coaching-skills-athlete-mentorship",
    title: "Coaching Skills & Athlete Mentorship",
    credit: "1.0",
    tagline: "Teaching Fundamentals | Leading Drills | Mentoring Youth | Leadership Through Coaching",
    description: "A service-based, teaching-focused course designed for athletes who want to guide younger players, break down skills clearly, lead drills, mentor others, and grow as teachers of the sport.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Available in .25 / .50 / 1.0 credit formats"],
      qualifyingMinutes: [
        "Assisting youth practices",
        "Leading warmups or drills",
        "Teaching fundamentals",
        "Correcting form or mechanics",
        "Demonstrating skills",
        "Mentorship conversations",
        "Planning simple training sessions",
        "Supporting younger teams",
        "Modeling leadership and positivity",
        "Preparing or running mini-sessions"
      ],
      expectations: [
        "Responsibility and maturity",
        "Patience and positive mentorship",
        "Planning drills or teaching moments",
        "Reflection on teaching and communication",
        "Modeling sportsmanship"
      ]
    },
    grading: {
      lab: "60% - Coaching sessions, teaching logs, drill leadership, and mentorship reports",
      reflection: "20% - Communication growth, patience, teaching style, and role-model reflection",
      final: "20% - One-page coaching and mentorship summary"
    },
    syllabus: {
      overview: "Teaches athletes how to step into the role of teacher, coach, and mentor by breaking down skills, designing simple drills, encouraging younger athletes, and adapting to different learning needs.",
      outcomes: [
        "Break down skills into simple steps",
        "Lead warmups and structured drills",
        "Communicate with clarity, patience, and encouragement",
        "Identify common technique errors in younger athletes",
        "Provide positive and corrective feedback",
        "Adapt coaching to different personalities",
        "Show consistent role model behavior"
      ],
      weekly: [
        "Hands-on coaching or mentorship interaction",
        "Reflection on what went well and what did not",
        "Skills taught or drills created",
        "Notes on communication and learning styles",
        "Record of mentorship moments"
      ],
      materials: [
        "Access to younger teams, siblings, or youth athletes",
        "Journal or notes app",
        "Space for drills or instruction"
      ]
    },
    modules: [
      { n: 1, title: "Teaching a Skill", prompt: "Describe a skill you taught this season and how you broke it down.", subtitle: "Explain how you turned a skill into teachable steps." },
      { n: 2, title: "Patience Moment", prompt: "Share a moment when patience was important in your coaching.", subtitle: "Reflect on a time when teaching required calm patience." },
      { n: 3, title: "Skill Breakdown Challenge", prompt: "What part of teaching a skill was harder than expected?", subtitle: "Analyze a challenge in explaining or demonstrating technique." },
      { n: 4, title: "Positive Correction", prompt: "Describe a moment when you corrected someone kindly and it helped.", subtitle: "Show how correction can be both clear and encouraging." },
      { n: 5, title: "Demonstration Experience", prompt: "How did demonstrating a skill change your understanding of it?", subtitle: "Reflect on what teaching by example revealed to you." },
      { n: 6, title: "Learning Styles", prompt: "Describe how you adapted your teaching to a younger athlete’s learning style.", subtitle: "Show how you adjusted for different learners." },
      { n: 7, title: "Encouragement", prompt: "Share an encouragement moment that made a difference for a younger athlete.", subtitle: "Reflect on support that helped someone grow." },
      { n: 8, title: "Mentorship Role", prompt: "Who did you mentor this season? What did they need?", subtitle: "Explain who you supported and how." },
      { n: 9, title: "Confidence Building", prompt: "Describe a time you helped a younger athlete believe in themselves.", subtitle: "Show how mentorship builds confidence." },
      { n: 10, title: "Communication Adjustment", prompt: "What communication change improved how someone understood you?", subtitle: "Reflect on a communication adjustment that worked." },
      { n: 11, title: "Drill Creation", prompt: "Describe a drill you created or modified. Why did it work?", subtitle: "Explain the purpose and success of a drill you built." },
      { n: 12, title: "Observation Insight", prompt: "What did you notice about how young athletes respond to feedback?", subtitle: "Reflect on what observation taught you about coaching." },
      { n: 13, title: "Mistake Management", prompt: "How did you help a younger athlete handle a mistake?", subtitle: "Show how you supported someone through failure." },
      { n: 14, title: "Leadership Through Service", prompt: "When did you lead by serving, not by telling?", subtitle: "Reflect on service-centered leadership in coaching." },
      { n: 15, title: "Age-Appropriate Teaching", prompt: "How did you simplify a skill for a younger athlete?", subtitle: "Explain how you made a complex skill easier to understand." },
      { n: 16, title: "Modeling Behavior", prompt: "What positive behavior did you model for younger players?", subtitle: "Identify a role-model behavior you intentionally showed." },
      { n: 17, title: "Mentorship Challenge", prompt: "What was the toughest mentorship moment you had this season?", subtitle: "Analyze a difficult mentoring situation." },
      { n: 18, title: "Growth Moment", prompt: "Describe a moment when you saw improvement in someone you coached.", subtitle: "Reflect on seeing another athlete grow because of your teaching." },
      { n: 19, title: "Coaching Insight", prompt: "What did this course teach you about what makes a great coach?", subtitle: "Define the traits of effective coaching from experience." },
      { n: 20, title: "Next Step", prompt: "What coaching skill do you want to grow next?", subtitle: "Set a clear next-step goal for your growth as a coach." }
    ],
    exitExam: {
      title: "Exit Exam — Coaching Skills & Athlete Mentorship",
      prompt: "Write a one-page reflection describing your coaching and mentorship journey this season. Include a skill you taught and how you taught it, a mentorship moment that mattered, a challenge you faced while coaching, how your communication and patience grew, a moment where you saw someone improve because of your teaching, and the type of coach or mentor you want to become."
    }
  },

    {
    id: "sports-theory-analysis",
    title: "Sports Theory & Analysis",
    credit: "1.0",
    tagline: "Film Study | Strategy | Tactical Breakdown | Game Planning | Performance Evaluation",
    description: "A high-level game-intelligence course designed for athletes who want to understand their sport on a deeper strategic level through film study, tactical analysis, and performance evaluation.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Available in .25 / .50 credit versions"],
      qualifyingMinutes: [
        "Film review sessions",
        "Breaking down plays or sequences",
        "Opponent scouting",
        "Tactical analysis",
        "Game planning",
        "Performance evaluations",
        "Notes on tendencies, patterns, spacing, timing",
        "Strategy discussions",
        "Reflection on decision-making"
      ],
      expectations: [
        "Regular film review",
        "Consistent pattern recognition",
        "Honest self-performance evaluation",
        "Strategic breakdown of choices",
        "Engagement in game IQ development"
      ]
    },
    grading: {
      lab: "60% - Film logs, tactical breakdowns, opponent scouting, and self-performance evaluation",
      reflection: "20% - Strategy insight, decision-making, pattern recognition, and game intelligence",
      final: "20% - One-page tactical analysis"
    },
    syllabus: {
      overview: "Teaches athletes how to see the game the way elite players and coaches do by breaking down film, understanding strategy, identifying patterns, and making smarter decisions under pressure.",
      outcomes: [
        "Break down plays or sequences",
        "Identify patterns and tendencies",
        "Analyze personal performance",
        "Understand tactical concepts and adjustments",
        "Evaluate strategy in real time",
        "Explain the why behind decisions",
        "Improve game IQ through film study"
      ],
      weekly: [
        "Film review",
        "Tactical analysis",
        "Performance evaluation",
        "Pattern recognition exercises",
        "Strategy reflections"
      ],
      materials: [
        "Access to recorded games or practice film",
        "Notes app or journal",
        "Ability to evaluate performance"
      ]
    },
    modules: [
      { n: 1, title: "Pattern Recognition", prompt: "What repeating pattern did you notice in your team’s play?", subtitle: "Identify a pattern that stood out repeatedly." },
      { n: 2, title: "Opponent Tendency", prompt: "What tendency did you identify in an opponent? How did it affect the game?", subtitle: "Reflect on an opponent pattern and its impact." },
      { n: 3, title: "Decision-Making Moment", prompt: "Analyze one moment where you chose correctly. Why did it work?", subtitle: "Break down a strong decision and its cause." },
      { n: 4, title: "Poor Decision Breakdown", prompt: "Analyze a moment you chose incorrectly. What was the better option?", subtitle: "Reflect on a weak decision and what should have happened." },
      { n: 5, title: "Tactical Adjustment", prompt: "Describe a tactical change your team made and why it mattered.", subtitle: "Show how strategy shifted during play." },
      { n: 6, title: "Spacing Insight", prompt: "How did spacing affect a key moment in a game?", subtitle: "Explain how spacing created or limited opportunity." },
      { n: 7, title: "Tempo Control", prompt: "What did you observe about pace or tempo?", subtitle: "Reflect on how pace shaped performance." },
      { n: 8, title: "Defensive Read", prompt: "How did you read a defensive structure or coverage?", subtitle: "Analyze a defensive look and your recognition of it." },
      { n: 9, title: "Offensive Structure", prompt: "What offensive concept or pattern did you recognize?", subtitle: "Identify an offensive system or repeated structure." },
      { n: 10, title: "Film Clip Breakdown", prompt: "Describe one film clip and what you learned from it.", subtitle: "Break down one film moment with detail." },
      { n: 11, title: "Timing Matters", prompt: "When did timing make the difference between success and failure?", subtitle: "Reflect on how timing changed an outcome." },
      { n: 12, title: "Communication Impact", prompt: "How did communication (or lack of it) influence a play?", subtitle: "Show how communication shaped a game moment." },
      { n: 13, title: "Predictive Analysis", prompt: "What did you predict in an opponent’s movement? Were you correct?", subtitle: "Reflect on reading and predicting play." },
      { n: 14, title: "Adjustment Recognition", prompt: "What adjustment did you make after watching film?", subtitle: "Explain how film led to a real change in play or preparation." },
      { n: 15, title: "Strength Identification", prompt: "What strength did you notice in your own play from film?", subtitle: "Identify a personal strength revealed on film." },
      { n: 16, title: "Weakness Identification", prompt: "What weakness did you identify that you want to improve?", subtitle: "Reflect on a weakness exposed by analysis." },
      { n: 17, title: "Game IQ Moment", prompt: "Describe a moment when you saw the game differently.", subtitle: "Show a shift in how you understand the sport." },
      { n: 18, title: "Team Strategy Insight", prompt: "What did you learn about your team’s overall strategy?", subtitle: "Explain a bigger-picture strategy lesson." },
      { n: 19, title: "High-Level Observation", prompt: "What advanced concept or detail stood out to you in film?", subtitle: "Identify a subtle or advanced strategic detail." },
      { n: 20, title: "Next Game IQ Goal", prompt: "What part of your mental game do you want to strengthen next?", subtitle: "Set a strategic or game-IQ goal for improvement." }
    ],
    exitExam: {
      title: "Exit Exam — Sports Theory & Analysis",
      prompt: "Write a one-page tactical analysis summarizing what you learned about game strategy and film study this season. Include a film moment you analyzed deeply, a tactical pattern you recognized, a decision-making improvement you made, a strategic mistake you identified, how game IQ changed your performance, and your next step for becoming a smarter athlete."
    }
  },

    {
    id: "sports-psychology-basics",
    title: "Sports Psychology Basics",
    credit: "1.0",
    tagline: "Mindset | Focus | Motivation | Resilience | Competition Anxiety | Goal Setting",
    description: "A mental-performance training course designed to help athletes strengthen focus, confidence, resilience, emotional control, and the mindset habits that support performance under pressure.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Available in .25 / .50 versions as well"],
      qualifyingMinutes: [
        "Mindset routines",
        "Visualization sessions",
        "Breathwork and focus training",
        "Goal-setting and evaluation",
        "Pre-competition mental prep",
        "Post-competition mental review",
        "Positive self-talk practices",
        "Anxiety reduction tools",
        "Mental resilience training",
        "Journaling or thought-decoding exercises"
      ],
      expectations: [
        "Consistent engagement in mindset exercises",
        "Honest reflection on internal experiences",
        "Goal building and evaluation",
        "Tracking mental performance changes",
        "Growth in resilience, confidence, or focus"
      ]
    },
    grading: {
      lab: "60% - Mindset logs, visualization, resilience work, goal-setting, and focus routines",
      reflection: "20% - Thought patterns, anxiety management, confidence, motivation, and focus awareness",
      final: "20% - One-page mental performance analysis"
    },
    syllabus: {
      overview: "Teaches athletes how to understand and strengthen the mental side of performance through visualization, breathwork, self-talk, goal setting, focus routines, and resilience practices.",
      outcomes: [
        "Use basic sports psychology tools",
        "Understand and manage competition anxiety",
        "Build confidence through mindset habits",
        "Create a personal mental routine",
        "Stay mentally engaged under pressure",
        "Demonstrate resilience during setbacks",
        "Reflect on internal patterns with clarity",
        "Improve motivation intentionally"
      ],
      weekly: [
        "Weekly mindset exercise",
        "Reflection on mental performance",
        "Goal review or adjustment",
        "Focus or resilience practice",
        "Thought-pattern analysis"
      ],
      materials: [
        "Notes app or journal",
        "Space for quiet mental practice",
        "Access to competitive environments"
      ]
    },
    modules: [
      { n: 1, title: "Mental Block Awareness", prompt: "Describe a moment when your mind held you back.", subtitle: "Reflect on a mental barrier that affected performance." },
      { n: 2, title: "Visualization Moment", prompt: "What did you visualize this season, and how did it affect your performance?", subtitle: "Explain how imagery influenced your preparation or execution." },
      { n: 3, title: "Confidence Check-In", prompt: "When did you feel confident? What thoughts led to it?", subtitle: "Analyze a moment of healthy confidence." },
      { n: 4, title: "Self-Talk Insight", prompt: "What words or phrases helped you stay focused?", subtitle: "Identify self-talk that supported you." },
      { n: 5, title: "Pressure Moment", prompt: "Describe how you handled pressure in a key moment.", subtitle: "Reflect on mental performance under pressure." },
      { n: 6, title: "Anxiety Awareness", prompt: "When did you feel competition nerves? What triggered them?", subtitle: "Analyze a moment of anxiety and its cause." },
      { n: 7, title: "Breathwork Experience", prompt: "Which breathing technique helped you calm your mind?", subtitle: "Show how breathwork supported regulation." },
      { n: 8, title: "Focus Strategy", prompt: "What strategy helped you reset your focus?", subtitle: "Identify a mental reset tool that worked." },
      { n: 9, title: "Mistake Recovery", prompt: "Describe a mistake and how you mentally bounced back.", subtitle: "Reflect on resilience after a setback." },
      { n: 10, title: "Motivation Pattern", prompt: "What motivates you most — and why?", subtitle: "Explore the source of your motivation." },
      { n: 11, title: "Goal Setting", prompt: "What meaningful goal did you set this season?", subtitle: "Reflect on a goal that mattered to you." },
      { n: 12, title: "Goal Adjustment", prompt: "What goal did you need to change or adapt? Why?", subtitle: "Explain a goal that evolved during the season." },
      { n: 13, title: "Emotional Regulation", prompt: "How did you manage frustration or fear during competition?", subtitle: "Show how you controlled difficult emotions." },
      { n: 14, title: "Mental Growth Moment", prompt: "What moment revealed your mental strength?", subtitle: "Identify a moment that showed inner growth." },
      { n: 15, title: "Distraction Awareness", prompt: "What distracts you during games or practice?", subtitle: "Reflect on a distraction that affects focus." },
      { n: 16, title: "Focus Reset Cue", prompt: "What cue (word, motion, breath) helps you refocus instantly?", subtitle: "Identify a practical reset cue." },
      { n: 17, title: "Competitive Identity", prompt: "How would you describe the competitor you are becoming?", subtitle: "Reflect on the mindset identity you are building." },
      { n: 18, title: "Adversity Lesson", prompt: "What challenge built your mental resilience?", subtitle: "Explain what adversity taught you mentally." },
      { n: 19, title: "Energy Regulation", prompt: "How do you manage mental energy during long events or tournaments?", subtitle: "Reflect on pacing your mental energy." },
      { n: 20, title: "Future Mindset Goal", prompt: "What mental skill do you want to strengthen next?", subtitle: "Set a clear next-step mental performance goal." }
    ],
    exitExam: {
      title: "Exit Exam — Sports Psychology Basics",
      prompt: "Write a one-page reflection describing how your mindset changed this season. Include a mindset challenge you faced, a mental tool you used that made a difference, how you handled nerves, anxiety, or pressure, a moment when your focus or confidence improved, what you learned about your internal thoughts, and your next step in mental performance development."
    }
  },

    {
    id: "sports-psychology-basics",
    title: "Sports Psychology Basics",
    credit: "1.0",
    tagline: "Mindset | Focus | Motivation | Resilience | Competition Anxiety | Goal Setting",
    description: "A mental-performance training course designed to help athletes strengthen focus, confidence, resilience, emotional control, and the mindset habits that support performance under pressure.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Available in .25 / .50 versions as well"],
      qualifyingMinutes: [
        "Mindset routines",
        "Visualization sessions",
        "Breathwork and focus training",
        "Goal-setting and evaluation",
        "Pre-competition mental prep",
        "Post-competition mental review",
        "Positive self-talk practices",
        "Anxiety reduction tools",
        "Mental resilience training",
        "Journaling or thought-decoding exercises"
      ],
      expectations: [
        "Consistent engagement in mindset exercises",
        "Honest reflection on internal experiences",
        "Goal building and evaluation",
        "Tracking mental performance changes",
        "Growth in resilience, confidence, or focus"
      ]
    },
    grading: {
      lab: "60% - Mindset logs, visualization, resilience work, goal-setting, and focus routines",
      reflection: "20% - Thought patterns, anxiety management, confidence, motivation, and focus awareness",
      final: "20% - One-page mental performance analysis"
    },
    syllabus: {
      overview: "Teaches athletes how to understand and strengthen the mental side of performance through visualization, breathwork, self-talk, goal setting, focus routines, and resilience practices.",
      outcomes: [
        "Use basic sports psychology tools",
        "Understand and manage competition anxiety",
        "Build confidence through mindset habits",
        "Create a personal mental routine",
        "Stay mentally engaged under pressure",
        "Demonstrate resilience during setbacks",
        "Reflect on internal patterns with clarity",
        "Improve motivation intentionally"
      ],
      weekly: [
        "Weekly mindset exercise",
        "Reflection on mental performance",
        "Goal review or adjustment",
        "Focus or resilience practice",
        "Thought-pattern analysis"
      ],
      materials: [
        "Notes app or journal",
        "Space for quiet mental practice",
        "Access to competitive environments"
      ]
    },
    modules: [
      { n: 1, title: "Mental Block Awareness", prompt: "Describe a moment when your mind held you back.", subtitle: "Reflect on a mental barrier that affected performance." },
      { n: 2, title: "Visualization Moment", prompt: "What did you visualize this season, and how did it affect your performance?", subtitle: "Explain how imagery influenced your preparation or execution." },
      { n: 3, title: "Confidence Check-In", prompt: "When did you feel confident? What thoughts led to it?", subtitle: "Analyze a moment of healthy confidence." },
      { n: 4, title: "Self-Talk Insight", prompt: "What words or phrases helped you stay focused?", subtitle: "Identify self-talk that supported you." },
      { n: 5, title: "Pressure Moment", prompt: "Describe how you handled pressure in a key moment.", subtitle: "Reflect on mental performance under pressure." },
      { n: 6, title: "Anxiety Awareness", prompt: "When did you feel competition nerves? What triggered them?", subtitle: "Analyze a moment of anxiety and its cause." },
      { n: 7, title: "Breathwork Experience", prompt: "Which breathing technique helped you calm your mind?", subtitle: "Show how breathwork supported regulation." },
      { n: 8, title: "Focus Strategy", prompt: "What strategy helped you reset your focus?", subtitle: "Identify a mental reset tool that worked." },
      { n: 9, title: "Mistake Recovery", prompt: "Describe a mistake and how you mentally bounced back.", subtitle: "Reflect on resilience after a setback." },
      { n: 10, title: "Motivation Pattern", prompt: "What motivates you most — and why?", subtitle: "Explore the source of your motivation." },
      { n: 11, title: "Goal Setting", prompt: "What meaningful goal did you set this season?", subtitle: "Reflect on a goal that mattered to you." },
      { n: 12, title: "Goal Adjustment", prompt: "What goal did you need to change or adapt? Why?", subtitle: "Explain a goal that evolved during the season." },
      { n: 13, title: "Emotional Regulation", prompt: "How did you manage frustration or fear during competition?", subtitle: "Show how you controlled difficult emotions." },
      { n: 14, title: "Mental Growth Moment", prompt: "What moment revealed your mental strength?", subtitle: "Identify a moment that showed inner growth." },
      { n: 15, title: "Distraction Awareness", prompt: "What distracts you during games or practice?", subtitle: "Reflect on a distraction that affects focus." },
      { n: 16, title: "Focus Reset Cue", prompt: "What cue (word, motion, breath) helps you refocus instantly?", subtitle: "Identify a practical reset cue." },
      { n: 17, title: "Competitive Identity", prompt: "How would you describe the competitor you are becoming?", subtitle: "Reflect on the mindset identity you are building." },
      { n: 18, title: "Adversity Lesson", prompt: "What challenge built your mental resilience?", subtitle: "Explain what adversity taught you mentally." },
      { n: 19, title: "Energy Regulation", prompt: "How do you manage mental energy during long events or tournaments?", subtitle: "Reflect on pacing your mental energy." },
      { n: 20, title: "Future Mindset Goal", prompt: "What mental skill do you want to strengthen next?", subtitle: "Set a clear next-step mental performance goal." }
    ],
    exitExam: {
      title: "Exit Exam — Sports Psychology Basics",
      prompt: "Write a one-page reflection describing how your mindset changed this season. Include a mindset challenge you faced, a mental tool you used that made a difference, how you handled nerves, anxiety, or pressure, a moment when your focus or confidence improved, what you learned about your internal thoughts, and your next step in mental performance development."
    }
  },

   {
    id: "intro-to-coaching-theory",
    title: "Intro to Coaching Theory",
    credit: "1.0",
    tagline: "Coaching Styles | Communication | Behavior Management | Training Methodology",
    description: "A foundational coaching-education course designed to teach the science, structure, and philosophy behind effective coaching, communication, behavior management, and athlete learning.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Available in .25 / .50 formats"],
      qualifyingMinutes: [
        "Observing coaching sessions",
        "Coaching-style analysis",
        "Communication evaluation",
        "Behavior management scenarios",
        "Training methodology planning",
        "Coaching notebooks or breakdowns",
        "Analyzing how coaches deliver instruction",
        "Reviewing coaching patterns on film",
        "Designing age-appropriate drills or sessions",
        "Evaluating athlete learning responses"
      ],
      expectations: [
        "Observation and analysis of coaching behavior",
        "Understanding of coaching theory",
        "Reflection on communication and methodology",
        "Development of early coaching philosophy ideas",
        "Building training concepts and progressions"
      ]
    },
    grading: {
      lab: "60% - Coaching observations, style analysis, communication evaluation, and training-plan sketches",
      reflection: "20% - Coaching style preferences, philosophy growth, learning psychology, and behavior management insight",
      final: "20% - One-page coaching theory summary"
    },
    syllabus: {
      overview: "Examines coaching from an academic and strategic lens by exploring coaching styles, communication models, athlete learning patterns, behavior management, and training methodology.",
      outcomes: [
        "Identify major coaching styles",
        "Evaluate communication effectiveness",
        "Understand athlete learning psychology",
        "Apply behavior management principles",
        "Design simple training progressions",
        "Explain coaching methodology",
        "Reflect on personal coaching philosophy"
      ],
      weekly: [
        "Coaching observation",
        "Breakdown of coaching behaviors",
        "Weekly theory reflection",
        "Training methodology analysis",
        "Coaching philosophy journal"
      ],
      materials: [
        "Journal or notes app",
        "Access to practices, coaches, or coaching video",
        "Ability to observe instruction"
      ]
    },
    modules: [
      { n: 1, title: "Coaching Style Identification", prompt: "Which coaching style (authoritative, democratic, player-centered) do you respond to best? Why?", subtitle: "Reflect on the coaching style that helps you learn best." },
      { n: 2, title: "Coaching Strengths", prompt: "Describe one strength you observed in a coach this season.", subtitle: "Identify a coaching strength you observed clearly." },
      { n: 3, title: "Coaching Weakness", prompt: "Describe a coaching habit that was ineffective or confusing.", subtitle: "Analyze a habit that made instruction harder." },
      { n: 4, title: "Communication Breakdown", prompt: "Analyze a moment when a coach’s message didn’t land. Why?", subtitle: "Reflect on why instruction was misunderstood." },
      { n: 5, title: "Clarity in Instruction", prompt: "What communication method created the clearest learning?", subtitle: "Identify what made instruction easy to understand." },
      { n: 6, title: "Behavior Management Insight", prompt: "Describe how a coach managed behavior in a positive way.", subtitle: "Reflect on effective behavior correction or guidance." },
      { n: 7, title: "Athlete Learning Pattern", prompt: "What did you notice about how younger athletes learn best?", subtitle: "Observe how athletes learn differently." },
      { n: 8, title: "Drill Design Observation", prompt: "Describe a drill structure that improved skill development.", subtitle: "Explain how drill design supported learning." },
      { n: 9, title: "Progression Insight", prompt: "What progression (simple → advanced) did you observe that worked well?", subtitle: "Reflect on effective progression design." },
      { n: 10, title: "Coaching Style Observation", prompt: "Describe a moment where a coach’s style affected team morale.", subtitle: "Analyze how style influenced athlete response." },
      { n: 11, title: "Emotional Tone", prompt: "How did a coach’s tone influence athlete confidence?", subtitle: "Reflect on tone and its impact on learning or confidence." },
      { n: 12, title: "Feedback Analysis", prompt: "What type of feedback helped athletes improve fastest?", subtitle: "Identify the most effective kind of feedback." },
      { n: 13, title: "Motivation Understanding", prompt: "What motivated athletes most effectively in your observations?", subtitle: "Reflect on what truly motivated athletes." },
      { n: 14, title: "Behavior Correction", prompt: "How did a coach correct behavior without shaming or discouraging?", subtitle: "Show how behavior can be guided with respect." },
      { n: 15, title: "Safety Consideration", prompt: "Describe a coaching moment that prioritized athlete safety.", subtitle: "Reflect on safety-centered coaching behavior." },
      { n: 16, title: "Training Approach", prompt: "What training methodology (repetition, game-like drills, fundamentals) seemed most effective?", subtitle: "Analyze which training approach worked best." },
      { n: 17, title: "Coaching Identity Growth", prompt: "What did observing others teach you about the kind of coach you want to be?", subtitle: "Reflect on how observation shaped your identity." },
      { n: 18, title: "Session Structure", prompt: "What made a training session flow smoothly?", subtitle: "Identify what created a well-structured session." },
      { n: 19, title: "Skill Breakdown", prompt: "How did a coach break down a complex skill into simple steps?", subtitle: "Explain how complexity was made teachable." },
      { n: 20, title: "Coaching Philosophy Goal", prompt: "What belief or principle will shape your future coaching style?", subtitle: "Define a core value for your future coaching philosophy." }
    ],
    exitExam: {
      title: "Exit Exam — Intro to Coaching Theory",
      prompt: "Write a one-page coaching theory summary describing the foundations of your coaching philosophy. Include the coaching style you align with, what you learned about communication, how you believe behavior should be managed, how you would structure a training session, and what values or principles will guide your coaching identity."
    }
  },

    {
    id: "kinesiology-human-movement",
    title: "Kinesiology & Human Movement",
    credit: "1.0",
    tagline: "Anatomy | Movement Patterns | Biomechanics | Efficiency | Athletic Motion",
    description: "A foundational sports science course designed to teach athletes how the body moves and why movement quality influences performance, efficiency, and long-term health.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Available in .25 / .50 as well"],
      qualifyingMinutes: [
        "Movement pattern analysis",
        "Studying biomechanics of skills",
        "Observing joint and muscle mechanics",
        "Form evaluation",
        "Mobility-mechanics review",
        "Watching slow-motion clips",
        "Technique breakdowns",
        "Studying gait, landing, jumping, agility",
        "Recording or analyzing personal movement",
        "Notes on how technique affects efficiency"
      ],
      expectations: [
        "Detailed movement observation",
        "Analysis of personal form or technique",
        "Learning and applying biomechanical concepts",
        "Improved understanding of motion",
        "Reflection on movement quality"
      ]
    },
    grading: {
      lab: "60% - Movement analysis, biomechanics notes, slow-motion review, and joint or muscle function identification",
      reflection: "20% - Body awareness, mechanical understanding, movement mistakes, and efficiency insight",
      final: "20% - One-page sports science analysis"
    },
    syllabus: {
      overview: "Introduces the science of human movement by exploring anatomy, biomechanics, joint action, force production, leverage, and movement economy across sports.",
      outcomes: [
        "Identify major muscle groups and their movement roles",
        "Explain biomechanical concepts such as force, torque, angles, and stability",
        "Recognize flawed versus efficient movement",
        "Break down an athletic movement into parts",
        "Analyze personal form using basic sports science",
        "Connect movement science to injury prevention"
      ],
      weekly: [
        "Movement observation",
        "Anatomy or biomechanics review",
        "Form breakdown",
        "Technique reflection",
        "Weekly movement pattern analysis"
      ],
      materials: [
        "Access to movement footage",
        "Notes app or journal",
        "Space for movement observation"
      ]
    },
    modules: [
      { n: 1, title: "Muscle Activation Awareness", prompt: "What muscle group did you notice activating during a specific movement?", subtitle: "Identify a muscle group involved in movement." },
      { n: 2, title: "Joint Action Observation", prompt: "Describe a joint action (flexion, extension, rotation) you observed.", subtitle: "Reflect on a joint movement you noticed clearly." },
      { n: 3, title: "Movement Pattern Analysis", prompt: "What is one movement pattern you want to improve (push, pull, squat, hinge, rotate)?", subtitle: "Choose a pattern that needs cleaner mechanics." },
      { n: 4, title: "Force Production Insight", prompt: "When did you notice how force or power was generated in a movement?", subtitle: "Explain how force showed up in action." },
      { n: 5, title: "Angle Advantage", prompt: "Describe a moment when body angle affected performance.", subtitle: "Analyze how angle changed the result." },
      { n: 6, title: "Balance & Stability", prompt: "What movement required the most stability?", subtitle: "Reflect on a movement that demanded strong control." },
      { n: 7, title: "Mechanical Error", prompt: "What mechanical mistake did you notice in yourself or another athlete?", subtitle: "Identify an error in movement quality." },
      { n: 8, title: "Movement Efficiency", prompt: "What movement felt more efficient after slight technique changes?", subtitle: "Show how a small change improved movement." },
      { n: 9, title: "Coordination Moment", prompt: "Describe how coordination impacted a skill this season.", subtitle: "Reflect on how timing and body control worked together." },
      { n: 10, title: "Range of Motion", prompt: "What movement improved when range of motion increased?", subtitle: "Explain how mobility changed performance." },
      { n: 11, title: "Leverage Awareness", prompt: "How did leverage influence a jump, lift, or movement?", subtitle: "Analyze leverage in action." },
      { n: 12, title: "Timing & Rhythm", prompt: "When did rhythm or timing matter most?", subtitle: "Reflect on timing as a biomechanical factor." },
      { n: 13, title: "Gait or Running Pattern", prompt: "What did you notice about your running stride or foot strike?", subtitle: "Analyze an aspect of your gait or run mechanics." },
      { n: 14, title: "Landing Mechanics", prompt: "Describe something you learned about safe or efficient landing.", subtitle: "Show how landing technique affects safety and performance." },
      { n: 15, title: "Rotation & Torque", prompt: "Where did rotational force appear in your sport’s skills?", subtitle: "Identify where rotation matters in your sport." },
      { n: 16, title: "Movement Breakdown", prompt: "Break down a movement into 3–5 parts.", subtitle: "Explain a full movement sequence step by step." },
      { n: 17, title: "Elite Example", prompt: "What movement quality do elite athletes demonstrate that stood out?", subtitle: "Reflect on a movement trait shown by high-level athletes." },
      { n: 18, title: "Personal Limitation", prompt: "Identify a limitation in your mechanics and its impact.", subtitle: "Describe a movement limitation and what it costs you." },
      { n: 19, title: "Body Awareness Moment", prompt: "When did you feel more connected to your movement?", subtitle: "Reflect on a moment of greater mind-body awareness." },
      { n: 20, title: "Future Mechanics Goal", prompt: "What technical movement goal do you want to improve next?", subtitle: "Set a specific mechanics goal." }
    ],
    exitExam: {
      title: "Exit Exam — Kinesiology & Human Movement",
      prompt: "Write a one-page sports science analysis describing a movement you studied this season. Include the muscle groups and joints involved, the biomechanics behind the movement, one mechanical flaw or limitation you identified, how technique changes affected efficiency or performance, what you learned about your body’s movement patterns, and a long-term mechanic goal for future improvement."
    }
  },

    {
    id: "exercise-science-foundations",
    title: "Exercise Science Foundations",
    credit: "1.0",
    tagline: "Physiology | Muscle Groups | Conditioning Methods | Injury Awareness",
    description: "A foundational sports physiology course that teaches athletes how the body responds to exercise, including muscle function, energy systems, conditioning methods, fatigue, and injury awareness.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Available in .25 / .50 formats"],
      qualifyingMinutes: [
        "Conditioning logs",
        "Training response tracking",
        "Heart-rate monitoring",
        "Muscle group analysis",
        "Energy system identification",
        "Fatigue tracking",
        "Injury awareness notes",
        "Warm-up and cool-down science application",
        "Observing responses to different conditioning methods",
        "Simple physiology-based experiments"
      ],
      expectations: [
        "Observation of body responses",
        "Tracking physiological indicators",
        "Identification of major muscle groups used in sport",
        "Application of safe training principles",
        "Reflection on exercise effects"
      ]
    },
    grading: {
      lab: "60% - Physiology logs, conditioning breakdowns, muscle analysis, and training-response observations",
      reflection: "20% - Training awareness, body-response insight, fatigue recognition, and safety awareness",
      final: "20% - One-page physiology analysis"
    },
    syllabus: {
      overview: "Explores the fundamentals of sports physiology by teaching athletes how muscles work, how energy is produced, how conditioning affects performance, and how to recognize fatigue and early injury signs.",
      outcomes: [
        "Identify major muscle groups and their actions",
        "Understand how the cardiovascular and respiratory systems support exercise",
        "Differentiate between training intensities and energy systems",
        "Explain how conditioning methods affect performance",
        "Recognize signs of fatigue, stress, and early injury",
        "Track physiological responses to training"
      ],
      weekly: [
        "Weekly physiology note",
        "Training-response observation",
        "Muscle-group study",
        "Conditioning method review",
        "Fatigue or injury-awareness reflection"
      ],
      materials: [
        "Notes app or journal",
        "Access to training environments",
        "Ability to observe movement and physiology"
      ]
    },
    modules: [
      { n: 1, title: "Muscle Group Activation", prompt: "What major muscle group was activated during a specific training session?", subtitle: "Identify a major muscle group used in training." },
      { n: 2, title: "Cardiovascular Response", prompt: "How did your breathing or heart rate change during conditioning?", subtitle: "Reflect on how your cardiovascular system responded." },
      { n: 3, title: "Energy System Insight", prompt: "Was your training mostly aerobic or anaerobic today?", subtitle: "Analyze the energy system used most." },
      { n: 4, title: "Muscle Fatigue Awareness", prompt: "Where did you feel the earliest signs of fatigue?", subtitle: "Identify where fatigue showed up first." },
      { n: 5, title: "Recovery Time", prompt: "How long did it take to feel recovered after a hard interval?", subtitle: "Reflect on recovery time after intense work." },
      { n: 6, title: "Training Adaptation", prompt: "What improvement did you notice after repeated conditioning?", subtitle: "Explain what changed after repeated exposure." },
      { n: 7, title: "Conditioning Method Reflection", prompt: "Which conditioning method (intervals, steady-state, tempo) challenged you most?", subtitle: "Compare different conditioning methods." },
      { n: 8, title: "Movement-Muscle Connection", prompt: "Which muscle group powers one key movement in your sport?", subtitle: "Connect a muscle group to a sport-specific movement." },
      { n: 9, title: "Respiratory Observation", prompt: "How did your breathing pattern change as intensity increased?", subtitle: "Reflect on breathing changes at higher intensity." },
      { n: 10, title: "Heart Rate Awareness", prompt: "What did you learn about your heart rate during training?", subtitle: "Analyze what heart-rate awareness taught you." },
      { n: 11, title: "Speed vs. Endurance", prompt: "How did intensity affect your endurance?", subtitle: "Explain how intensity changed output and sustainability." },
      { n: 12, title: "Muscle Soreness Pattern", prompt: "What soreness pattern did you observe and why?", subtitle: "Reflect on soreness and what caused it." },
      { n: 13, title: "Fatigue vs. Pain", prompt: "How did you differentiate normal fatigue from potential injury?", subtitle: "Show awareness of the difference between fatigue and warning signs." },
      { n: 14, title: "Warm-Up Effect", prompt: "How did your body feel after a proper warm-up?", subtitle: "Describe how preparation changed performance readiness." },
      { n: 15, title: "Cool-Down Benefit", prompt: "What changed after a proper cool-down?", subtitle: "Reflect on the physiological effect of cooling down." },
      { n: 16, title: "Injury Awareness Moment", prompt: "Describe an early warning sign of potential injury.", subtitle: "Identify a signal that helped you stay aware." },
      { n: 17, title: "Movement Efficiency", prompt: "What efficiency improvement did you notice as conditioning increased?", subtitle: "Explain how conditioning made movement easier or cleaner." },
      { n: 18, title: "Training Stimulus Response", prompt: "What physical response surprised you during training?", subtitle: "Reflect on an unexpected physiological response." },
      { n: 19, title: "Strength vs. Endurance Balance", prompt: "How did your body respond differently to strength vs. conditioning work?", subtitle: "Compare responses to different training demands." },
      { n: 20, title: "Long-Term Physiology Goal", prompt: "What physiological skill (endurance, power, recovery, capacity) do you want to improve?", subtitle: "Set a science-based training goal." }
    ],
    exitExam: {
      title: "Exit Exam — Exercise Science Foundations",
      prompt: "Write a one-page sports physiology reflection describing how your body responded to exercise this season. Include a muscle group you studied, a conditioning method you learned from, how your body reacted physiologically (breathing, fatigue, heart rate), an early injury-warning sign you recognized, a training adaptation you experienced, and your next physiology goal moving forward."
    }
  },

    {
    id: "student-athlete-college-readiness",
    title: "Student–Athlete College Readiness",
    credit: "1.0",
    tagline: "NCAA Basics | Time Management | Recruiting Awareness | Academic Planning",
    description: "A college-preparation course designed to help student-athletes understand NCAA basics, recruiting awareness, time management, and long-term academic planning for future college opportunities.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Available in .25 / .50 formats"],
      qualifyingMinutes: [
        "NCAA rule research",
        "College fit analysis",
        "Academic planning tasks",
        "Recruiting timeline overview",
        "Time-management logs",
        "Schedule-building exercises",
        "Communication practice",
        "Reviewing example recruiting highlight reels",
        "Observing college athlete schedules or interviews",
        "Goal-setting and long-term planning"
      ],
      expectations: [
        "Completion of planning tasks and reflections",
        "Understanding NCAA eligibility basics",
        "Engagement in time management practice",
        "Study of recruiting concepts",
        "Building an early college-readiness mindset"
      ]
    },
    grading: {
      lab: "60% - Eligibility research, planning worksheets, recruiting notes, and schedule breakdowns",
      reflection: "20% - Future goals, academic habits, readiness awareness, and time management growth",
      final: "20% - One-page college-readiness plan"
    },
    syllabus: {
      overview: "Prepares student-athletes for the academic and personal responsibilities of college sports by exploring NCAA basics, recruiting, scheduling, academic planning, and college fit.",
      outcomes: [
        "Understand NCAA eligibility basics",
        "Build time-management habits for academic success",
        "Explain the recruiting process in simple terms",
        "Plan an academic pathway for college goals",
        "Evaluate college environments and fit",
        "Create a long-term preparation plan",
        "Recognize academic risks and avoid them"
      ],
      weekly: [
        "Recruiting timeline review",
        "NCAA eligibility summary",
        "Academic plan building",
        "Time-management tracking",
        "Weekly reflection on future goals"
      ],
      materials: [
        "Notes app or journal",
        "Internet access for NCAA research",
        "Ability to review schedules and planning tools"
      ]
    },
    modules: [
      { n: 1, title: "Academic Strength Awareness", prompt: "What academic strength will help you succeed in college?", subtitle: "Identify a current academic strength." },
      { n: 2, title: "Academic Weakness Identification", prompt: "What subject or habit needs improvement?", subtitle: "Reflect honestly on an academic weakness." },
      { n: 3, title: "Time-Management Insight", prompt: "What scheduling strategy helped you most this season?", subtitle: "Identify a time-management habit that works." },
      { n: 4, title: "NCAA Requirement Awareness", prompt: "What is one NCAA rule you didn’t know before?", subtitle: "Reflect on a new eligibility insight." },
      { n: 5, title: "Recruiting Understanding", prompt: "What surprised you about the recruiting process?", subtitle: "Describe a recruiting insight that changed your understanding." },
      { n: 6, title: "College Fit Reflection", prompt: "What matters most in picking the right college for you?", subtitle: "Reflect on what defines good fit for you." },
      { n: 7, title: "Transcript Preparation", prompt: "What part of academic planning do you need to prioritize?", subtitle: "Identify an academic planning priority." },
      { n: 8, title: "Life-Skill Growth", prompt: "What non-athletic skill (character, discipline, communication) did you strengthen?", subtitle: "Reflect on a life skill that supports readiness." },
      { n: 9, title: "Athlete Identity Awareness", prompt: "What do you want recruiters to understand about who you are?", subtitle: "Define the message you want your profile to send." },
      { n: 10, title: "Mental Load Recognition", prompt: "What was the hardest part of balancing school and training?", subtitle: "Analyze the biggest challenge in balancing responsibilities." },
      { n: 11, title: "Time Budgeting", prompt: "Where are you losing time each week?", subtitle: "Identify a weak point in your schedule." },
      { n: 12, title: "GPA Mindset", prompt: "How does your current GPA align with your college goals?", subtitle: "Connect current academic standing to future goals." },
      { n: 13, title: "Recruiting Email Practice", prompt: "What is one thing you would say to a college coach?", subtitle: "Reflect on how you would communicate professionally." },
      { n: 14, title: "Long-Term Planning", prompt: "Where do you want to be in four years?", subtitle: "Project your academic and athletic future." },
      { n: 15, title: "Social Media Evaluation", prompt: "Is your online presence recruit-ready?", subtitle: "Reflect on whether your online image supports your goals." },
      { n: 16, title: "Travel/Training Balance", prompt: "How do you plan to stay on top of school during travel seasons?", subtitle: "Build a plan for handling busy seasons." },
      { n: 17, title: "Academic Risk Awareness", prompt: "What is a potential academic risk you must avoid?", subtitle: "Identify a risk that could hurt your future opportunities." },
      { n: 18, title: "Consistency Habits", prompt: "What small habit will improve your readiness?", subtitle: "Choose one simple habit that supports long-term preparation." },
      { n: 19, title: "College Athlete Observation", prompt: "What did you learn from how college athletes structure their day?", subtitle: "Reflect on how higher-level athletes manage life." },
      { n: 20, title: "Personal College-Readiness Statement", prompt: "What does being ready for college athletics mean for you personally?", subtitle: "Define college readiness in your own words." }
    ],
    exitExam: {
      title: "Exit Exam — Student–Athlete College Readiness",
      prompt: "Write a one-page college-readiness plan describing how you will prepare academically, personally, and athletically for the transition to college sports. Include a key NCAA requirement you must meet, your academic plan for the next year, your time-management strategy, what you learned about recruiting, how you will remain academically eligible, and your personal and athletic goals for college."
    }
  },

    {
    id: "leadership-in-sports-communities",
    title: "Leadership in Sports Communities",
    credit: "1.0",
    tagline: "Volunteer Coaching | Community Impact | Youth Mentorship | Athlete Leadership",
    description: "A service-centered course designed to help student-athletes step beyond their own training and positively influence their teams, younger athletes, and local sports communities through mentorship and service.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Available for .25 / .50 credits"],
      qualifyingMinutes: [
        "Volunteer coaching sessions",
        "Helping with youth practices or drills",
        "Off-field mentorship or guidance",
        "Community or team service projects",
        "Event assistance",
        "Leadership shadowing",
        "Planning and executing a community-impact idea",
        "Reflection on leadership moments",
        "Observing team culture and behaviors"
      ],
      expectations: [
        "Participation in community-based involvement",
        "Mentorship of younger athletes",
        "Service in leadership roles",
        "Observation of leadership dynamics",
        "Reflection on personal influence and growth"
      ]
    },
    grading: {
      lab: "60% - Volunteer work, mentorship logs, project planning, and community involvement records",
      reflection: "20% - Leadership identity, service lessons, responsibility, and influence awareness",
      final: "20% - One-page leadership impact summary"
    },
    syllabus: {
      overview: "Teaches athletes to lead through service by mentoring younger athletes, supporting programs, modeling positive habits, and using sports experience to strengthen their community.",
      outcomes: [
        "Demonstrate servant leadership",
        "Mentor younger athletes with confidence",
        "Organize or support youth sports activities",
        "Identify ways to strengthen community programs",
        "Build inclusive positive culture",
        "Reflect deeply on influence and responsibility",
        "Take initiative in leadership roles"
      ],
      weekly: [
        "Weekly service hour or mentorship involvement",
        "Leadership reflection",
        "Observation of leadership moments",
        "Youth engagement practice",
        "Community project planning"
      ],
      materials: [
        "Notes or journal",
        "Access to a sports community environment",
        "Ability to serve, mentor, or assist"
      ]
    },
    modules: [
      { n: 1, title: "Act of Service Reflection", prompt: "Describe a moment this season when you helped someone younger than you.", subtitle: "Reflect on a moment of service." },
      { n: 2, title: "Leadership Example", prompt: "What leadership quality did you display during community involvement?", subtitle: "Identify a leadership trait shown while serving." },
      { n: 3, title: "Influence Awareness", prompt: "When did you realize younger athletes were watching and learning from you?", subtitle: "Reflect on the influence you carry." },
      { n: 4, title: "Respect Model", prompt: "How did you model respect during your volunteer work?", subtitle: "Show how respect was demonstrated in service." },
      { n: 5, title: "Mentorship Growth", prompt: "What is one thing you learned while mentoring someone?", subtitle: "Reflect on what mentoring taught you." },
      { n: 6, title: "Patience Practice", prompt: "Describe a moment that required patience and understanding.", subtitle: "Analyze a time when serving others required patience." },
      { n: 7, title: "Small Impact Reflection", prompt: "What small action made a big difference to someone else?", subtitle: "Show how a small act created impact." },
      { n: 8, title: "Encouragement Moment", prompt: "Describe a time you encouraged a struggling athlete.", subtitle: "Reflect on encouragement that mattered." },
      { n: 9, title: "Leadership Choice", prompt: "When did you choose responsibility over convenience?", subtitle: "Show a moment where you chose leadership the hard way." },
      { n: 10, title: "Community Observation", prompt: "What need did you notice within your sports community?", subtitle: "Identify a need or gap you became aware of." },
      { n: 11, title: "Problem-Solving Insight", prompt: "How did you help solve a challenge or issue?", subtitle: "Reflect on a solution you contributed to." },
      { n: 12, title: "Initiative Moment", prompt: "When did you step up without being asked?", subtitle: "Show a moment of proactive leadership." },
      { n: 13, title: "Role Modeling", prompt: "How did you model good character for younger athletes?", subtitle: "Reflect on the example you set." },
      { n: 14, title: "Service Challenge", prompt: "What was the hardest part of serving others?", subtitle: "Analyze a challenge in community leadership." },
      { n: 15, title: "Growth in Humility", prompt: "When did you realize leadership is more about giving than being in charge?", subtitle: "Reflect on the humility of servant leadership." },
      { n: 16, title: "Culture-Builder Moment", prompt: "Describe a way you contributed to a positive team atmosphere.", subtitle: "Show how you helped build culture." },
      { n: 17, title: "Gratitude Awareness", prompt: "What leadership moment made you feel grateful?", subtitle: "Reflect on gratitude connected to service." },
      { n: 18, title: "Inclusive Leadership", prompt: "How did you make younger or newer athletes feel included?", subtitle: "Show how you practiced inclusive leadership." },
      { n: 19, title: "Project Insight", prompt: "What did you learn while planning or supporting a community project?", subtitle: "Reflect on what a project taught you about leadership." },
      { n: 20, title: "Future Impact Vision", prompt: "How do you hope to continue leading in your sports community?", subtitle: "Set a vision for your future community leadership." }
    ],
    exitExam: {
      title: "Exit Exam — Leadership in Sports Communities",
      prompt: "Write a one-page leadership impact reflection summarizing your service and mentorship work this season. Include how you served or mentored others, a leadership moment you are proud of, what you learned about responsibility and influence, how you contributed to your community, and how you want to grow as a leader in the future."
    }
  },

    {
    id: "time-management-high-performance-students",
    title: "Time Management for High-Performance Students",
    credit: "1.0",
    tagline: "Homework Organization | Schedule Building | Balancing Commitments | Personal Discipline",
    description: "A practical course that teaches athletes how to build structured academic routines, manage school and training demands, organize assignments, and create schedules that support consistency and reduced stress.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "Also offered in .25 / .50 formats"],
      qualifyingMinutes: [
        "Weekly schedule building",
        "Homework management logs",
        "Priority lists",
        "Study-session tracking",
        "Travel-week academic planning",
        "Stress-management strategies",
        "Time audits",
        "Digital organization",
        "Break planning and focus-cycle tests",
        "Reviewing academic progress and weekly workload"
      ],
      expectations: [
        "Building weekly and monthly plans",
        "Tracking homework and deadlines",
        "Planning around games and practices",
        "Reflecting on habits and stress points",
        "Practicing time-management methods"
      ]
    },
    grading: {
      lab: "60% - Weekly planners, scheduling logs, homework tracking, and time-audit exercises",
      reflection: "20% - Stress awareness, habit formation, productivity barriers, and balance insight",
      final: "20% - One-page personal management plan"
    },
    syllabus: {
      overview: "Teaches athletes how to organize schoolwork strategically, prioritize assignments, build schedules, reduce procrastination, and maintain routines during demanding seasons.",
      outcomes: [
        "Build a working schedule they can follow",
        "Organize academic tasks efficiently",
        "Balance school, training, rest, and family commitments",
        "Identify time-wasters and remove them",
        "Improve consistency in practice and homework",
        "Recognize early signs of overwhelm",
        "Maintain routines during tournaments and travel"
      ],
      weekly: [
        "Weekly schedule creation",
        "Homework list updates",
        "Time-audit evaluations",
        "Reflection on stress or challenges",
        "Productivity method testing"
      ],
      materials: [
        "Notes app or planner",
        "Access to schedules for practices or games",
        "Ability to track homework and commitments"
      ]
    },
    modules: [
      { n: 1, title: "Daily Habit Awareness", prompt: "What daily habit helps you stay most organized?", subtitle: "Identify a habit that supports daily structure." },
      { n: 2, title: "Distraction Check", prompt: "What distracts you most often?", subtitle: "Reflect on a distraction that costs you time." },
      { n: 3, title: "Priority Ranking", prompt: "What was your most important academic task this week?", subtitle: "Identify how you decided what mattered most." },
      { n: 4, title: "Lost-Time Reflection", prompt: "Where did you lose time that you didn’t expect?", subtitle: "Analyze where time slipped away." },
      { n: 5, title: "Travel-Week Adjustment", prompt: "How do you adapt your work schedule on travel days?", subtitle: "Explain how you manage academics during travel." },
      { n: 6, title: "Homework Planning", prompt: "What assignment required the most planning this week?", subtitle: "Reflect on planning a bigger assignment well." },
      { n: 7, title: "Task Breakdown", prompt: "Describe how breaking a big assignment into steps helped you.", subtitle: "Show the benefit of chunking work." },
      { n: 8, title: "Hardest Day of the Week", prompt: "Which day is most challenging and why?", subtitle: "Identify where your schedule is under the most pressure." },
      { n: 9, title: "Routine Check", prompt: "What part of your routine fell apart this week?", subtitle: "Reflect on where routine broke down." },
      { n: 10, title: "Time Budgeting", prompt: "Where did your schedule feel too tight?", subtitle: "Analyze a place where your schedule was overloaded." },
      { n: 11, title: "Rest & Recovery Awareness", prompt: "Did you protect your sleep and rest time?", subtitle: "Reflect on whether you preserved recovery." },
      { n: 12, title: "Peak Productivity Window", prompt: "What time of day do you work best?", subtitle: "Identify when you are most productive." },
      { n: 13, title: "Academic-Athletic Balance", prompt: "What was hardest to balance this week?", subtitle: "Reflect on where competing demands felt hardest." },
      { n: 14, title: "Organization System", prompt: "What organization method worked best for you?", subtitle: "Identify a system that improved your structure." },
      { n: 15, title: "Procrastination Moment", prompt: "When did you wait too long to begin something?", subtitle: "Analyze a procrastination moment honestly." },
      { n: 16, title: "Quick Win Strategy", prompt: "What small task gave you momentum?", subtitle: "Reflect on how small wins help you get moving." },
      { n: 17, title: "Overwhelm Awareness", prompt: "When did you feel overloaded?", subtitle: "Identify a moment when the workload became too much." },
      { n: 18, title: "Time-Saver Discovery", prompt: "What saved you time unexpectedly?", subtitle: "Reflect on a helpful time-saving discovery." },
      { n: 19, title: "Commitment Check", prompt: "Did you say yes to something you shouldn’t have?", subtitle: "Analyze a commitment that stretched you too far." },
      { n: 20, title: "Improvement Goal", prompt: "What part of your time management will you improve next week?", subtitle: "Set one clear next-step organization goal." }
    ],
    exitExam: {
      title: "Exit Exam — Time Management for High-Performance Students",
      prompt: "Write a one-page personal time-management plan describing how you will organize schoolwork, training, travel, and personal life. Include your weekly schedule, your biggest time-management weakness, what you learned about your habits, how you plan to stay organized during busy seasons, and a strategy to reduce stress and improve consistency."
    }
  },

   {
    id: "personal-responsibility-goal-setting",
    title: "Personal Responsibility & Goal Setting",
    credit: "0.5–1.0",
    tagline: "Consistency | Accountability | Self-Discipline | Progress Tracking",
    description: "A mindset and character-development course designed to help students build ownership, discipline, consistency, accountability, and goal-setting habits that support success in school, sports, and life.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", "0.5 Credit = 4,500 minutes", ".25 credit possible depending on workload"],
      qualifyingMinutes: [
        "Weekly goal-setting exercises",
        "Daily or weekly habit tracking",
        "Progress reviews",
        "Accountability check-ins",
        "Self-assessment logs",
        "Reflection on follow-through",
        "Identifying patterns in consistency",
        "Setting short-term and long-term goals",
        "Planning actionable steps",
        "Evaluating personal responsibility moments"
      ],
      expectations: [
        "Setting weekly and monthly goals",
        "Tracking consistency",
        "Reflecting on follow-through and missed steps",
        "Practicing daily discipline strategies",
        "Building accountability habits"
      ]
    },
    grading: {
      lab: "60% - Habit logs, goal worksheets, progress tracking, and accountability check-ins",
      reflection: "20% - Ownership, responsibility, setbacks, discipline, and habit insight",
      final: "20% - One-page personal growth plan"
    },
    syllabus: {
      overview: "Teaches students the habits behind real growth by focusing on consistency, follow-through, disciplined action, ownership, and practical goal setting.",
      outcomes: [
        "Set effective short-term and long-term goals",
        "Build consistent habits",
        "Evaluate personal follow-through",
        "Accept responsibility for actions and decisions",
        "Track progress with honesty and clarity",
        "Develop a personal accountability plan",
        "Strengthen discipline and personal leadership"
      ],
      weekly: [
        "Weekly goal setting",
        "Daily or weekly habit tracking",
        "Progress review",
        "Reflection on responsibility",
        "Accountability check-ins"
      ],
      materials: [
        "Notes app or journal",
        "Habit tracker",
        "Access to training and academic responsibilities"
      ]
    },
    modules: [
      { n: 1, title: "Responsibility Moment", prompt: "Describe a moment this week where you took ownership of your actions.", subtitle: "Reflect on a moment of real ownership." },
      { n: 2, title: "Missed Opportunity Insight", prompt: "What is one thing you should have done earlier?", subtitle: "Identify a delay or missed action honestly." },
      { n: 3, title: "Consistency Check", prompt: "What habit were you most consistent with?", subtitle: "Reflect on where you showed strong follow-through." },
      { n: 4, title: "Inconsistency Reflection", prompt: "Which habit needs more discipline?", subtitle: "Identify a habit that still lacks consistency." },
      { n: 5, title: "Goal Clarity", prompt: "What is your most important goal this month?", subtitle: "Define a clear short-term goal." },
      { n: 6, title: "Action Step Identification", prompt: "What is one small step you can take today toward that goal?", subtitle: "Connect a big goal to one immediate step." },
      { n: 7, title: "Personal Discipline Moment", prompt: "Describe a time you chose discipline over convenience.", subtitle: "Reflect on doing the harder but better thing." },
      { n: 8, title: "Distraction Awareness", prompt: "What distracts you or pulls you off-track?", subtitle: "Identify what most often derails you." },
      { n: 9, title: "Mindset Shift", prompt: "What belief or mindset helped you stay focused this week?", subtitle: "Reflect on a helpful internal belief." },
      { n: 10, title: "Accountability Check-In", prompt: "Who or what helps keep you accountable?", subtitle: "Identify an accountability source that matters." },
      { n: 11, title: "Pattern Recognition", prompt: "What pattern do you see in your habits?", subtitle: "Analyze a repeated behavior pattern." },
      { n: 12, title: "Strength Awareness", prompt: "What personal strength supported your progress?", subtitle: "Identify a strength that helped you move forward." },
      { n: 13, title: "Weakness Identification", prompt: "What weakness slowed your progress?", subtitle: "Reflect on an internal barrier honestly." },
      { n: 14, title: "Small Victory Recognition", prompt: "What tiny win made you feel proud this week?", subtitle: "Recognize a small win that mattered." },
      { n: 15, title: "Setback Handling", prompt: "How did you respond when something didn’t go as planned?", subtitle: "Analyze how you handled a setback." },
      { n: 16, title: "Personal Standard", prompt: "What standard do you want to hold yourself to?", subtitle: "Define a higher personal standard." },
      { n: 17, title: "Growth Reflection", prompt: "Where have you grown the most recently?", subtitle: "Reflect on a recent area of growth." },
      { n: 18, title: "Goal Review", prompt: "Which goal felt easiest and why?", subtitle: "Compare goal difficulty and why it mattered." },
      { n: 19, title: "Commitment Check", prompt: "What commitment must you keep next week no matter what?", subtitle: "Identify a non-negotiable commitment." },
      { n: 20, title: "Forward Momentum", prompt: "What will you improve moving into next week?", subtitle: "Set one clear improvement target for next week." }
    ],
    exitExam: {
      title: "Exit Exam — Personal Responsibility & Goal Setting",
      prompt: "Write a one-page personal responsibility and goal-setting reflection describing your growth this season. Include one major goal you worked toward, the habits you built to support it, how you held yourself accountable, a setback and how you responded, what you learned about consistency, and your long-term plan for continuing this growth."
    }
  },


    {
    id: "health-fitness-foundations",
    title: "Health & Fitness Foundations",
    credit: "1.0",
    tagline: "General Fitness | Lifelong Habits | Whole-Body Wellness | Foundational Movement",
    description: "A broad lifestyle-focused course designed to teach students the fundamentals of general fitness, daily health habits, and lifelong physical well-being through simple, sustainable routines.",
    requirements: {
      credit: ["1.0 Credit = 9,000 minutes", ".50 and .25 formats available"],
      qualifyingMinutes: [
        "Daily fitness habits",
        "Walking, stretching, general physical activity",
        "Warm-up and cool-down routines",
        "Journaling about energy, sleep, and overall health",
        "Hydration tracking",
        "Healthy meal planning or observation",
        "Practicing stress-management strategies",
        "Learning basic functional movements",
        "Studying fitness routines from reliable sources"
      ],
      expectations: [
        "Building consistent daily physical activity",
        "Tracking health habits such as sleep, hydration, and movement",
        "Reflecting on lifestyle choices",
        "Developing personal routines",
        "Understanding fitness as part of long-term wellness"
      ]
    },
    grading: {
      lab: "60% - Fitness logs, habit tracking, sleep and hydration reflection, and routine planning",
      reflection: "20% - Wellness insight, lifestyle growth, mind-body connection, and routine awareness",
      final: "20% - One-page lifelong wellness plan"
    },
    syllabus: {
      overview: "Teaches the building blocks of lifelong health through movement, sleep, hydration, nutrition awareness, mobility, stress management, and simple routine building.",
      outcomes: [
        "Build simple fitness routines",
        "Understand the pillars of health",
        "Recognize how daily habits affect energy and mood",
        "Develop consistent wellness practices",
        "Reflect on personal lifestyle choices",
        "Maintain balanced routines",
        "Apply lifelong wellness principles"
      ],
      weekly: [
        "Weekly fitness log",
        "Sleep and hydration awareness",
        "Stretching or mobility practice",
        "Reflection on lifestyle habits",
        "Simple wellness planning"
      ],
      materials: [
        "Notebook or tracking app",
        "Access to light physical activity",
        "Ability to reflect on daily choices"
      ]
    },
    modules: [
      { n: 1, title: "Daily Movement Reflection", prompt: "How much did you move today, and how did it make you feel?", subtitle: "Reflect on the link between movement and daily well-being." },
      { n: 2, title: "Sleep Awareness", prompt: "Describe the quality of your sleep this week.", subtitle: "Reflect on your recent sleep habits." },
      { n: 3, title: "Hydration Check", prompt: "How did drinking more water affect your energy levels?", subtitle: "Connect hydration to how you felt physically." },
      { n: 4, title: "Healthy Choice Moment", prompt: "What small healthy decision made a difference?", subtitle: "Identify one healthy choice that mattered." },
      { n: 5, title: "Mood & Movement Connection", prompt: "How did exercise affect your mood?", subtitle: "Reflect on how movement influenced your emotions." },
      { n: 6, title: "Stretching Insight", prompt: "What muscle felt more flexible after stretching?", subtitle: "Identify a physical change from mobility work." },
      { n: 7, title: "Morning Routine Reflection", prompt: "How does your morning routine set the tone for your day?", subtitle: "Reflect on how mornings affect your overall wellness." },
      { n: 8, title: "Evening Routine Reflection", prompt: "What helps you wind down effectively?", subtitle: "Identify an evening habit that supports recovery." },
      { n: 9, title: "Stress Awareness", prompt: "What caused the most stress this week?", subtitle: "Reflect on a recent stress source." },
      { n: 10, title: "Healthy Coping Strategy", prompt: "What helped you deal with stress in a healthy way?", subtitle: "Identify a coping strategy that supported you." },
      { n: 11, title: "Energy Fluctuation", prompt: "When did you feel most energized?", subtitle: "Reflect on what times or habits supported your energy." },
      { n: 12, title: "Nutrition Observation", prompt: "What meal helped you feel better or worse?", subtitle: "Connect a meal choice to how your body felt." },
      { n: 13, title: "Break Awareness", prompt: "Did you take breaks when needed?", subtitle: "Reflect on whether you gave yourself needed recovery." },
      { n: 14, title: "Fitness Routine Building", prompt: "What activity do you enjoy the most?", subtitle: "Identify a movement habit you actually enjoy." },
      { n: 15, title: "Habit Check-In", prompt: "What wellness habit were you most consistent with?", subtitle: "Recognize a habit you maintained well." },
      { n: 16, title: "Challenge Point", prompt: "What habit was hardest to stick to?", subtitle: "Reflect on the wellness habit that challenged you most." },
      { n: 17, title: "Self-Discipline Insight", prompt: "When did you choose the healthier option over the easier one?", subtitle: "Show a moment of real discipline in wellness." },
      { n: 18, title: "Mental Well-being", prompt: "What activity helped your mental clarity?", subtitle: "Identify what supported your mental wellness best." },
      { n: 19, title: "Body Awareness", prompt: "What did your body tell you this week?", subtitle: "Reflect on what your body signaled about health or recovery." },
      { n: 20, title: "Lifelong Habit Goal", prompt: "What is one habit you want to keep for life?", subtitle: "Set one long-term lifelong wellness habit." }
    ],
    exitExam: {
      title: "Exit Exam — Health & Fitness Foundations",
      prompt: "Write a one-page lifelong health plan describing the habits you want to maintain for your overall well-being. Include a simple fitness routine, one habit you want to build long-term, how sleep or hydration impacts your performance, how movement affects your mental health, what you learned about your body, and your plan for maintaining healthy habits for life."
    }
  }
];
