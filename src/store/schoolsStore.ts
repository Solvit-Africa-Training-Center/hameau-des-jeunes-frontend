export interface School {
  id: string;
  name: string;
  level: "NURSERY" | "PRIMARY" | "SECONDARY" | "TVET" | "UNIVERSITY" | "OTHER";
  district?: string;
}

const STORAGE_KEY = "ifashe_schools";

const DEFAULT_SCHOOLS: School[] = [
  // Nursery
  { id: "s1", name: "Remera Nursery School", level: "NURSERY", district: "Kigali" },
  { id: "s2", name: "Kigali Junior School", level: "NURSERY", district: "Kigali" },
  { id: "s3", name: "Nyamirambo ECD Centre", level: "NURSERY", district: "Kigali" },
  // Primary
  { id: "s4", name: "GS Nyamirambo", level: "PRIMARY", district: "Kigali" },
  { id: "s5", name: "EP Gikondo", level: "PRIMARY", district: "Kigali" },
  { id: "s6", name: "GS Kimironko", level: "PRIMARY", district: "Kigali" },
  { id: "s7", name: "EP Remera", level: "PRIMARY", district: "Kigali" },
  { id: "s8", name: "GS Kicukiro", level: "PRIMARY", district: "Kigali" },
  { id: "s9", name: "GS Biryogo", level: "PRIMARY", district: "Kigali" },
  { id: "s10", name: "EP Kanombe", level: "PRIMARY", district: "Kigali" },
  { id: "s11", name: "GS Gitega", level: "PRIMARY", district: "Kigali" },
  { id: "s12", name: "EP Kigali", level: "PRIMARY", district: "Kigali" },
  { id: "s13", name: "GS Masaka", level: "PRIMARY", district: "Kicukiro" },
  // Secondary
  { id: "s14", name: "CO Gikondo", level: "SECONDARY", district: "Kigali" },
  { id: "s15", name: "Lycée de Kigali", level: "SECONDARY", district: "Kigali" },
  { id: "s16", name: "ES Nyamirambo", level: "SECONDARY", district: "Kigali" },
  { id: "s17", name: "TTC Mururu", level: "SECONDARY", district: "Rutsiro" },
  { id: "s18", name: "IPRC Kigali", level: "SECONDARY", district: "Kigali" },
  { id: "s19", name: "ES Remera", level: "SECONDARY", district: "Kigali" },
  // TVET
  { id: "s20", name: "IPRC Kicukiro", level: "TVET", district: "Kicukiro" },
  { id: "s21", name: "IPRC Musanze", level: "TVET", district: "Musanze" },
  { id: "s22", name: "COJER Kigali", level: "TVET", district: "Kigali" },
  // University
  { id: "s23", name: "University of Rwanda", level: "UNIVERSITY", district: "Kigali" },
  { id: "s24", name: "INES-Ruhengeri", level: "UNIVERSITY", district: "Musanze" },
  { id: "s25", name: "KIM University", level: "UNIVERSITY", district: "Kigali" },
];

export function getSchools(): School[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with defaults on first use
      saveSchools(DEFAULT_SCHOOLS);
      return DEFAULT_SCHOOLS;
    }
    return JSON.parse(raw) as School[];
  } catch {
    return DEFAULT_SCHOOLS;
  }
}

export function saveSchools(schools: School[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schools));
}

export function addSchool(school: Omit<School, "id">): School {
  const schools = getSchools();
  const newSchool: School = { ...school, id: `s${Date.now()}` };
  schools.push(newSchool);
  saveSchools(schools);
  return newSchool;
}

export function deleteSchool(id: string): void {
  const schools = getSchools().filter((s) => s.id !== id);
  saveSchools(schools);
}

export function getSchoolsByLevel() {
  const schools = getSchools();
  return {
    NURSERY: schools.filter((s) => s.level === "NURSERY"),
    PRIMARY: schools.filter((s) => s.level === "PRIMARY"),
    SECONDARY: schools.filter((s) => s.level === "SECONDARY"),
    TVET: schools.filter((s) => s.level === "TVET"),
    UNIVERSITY: schools.filter((s) => s.level === "UNIVERSITY"),
    OTHER: schools.filter((s) => s.level === "OTHER"),
  };
}
