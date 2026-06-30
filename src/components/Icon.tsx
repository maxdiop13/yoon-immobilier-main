import {
  FileCheck2,
  HardHat,
  Trees,
  Eye,
  Search,
  Camera,
  ClipboardCheck,
  Hammer,
  Calculator,
  KeyRound,
  ShieldCheck,
  Video,
  FileText,
  Scale,
  MapPin,
  Building2,
  GitCompareArrows,
  Repeat,
  Globe,
  Users,
  Ruler,
  Target,
  Handshake,
  Network,
  Plane,
  Map,
  UserRound,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "papiers"
  | "structure"
  | "environnement"
  | "eye"
  | "search"
  | "camera"
  | "clipboard"
  | "hammer"
  | "calculator"
  | "key"
  | "shield"
  | "video"
  | "document"
  | "scale"
  | "pin"
  | "building"
  | "compare"
  | "loop"
  | "globe"
  | "family"
  | "ruler"
  | "target"
  | "handshake"
  | "network"
  | "plane"
  | "map"
  | "user"
  | "sparkles";

const MAP: Record<IconName, LucideIcon> = {
  papiers: FileCheck2,
  structure: HardHat,
  environnement: Trees,
  eye: Eye,
  search: Search,
  camera: Camera,
  clipboard: ClipboardCheck,
  hammer: Hammer,
  calculator: Calculator,
  key: KeyRound,
  shield: ShieldCheck,
  video: Video,
  document: FileText,
  scale: Scale,
  pin: MapPin,
  building: Building2,
  compare: GitCompareArrows,
  loop: Repeat,
  globe: Globe,
  family: Users,
  ruler: Ruler,
  target: Target,
  handshake: Handshake,
  network: Network,
  plane: Plane,
  map: Map,
  user: UserRound,
  sparkles: Sparkles,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = MAP[name];
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
