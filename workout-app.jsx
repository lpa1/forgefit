import { useState } from "react";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');`;

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0c0c0c;
    --surface: #141414;
    --card: #1c1c1c;
    --border: #2a2a2a;
    --lime: #c8f53a;
    --lime-dim: rgba(200,245,58,0.1);
    --text: #f2efe8;
    --muted: #666;
    --red: #ff4444;
  }
  html { font-size: 16px; }
  body { background: var(--bg); color: var(--text); font-family: 'Barlow', sans-serif; font-weight: 300; min-height: 100vh; }
  .app { max-width: 480px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 0; }
  .nav-logo { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.06em; color: var(--lime); }
  .nav-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }

  /* HERO */
  .hero { padding: 48px 24px 32px; flex: 1; }
  .hero-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--lime); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .hero-eyebrow::before { content: ''; width: 24px; height: 2px; background: var(--lime); display: block; }
  .hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(52px, 14vw, 72px); line-height: 0.92; letter-spacing: 0.02em; margin-bottom: 20px; }
  .hero h1 span { color: var(--lime); }
  .hero-sub { font-size: 15px; color: var(--muted); line-height: 1.55; max-width: 340px; margin-bottom: 40px; }

  /* FORM */
  .form { display: flex; flex-direction: column; gap: 24px; }
  .field-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; display: block; }
  .options-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }
  .option-btn {
    background: var(--card); border: 1px solid var(--border); color: var(--text);
    font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 400;
    padding: 12px 14px; border-radius: 6px; cursor: pointer; text-align: left;
    transition: all 0.15s; display: flex; align-items: center; gap: 8px; line-height: 1.3;
  }
  .option-btn:hover { border-color: var(--lime); color: var(--lime); }
  .option-btn.selected { background: var(--lime-dim); border-color: var(--lime); color: var(--lime); }
  .option-btn .icon { font-size: 18px; flex-shrink: 0; }

  /* INPUT */
  .text-input {
    width: 100%; background: var(--card); border: 1px solid var(--border);
    color: var(--text); font-family: 'Barlow', sans-serif; font-size: 15px; font-weight: 300;
    padding: 14px 16px; border-radius: 6px; outline: none; transition: border-color 0.15s;
  }
  .text-input:focus { border-color: var(--lime); }
  .text-input::placeholder { color: var(--muted); }

  /* CTA */
  .cta-btn {
    width: 100%; background: var(--lime); color: #0c0c0c;
    font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 0.1em;
    border: none; padding: 18px; border-radius: 6px; cursor: pointer;
    transition: opacity 0.2s; margin-top: 8px;
  }
  .cta-btn:hover { opacity: 0.9; }
  .cta-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  /* LOADING */
  .loading { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; padding: 60px 24px; text-align: center; gap: 24px; }
  .loading-ring { width: 56px; height: 56px; border: 3px solid var(--border); border-top-color: var(--lime); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 0.06em; color: var(--lime); }
  .loading-sub { font-size: 13px; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }

  /* PLAN */
  .plan { padding: 24px; flex: 1; }
  .plan-header { margin-bottom: 28px; }
  .plan-header h2 { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 0.04em; line-height: 1; margin-bottom: 6px; }
  .plan-header h2 span { color: var(--lime); }
  .plan-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 10px; }
  .plan-badge { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; background: var(--card); border: 1px solid var(--border); padding: 4px 10px; border-radius: 4px; color: var(--muted); }
  .plan-badge.active { border-color: var(--lime); color: var(--lime); background: var(--lime-dim); }

  /* DAY CARD */
  .day-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; margin-bottom: 12px; overflow: hidden; }
  .day-header { padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none; }
  .day-header:hover { background: rgba(255,255,255,0.02); }
  .day-title { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 0.06em; display: flex; align-items: center; gap: 10px; }
  .day-num { color: var(--lime); }
  .day-focus { font-size: 11px; font-family: 'Barlow', sans-serif; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  .day-toggle { font-size: 18px; color: var(--muted); transition: transform 0.2s; }
  .day-toggle.open { transform: rotate(180deg); color: var(--lime); }
  .day-body { padding: 0 18px 16px; display: none; }
  .day-body.open { display: block; }

  /* EXERCISE */
  .exercise { padding: 12px 0; border-bottom: 1px solid #1f1f1f; display: flex; align-items: flex-start; gap: 12px; }
  .exercise:last-child { border-bottom: none; }
  .ex-check { width: 20px; height: 20px; border: 2px solid var(--border); border-radius: 4px; flex-shrink: 0; margin-top: 1px; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; }
  .ex-check.done { background: var(--lime); border-color: var(--lime); }
  .ex-check.done::after { content: '✓'; font-size: 12px; color: #0c0c0c; font-weight: 700; }
  .ex-info { flex: 1; }
  .ex-name { font-size: 14px; font-weight: 500; margin-bottom: 3px; transition: color 0.15s; }
  .ex-name.done { color: var(--muted); text-decoration: line-through; }
  .ex-detail { font-size: 12px; color: var(--muted); }
  .ex-tip { font-size: 11px; color: #444; margin-top: 4px; font-style: italic; }

  /* REST DAY */
  .rest-day { padding: 20px 18px; display: flex; align-items: center; gap: 12px; color: var(--muted); font-size: 13px; }
  .rest-icon { font-size: 20px; }

  /* BOTTOM ACTIONS */
  .plan-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; padding-bottom: 40px; }
  .btn-secondary { background: transparent; border: 1px solid var(--border); color: var(--text); font-family: 'Barlow', sans-serif; font-size: 14px; font-weight: 400; padding: 14px; border-radius: 6px; cursor: pointer; transition: all 0.15s; letter-spacing: 0.04em; }
  .btn-secondary:hover { border-color: var(--lime); color: var(--lime); }
  .btn-upgrade { background: var(--lime); color: #0c0c0c; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 0.08em; border: none; padding: 16px; border-radius: 6px; cursor: pointer; transition: opacity 0.2s; }
  .btn-upgrade:hover { opacity: 0.9; }

  /* UPSELL */
  .upsell { background: var(--lime-dim); border: 1px solid rgba(200,245,58,0.2); border-radius: 8px; padding: 20px; margin: 20px 0; }
  .upsell-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--lime); margin-bottom: 8px; }
  .upsell h3 { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.04em; margin-bottom: 6px; }
  .upsell p { font-size: 13px; color: var(--muted); line-height: 1.5; }
  .upsell-price { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--lime); margin: 12px 0 4px; }
  .upsell-price span { font-family: 'Barlow', sans-serif; font-size: 13px; color: var(--muted); font-weight: 300; }

  /* PROGRESS BAR */
  .progress-wrap { margin-bottom: 20px; }
  .progress-label { display: flex; justify-content: space-between; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .progress-track { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--lime); border-radius: 2px; transition: width 0.4s ease; }

  /* ERROR */
  .error-box { background: rgba(255,68,68,0.08); border: 1px solid rgba(255,68,68,0.2); border-radius: 8px; padding: 16px; margin: 16px 0; font-size: 13px; color: #ff8888; }
`;

const GOALS = [
  { id: "lose_fat", label: "Lose Fat", icon: "🔥" },
  { id: "build_muscle", label: "Build Muscle", icon: "💪" },
  { id: "get_fit", label: "Get Fit", icon: "⚡" },
  { id: "tone_up", label: "Tone Up", icon: "✨" },
];

const EQUIPMENT = [
  { id: "none", label: "No Equipment", icon: "🏠" },
  { id: "dumbbells", label: "Dumbbells", icon: "🏋️" },
  { id: "gym", label: "Full Gym", icon: "🏟️" },
  { id: "resistance", label: "Resistance Bands", icon: "🔗" },
];

const DAYS = [
  { id: "2", label: "2 days" },
  { id: "3", label: "3 days" },
  { id: "4", label: "4 days" },
  { id: "5", label: "5 days" },
];

const LEVELS = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

function generatePlan(goal, equipment, days, level, name) {
  const daysNum = parseInt(days);

  const exercises = {
    none: {
      push: [
        { name: "Push-Ups", sets: "3", reps: "10-15", tip: "Keep your core tight throughout" },
        { name: "Pike Push-Ups", sets: "3", reps: "8-12", tip: "Great for shoulder development" },
        { name: "Tricep Dips (chair)", sets: "3", reps: "10-12", tip: "Keep elbows pointing back" },
        { name: "Diamond Push-Ups", sets: "2", reps: "8-10", tip: "Targets inner chest and triceps" },
      ],
      pull: [
        { name: "Inverted Rows (table)", sets: "3", reps: "10-12", tip: "Keep body straight as a plank" },
        { name: "Door Frame Rows", sets: "3", reps: "10-15", tip: "Grip low, lean back slightly" },
        { name: "Superman Hold", sets: "3", reps: "10 × 3s hold", tip: "Squeeze glutes at the top" },
      ],
      legs: [
        { name: "Bodyweight Squats", sets: "4", reps: "15-20", tip: "Knees track over toes" },
        { name: "Reverse Lunges", sets: "3", reps: "12 each leg", tip: "Step back, not forward" },
        { name: "Glute Bridges", sets: "3", reps: "15-20", tip: "Squeeze hard at the top" },
        { name: "Wall Sit", sets: "3", reps: "30-45 sec", tip: "Thighs parallel to floor" },
        { name: "Calf Raises", sets: "3", reps: "20-25", tip: "Slow on the way down" },
      ],
      core: [
        { name: "Plank", sets: "3", reps: "30-45 sec", tip: "Don't let hips sag" },
        { name: "Bicycle Crunches", sets: "3", reps: "20 each side", tip: "Slow and controlled" },
        { name: "Leg Raises", sets: "3", reps: "12-15", tip: "Lower back stays flat" },
        { name: "Mountain Climbers", sets: "3", reps: "30 sec", tip: "Drive knees to chest" },
      ],
      cardio: [
        { name: "High Knees", sets: "3", reps: "40 sec", tip: "Pump your arms" },
        { name: "Burpees", sets: "3", reps: "8-10", tip: "Jump high at the top" },
        { name: "Jump Squats", sets: "3", reps: "12-15", tip: "Land softly, absorb impact" },
      ],
    },
    dumbbells: {
      push: [
        { name: "DB Bench Press", sets: "4", reps: "8-12", tip: "Control the lowering phase" },
        { name: "DB Shoulder Press", sets: "3", reps: "10-12", tip: "Don't lock out at top" },
        { name: "DB Lateral Raises", sets: "3", reps: "12-15", tip: "Lead with elbows, not wrists" },
        { name: "DB Tricep Kickbacks", sets: "3", reps: "12-15", tip: "Upper arm stays parallel to floor" },
      ],
      pull: [
        { name: "DB Bent-Over Rows", sets: "4", reps: "8-12", tip: "Squeeze shoulder blade at top" },
        { name: "DB Bicep Curls", sets: "3", reps: "10-12", tip: "Don't swing — strict form" },
        { name: "DB Rear Delt Flyes", sets: "3", reps: "12-15", tip: "Think elbows, not hands" },
        { name: "DB Hammer Curls", sets: "3", reps: "10-12", tip: "Neutral grip throughout" },
      ],
      legs: [
        { name: "DB Goblet Squats", sets: "4", reps: "12-15", tip: "Hold DB at chest, sit deep" },
        { name: "DB Romanian Deadlift", sets: "3", reps: "10-12", tip: "Hinge at hips, soft knees" },
        { name: "DB Walking Lunges", sets: "3", reps: "10 each leg", tip: "Keep torso upright" },
        { name: "DB Calf Raises", sets: "3", reps: "15-20", tip: "Full range of motion" },
      ],
      core: [
        { name: "DB Russian Twists", sets: "3", reps: "15 each side", tip: "Heels off floor for harder version" },
        { name: "Plank", sets: "3", reps: "40 sec", tip: "Brace like you're about to be punched" },
        { name: "DB Woodchops", sets: "3", reps: "12 each side", tip: "Rotate from core, not arms" },
      ],
    },
    gym: {
      push: [
        { name: "Barbell Bench Press", sets: "4", reps: "6-10", tip: "Arch your upper back, plant feet" },
        { name: "Incline DB Press", sets: "3", reps: "8-12", tip: "30° incline targets upper chest" },
        { name: "Cable Flyes", sets: "3", reps: "12-15", tip: "Slight bend in elbows throughout" },
        { name: "Overhead Press", sets: "3", reps: "8-10", tip: "Bar path straight up, not forward" },
        { name: "Tricep Pushdowns", sets: "3", reps: "12-15", tip: "Elbows fixed at sides" },
      ],
      pull: [
        { name: "Pull-Ups / Lat Pulldown", sets: "4", reps: "6-10", tip: "Full stretch at bottom" },
        { name: "Barbell Rows", sets: "4", reps: "8-10", tip: "Bar to lower chest, not stomach" },
        { name: "Cable Rows", sets: "3", reps: "10-12", tip: "Sit tall, don't rock" },
        { name: "Face Pulls", sets: "3", reps: "15-20", tip: "Pull to forehead, elbows high" },
        { name: "Barbell Curls", sets: "3", reps: "8-12", tip: "Pause and squeeze at top" },
      ],
      legs: [
        { name: "Barbell Squats", sets: "4", reps: "6-10", tip: "Break parallel for full development" },
        { name: "Romanian Deadlift", sets: "3", reps: "8-10", tip: "Feel hamstring stretch at bottom" },
        { name: "Leg Press", sets: "3", reps: "10-15", tip: "Feet shoulder-width, mid-platform" },
        { name: "Leg Curls", sets: "3", reps: "12-15", tip: "Slow eccentric — 3 seconds down" },
        { name: "Calf Raises", sets: "4", reps: "15-20", tip: "Full stretch and full contraction" },
      ],
      core: [
        { name: "Cable Crunches", sets: "3", reps: "15-20", tip: "Round spine, don't pull with arms" },
        { name: "Hanging Leg Raises", sets: "3", reps: "10-15", tip: "Control the descent" },
        { name: "Ab Wheel Rollouts", sets: "3", reps: "8-12", tip: "Brace hard before you roll out" },
        { name: "Plank", sets: "3", reps: "45 sec", tip: "Posterior pelvic tilt slightly" },
      ],
    },
    resistance: {
      push: [
        { name: "Band Push-Ups", sets: "3", reps: "12-15", tip: "Band across upper back adds resistance" },
        { name: "Band Chest Press", sets: "3", reps: "12-15", tip: "Anchor band behind you at chest height" },
        { name: "Band Overhead Press", sets: "3", reps: "10-12", tip: "Stand on band, press overhead" },
        { name: "Band Tricep Pushdowns", sets: "3", reps: "15-20", tip: "Anchor high, elbows fixed" },
      ],
      pull: [
        { name: "Band Pull-Aparts", sets: "3", reps: "20-25", tip: "Arms straight, wide stretch" },
        { name: "Band Rows", sets: "3", reps: "12-15", tip: "Anchor low, pull to abdomen" },
        { name: "Band Bicep Curls", sets: "3", reps: "12-15", tip: "Stand on band, strict curl" },
        { name: "Band Face Pulls", sets: "3", reps: "15-20", tip: "Anchor at head height, pull to forehead" },
      ],
      legs: [
        { name: "Band Squats", sets: "4", reps: "15-20", tip: "Band under feet, at shoulders" },
        { name: "Band Hip Thrusts", sets: "3", reps: "15-20", tip: "Band across hips, full extension" },
        { name: "Band Clamshells", sets: "3", reps: "20 each", tip: "Keep hips stacked, rotate from glute" },
        { name: "Band Lateral Walks", sets: "3", reps: "15 each way", tip: "Stay low throughout" },
      ],
      core: [
        { name: "Plank", sets: "3", reps: "40 sec", tip: "Squeeze glutes and abs together" },
        { name: "Band Woodchops", sets: "3", reps: "12 each side", tip: "Rotate from core" },
        { name: "Band Pallof Press", sets: "3", reps: "12 each side", tip: "Resist rotation — that's the point" },
      ],
    },
  };

  const eq = equipment || "none";
  const ex = exercises[eq] || exercises["none"];

  const splitTemplates = {
    2: goal === "lose_fat"
      ? [
          { focus: "Full Body A", muscle: "push+legs+core" },
          { focus: "Full Body B", muscle: "pull+legs+cardio" },
        ]
      : [
          { focus: "Upper Body", muscle: "push+pull" },
          { focus: "Lower Body + Core", muscle: "legs+core" },
        ],
    3: [
      { focus: "Push", muscle: "push" },
      { focus: "Pull", muscle: "pull" },
      { focus: "Legs + Core", muscle: "legs+core" },
    ],
    4: [
      { focus: "Chest + Triceps", muscle: "push" },
      { focus: "Back + Biceps", muscle: "pull" },
      { focus: "Legs", muscle: "legs" },
      { focus: "Shoulders + Core", muscle: "push+core" },
    ],
    5: [
      { focus: "Chest + Triceps", muscle: "push" },
      { focus: "Back + Biceps", muscle: "pull" },
      { focus: "Legs", muscle: "legs" },
      { focus: "Shoulders + Arms", muscle: "push+pull" },
      { focus: "Full Body + Core", muscle: "legs+core+cardio" },
    ],
  };

  const template = splitTemplates[daysNum] || splitTemplates[3];
  const allDays = [];
  const totalDays = 7;
  let workoutDayIndex = 0;

  const workoutDays = new Set();
  const spacing = Math.floor(totalDays / daysNum);
  for (let i = 0; i < daysNum; i++) {
    workoutDays.add((i * spacing) % totalDays);
  }

  for (let d = 0; d < totalDays; d++) {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    if (workoutDays.has(d) && workoutDayIndex < template.length) {
      const t = template[workoutDayIndex];
      const muscles = t.muscle.split("+");
      let exList = [];
      muscles.forEach(m => {
        const pool = ex[m] || ex["core"];
        const pick = level === "beginner" ? 2 : level === "advanced" ? 4 : 3;
        exList = exList.concat(pool.slice(0, pick));
      });
      allDays.push({ day: dayNames[d], focus: t.focus, exercises: exList, rest: false });
      workoutDayIndex++;
    } else {
      allDays.push({ day: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][d], rest: true });
    }
  }

  const goalLabels = { lose_fat: "Fat Loss", build_muscle: "Muscle Building", get_fit: "General Fitness", tone_up: "Toning" };
  const eqLabels = { none: "Bodyweight", dumbbells: "Dumbbells", gym: "Gym", resistance: "Resistance Bands" };

  return {
    name: name || "Athlete",
    goal: goalLabels[goal] || goal,
    equipment: eqLabels[eq] || eq,
    days: daysNum,
    level,
    weekPlan: allDays,
  };
}

export default function App() {
  const [step, setStep] = useState("form"); // form | loading | plan
  const [goal, setGoal] = useState("");
  const [equipment, setEquipment] = useState("");
  const [days, setDays] = useState("");
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState(null);
  const [openDays, setOpenDays] = useState({});
  const [done, setDone] = useState({});
  const [error, setError] = useState("");

  const canGenerate = goal && equipment && days && level;

  const handleGenerate = () => {
    if (!canGenerate) { setError("Please fill in all fields above."); return; }
    setError("");
    setStep("loading");
    setTimeout(() => {
      const p = generatePlan(goal, equipment, days, level, name);
      setPlan(p);
      const firstWorkout = p.weekPlan.findIndex(d => !d.rest);
      if (firstWorkout !== -1) setOpenDays({ [firstWorkout]: true });
      setStep("plan");
    }, 1800);
  };

  const toggleDay = (i) => setOpenDays(prev => ({ ...prev, [i]: !prev[i] }));

  const toggleExercise = (dayIdx, exIdx) => {
    const key = `${dayIdx}-${exIdx}`;
    setDone(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalExercises = plan ? plan.weekPlan.reduce((acc, d) => acc + (d.exercises?.length || 0), 0) : 0;
  const completedExercises = Object.values(done).filter(Boolean).length;
  const progressPct = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

  return (
    <>
      <style>{fonts}{css}</style>
      <div className="app">
        <div className="nav">
          <div className="nav-logo">FORGEFIT</div>
          <div className="nav-tag">Your Plan. Your Rules.</div>
        </div>

        {step === "form" && (
          <div className="hero">
            <div className="hero-eyebrow">Free Workout Generator</div>
            <h1>BUILD YOUR<br /><span>PERFECT</span><br />PLAN</h1>
            <p className="hero-sub">Answer 4 questions. Get a personalised weekly training plan in seconds.</p>

            <div className="form">
              {/* NAME */}
              <div>
                <span className="field-label">Your name (optional)</span>
                <input className="text-input" placeholder="e.g. Alex" value={name} onChange={e => setName(e.target.value)} />
              </div>

              {/* GOAL */}
              <div>
                <span className="field-label">What's your goal?</span>
                <div className="options-grid">
                  {GOALS.map(g => (
                    <button key={g.id} className={`option-btn ${goal === g.id ? "selected" : ""}`} onClick={() => setGoal(g.id)}>
                      <span className="icon">{g.icon}</span>{g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* EQUIPMENT */}
              <div>
                <span className="field-label">What equipment do you have?</span>
                <div className="options-grid">
                  {EQUIPMENT.map(e => (
                    <button key={e.id} className={`option-btn ${equipment === e.id ? "selected" : ""}`} onClick={() => setEquipment(e.id)}>
                      <span className="icon">{e.icon}</span>{e.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* DAYS */}
              <div>
                <span className="field-label">Days per week</span>
                <div className="options-grid">
                  {DAYS.map(d => (
                    <button key={d.id} className={`option-btn ${days === d.id ? "selected" : ""}`} onClick={() => setDays(d.id)}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* LEVEL */}
              <div>
                <span className="field-label">Experience level</span>
                <div className="options-grid">
                  {LEVELS.map(l => (
                    <button key={l.id} className={`option-btn ${level === l.id ? "selected" : ""}`} onClick={() => setLevel(l.id)}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && <div className="error-box">{error}</div>}

              <button className="cta-btn" onClick={handleGenerate} disabled={!canGenerate}>
                GENERATE MY PLAN →
              </button>
            </div>
          </div>
        )}

        {step === "loading" && (
          <div className="loading">
            <div className="loading-ring" />
            <div className="loading-text">Building your plan...</div>
            <div className="loading-sub">Personalising for your goal</div>
          </div>
        )}

        {step === "plan" && plan && (
          <div className="plan">
            <div className="plan-header">
              <h2>YOUR <span>{plan.goal.toUpperCase()}</span> PLAN</h2>
              {plan.name && plan.name !== "Athlete" && (
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Built for {plan.name}</div>
              )}
              <div className="plan-meta">
                <span className="plan-badge active">{plan.days}x / week</span>
                <span className="plan-badge active">{plan.equipment}</span>
                <span className="plan-badge">{plan.level}</span>
              </div>
            </div>

            <div className="progress-wrap">
              <div className="progress-label">
                <span>Weekly Progress</span>
                <span>{completedExercises}/{totalExercises} exercises</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            {plan.weekPlan.map((day, i) => (
              <div className="day-card" key={i}>
                {day.rest ? (
                  <div className="rest-day">
                    <span className="rest-icon">😴</span>
                    <span><strong>{day.day}</strong> — Rest & Recovery</span>
                  </div>
                ) : (
                  <>
                    <div className="day-header" onClick={() => toggleDay(i)}>
                      <div className="day-title">
                        <span className="day-num">{day.day.slice(0, 3).toUpperCase()}</span>
                        <span>{day.focus}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="day-focus">{day.exercises.length} exercises</span>
                        <span className={`day-toggle ${openDays[i] ? "open" : ""}`}>▾</span>
                      </div>
                    </div>
                    <div className={`day-body ${openDays[i] ? "open" : ""}`}>
                      {day.exercises.map((ex, j) => {
                        const key = `${i}-${j}`;
                        const isDone = done[key];
                        return (
                          <div className="exercise" key={j}>
                            <div className={`ex-check ${isDone ? "done" : ""}`} onClick={() => toggleExercise(i, j)} />
                            <div className="ex-info">
                              <div className={`ex-name ${isDone ? "done" : ""}`}>{ex.name}</div>
                              <div className="ex-detail">{ex.sets} sets × {ex.reps}</div>
                              {ex.tip && <div className="ex-tip">💡 {ex.tip}</div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            ))}

            <div className="upsell">
              <div className="upsell-label">⚡ Unlock Pro</div>
              <h3>12-Week Progressive Programme</h3>
              <p>This week is just the start. Get a full 12-week plan that automatically increases intensity, tracks your progress, and adapts as you improve.</p>
              <div className="upsell-price">£9<span>/month</span></div>
              <p style={{ fontSize: 12, color: "var(--muted)" }}>Cancel anytime · Instant access</p>
            </div>

            <div className="plan-actions">
              <button className="btn-upgrade">UNLOCK 12-WEEK PROGRAMME — £9/MO</button>
              <button className="btn-secondary" onClick={() => { setStep("form"); setPlan(null); setDone({}); setOpenDays({}); }}>
                ← Generate a different plan
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
