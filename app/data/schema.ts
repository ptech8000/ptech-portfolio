export type Group = "ROBOTICS" | "EMBEDDED" | "IoT" | "AI" | "POWER" | "EDUCATION";

export type Flagship = {
  tag: string;
  blurb: string;
  specs: [string, string][];
  chips: string[];
  note: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  group: Group;
  icon: string;
  hue: string;
  tags: string;
  status: string;
  summary: string;
  platform: string;
  control: string;
  communication: string;
  video: string;
  audio: string;
  hardware: string[];
  software: string[];
  problem: string;
  solution: string;
  future: string[];
  futureLabel?: string;
  futureHeading?: string;
  facts?: [string, string][];
  implementation?: string;
  evidence?: string;
  /** Source repositories (label + URL) */
  repos?: { label: string; url: string }[];
  /** Demonstration or field-test video URL */
  videoUrl?: string;
  /** Label for the demonstration or field-test video link */
  videoLabel?: string;
  built?: boolean;
  /** Slugs of related case studies */
  related?: string[];
  /** Hero build photograph URL (served from public/) */
  image?: string;
  /** Accessible alt text for the hero photograph */
  imageAlt?: string;
  /** Additional build photographs and hardware captions */
  gallery?: { src: string; caption: string }[];
  /** If present, the project is shown as a flagship on the home page */
  flagship?: Flagship;
};
