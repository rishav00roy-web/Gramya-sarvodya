import {
  Sprout,
  Warehouse,
  Corn,
  Tent,
  Leaf,
  Factory,
  YogaMat,
  PiggyBank,
  HandHeart,
  Lightbulb,
  SolarPanel,
  Repeat,
  Users,
  UserGroup,
  Store,
  Mail,
  FlipPhone,
  MapPin,
  Globe,
  Newspaper,
  Camera,
  Book,
  Flag,
  CalendarDays,
  FileText,
} from "kubai-icons-react";
import type { IconName } from "@/lib/site";

/* Kubai Icons, drawn the minimal way: the soft variant, one ink (leaf
   green, a lighter sprout green on dark grounds; the library needs a hex), and motion only when the card or link that
   holds the icon is hovered (trigger="parent" on a data-kubai-trigger
   ancestor). Decorative beside their words, so hidden from screen readers. */
const ICONS = {
  agriculture: Sprout,
  fpc: Warehouse,
  ffs: Corn,
  tourism: Tent,
  education: Leaf,
  udyog: Factory,
  wellness: YogaMat,
  finance: PiggyBank,
  women: HandHeart,
  youth: Lightbulb,
  environment: SolarPanel,
  waste: Repeat,
  volunteer: HandHeart,
  partner: UserGroup,
  enterprise: Store,
  community: Users,
  mail: Mail,
  phone: FlipPhone,
  pin: MapPin,
  globe: Globe,
  news: Newspaper,
  gallery: Camera,
  publication: Book,
  project: Flag,
  activity: CalendarDays,
  report: FileText,
} satisfies Record<IconName, unknown>;

export default function Icon({
  name,
  size = 28,
  trigger = "parent",
  tone = "leaf",
}: {
  name: IconName;
  size?: number;
  trigger?: "parent" | "hover" | "none";
  /** leaf on white and paper, sprout on the forest-green grounds. */
  tone?: "leaf" | "sprout";
}) {
  const Glyph = ICONS[name];
  return (
    <Glyph
      size={size}
      variant="soft"
      color={tone === "leaf" ? "#4E8A2A" : "#A6D36B"}
      trigger={trigger}
      aria-hidden="true"
      focusable="false"
      className="icon"
    />
  );
}
