type MeditationGuide = {
  title: string;
  steps: string[];
};
export const meditationGuides: Record<string, MeditationGuide> = {
  mindfulness: {
    title: "Mindfulness Meditation",
    steps: [
      "Find a comfortable and quiet place to sit.",
      "Close your eyes gently and take a few deep breaths.",
      "Bring your attention to the sensation of your breath.",
      "Notice the feeling of the air entering and leaving your body.",
      "If your mind wanders, gently guide it back to your breath.",
      "Continue for your chosen duration without judgment.",
    ],
  },
  breathing: {
    title: "Breathing Exercise",
    steps: [
      "Sit or lie down in a comfortable position.",
      "Inhale slowly through your nose for a count of four.",
      "Hold your breath for a count of seven.",
      "Exhale slowly and completely through your mouth for a count of eight.",
      "Repeat this cycle three to five times.",
      "Notice the feeling of calm washing over you.",
    ],
  },
  'body-scan': {
    title: "Body Scan Meditation",
    steps: [
      "Lie down comfortably on your back.",
      "Bring your awareness to your toes on your left foot.",
      "Notice any sensations without judgment.",
      "Slowly move your focus up your left leg, to your hip.",
      "Repeat for your right leg, torso, arms, neck, and face.",
      "End by feeling your whole body as one peaceful sensation.",
    ],
  },
  'loving-kindness': {
    title: "Loving-Kindness Meditation",
    steps: [
        "Find a comfortable seated position and close your eyes.",
        "Bring to mind someone you love deeply. Wish them well, saying silently, 'May you be happy. May you be healthy. May you be safe.'",
        "Now, turn this loving-kindness toward yourself. 'May I be happy. May I be healthy. May I be safe.'",
        "Next, think of a neutral person, someone you don't have strong feelings about. Wish them well.",
        "If you feel ready, think of someone with whom you have difficulty. Wish them well.",
        "Finally, expand this feeling of loving-kindness to all beings everywhere.",
    ],
  },
  mantra: {
    title: "Mantra Meditation",
    steps: [
        "Sit comfortably with your back straight and eyes closed.",
        "Choose a simple, calming word or phrase as your mantra (e.g., 'Om', 'Peace', 'I am calm').",
        "Begin to repeat your mantra silently or in a soft whisper to yourself.",
        "Coordinate the mantra with your breath if it feels natural.",
        "When your mind wanders (and it will), gently guide your focus back to the mantra.",
        "There is no goal but to simply be with the sound and vibration of your chosen word.",
    ],
  },
  walking: {
    title: "Walking Meditation",
    steps: [
        "Find a quiet path where you can walk back and forth, about 10-20 steps long.",
        "Stand at one end, feeling the sensation of your feet on the ground.",
        "Begin to walk very slowly. Pay close attention to the feeling of lifting one foot, moving it through the air, and placing it down.",
        "Notice the shift in weight and the contact with the ground.",
        "When you reach the end of your path, pause, turn around mindfully, and begin again.",
        "Your focus is not on getting anywhere, but on the simple act of walking.",
    ],
  },
  others: {
    title: "Meditation Practice",
    steps: [
        "Find a comfortable position.",
        "Focus on your breath.",
        "Gently return your focus when your mind wanders.",
    ]
  }
};