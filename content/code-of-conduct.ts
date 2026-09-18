/**
 * TODO(2026): this is a standard community code of conduct written for the site. Have the
 * organizing team review it, and add an official reporting email in `content/site.ts` if there is one.
 * DevFest events also follow the Google Developer Groups community guidelines.
 */
export const codeOfConduct = {
  intro:
    "DevFest Ogbomoso is a community event, and everyone who comes is part of that community. We want every attendee, speaker, volunteer and partner to feel welcome, safe and respected.",
  sections: [
    {
      title: "What we expect",
      items: [
        "Be kind and respectful to everyone, whatever their background, experience level, gender, religion, ethnicity, disability or appearance.",
        "Listen, ask questions in good faith, and give speakers and other attendees room to share.",
        "Look after shared spaces and equipment, and follow the instructions of organizers and volunteers.",
        "Keep talks and conversations professional and welcoming. Avoid jokes or images that could exclude or offend others.",
      ],
    },
    {
      title: "What we won't tolerate",
      items: [
        "Harassment, intimidation or discrimination of any kind, in person or online.",
        "Unwelcome physical contact, unwanted attention, or continuing to interact after someone asks you to stop.",
        "Sexual language or imagery, threats, or deliberately disruptive behaviour.",
        "Photographing or recording someone after they've asked you not to.",
      ],
    },
    {
      title: "If something happens",
      items: [
        "Tell any organizer or volunteer at the event, and we'll take it seriously and handle it privately.",
        "Organizers may warn anyone who breaks these rules, or ask them to leave the event.",
        "After the event, you can message GDG Ogbomoso on X.",
      ],
    },
  ],
} as const;
