"use client";

// Chunky illustrated Win95-style icons matching reference image
export function FolderIcon() {
  return (
    <svg width="80" height="68" viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Folder tab */}
      <path d="M4 4 H16 L19 8 H4 Z" fill="#E8B730" stroke="#5C4813" strokeWidth="2" strokeLinejoin="round" />
      {/* Folder body */}
      <rect x="3" y="8" width="34" height="22" rx="2" fill="#FFD43B" stroke="#5C4813" strokeWidth="2" />
      {/* Highlight line */}
      <rect x="6" y="11" width="28" height="2" rx="1" fill="#FFEA85" />
    </svg>
  );
}

export function DocumentIcon() {
  return (
    <svg width="68" height="80" viewBox="0 0 34 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Page */}
      <path d="M4 3 H22 L30 11 V37 H4 Z" fill="#FFFFFF" stroke="#5C4813" strokeWidth="2" strokeLinejoin="round" />
      {/* Dog ear */}
      <path d="M22 3 V11 H30" fill="#D9D9D9" stroke="#5C4813" strokeWidth="2" strokeLinejoin="round" />
      {/* Text lines */}
      <rect x="8" y="15" width="16" height="2" rx="1" fill="#B0B0B0" />
      <rect x="8" y="20" width="18" height="2" rx="1" fill="#B0B0B0" />
      <rect x="8" y="25" width="14" height="2" rx="1" fill="#B0B0B0" />
      <rect x="8" y="30" width="16" height="2" rx="1" fill="#B0B0B0" />
    </svg>
  );
}

export function NotepadIcon() {
  return (
    <svg width="72" height="80" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pad body */}
      <rect x="5" y="5" width="26" height="32" rx="2" fill="#FFFDE0" stroke="#5C4813" strokeWidth="2" />
      {/* Top binding bar */}
      <rect x="5" y="5" width="26" height="5" rx="1" fill="#D4534B" stroke="#5C4813" strokeWidth="2" />
      {/* Spiral holes */}
      <circle cx="10" cy="7.5" r="1.5" fill="#FFFDE0" />
      <circle cx="18" cy="7.5" r="1.5" fill="#FFFDE0" />
      <circle cx="26" cy="7.5" r="1.5" fill="#FFFDE0" />
      {/* Text lines */}
      <rect x="9" y="14" width="18" height="2" rx="1" fill="#B0B0B0" />
      <rect x="9" y="19" width="14" height="2" rx="1" fill="#B0B0B0" />
      <rect x="9" y="24" width="16" height="2" rx="1" fill="#B0B0B0" />
      <rect x="9" y="29" width="12" height="2" rx="1" fill="#B0B0B0" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="80" height="64" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Envelope body */}
      <rect x="3" y="4" width="34" height="24" rx="2" fill="#F5EDD6" stroke="#5C4813" strokeWidth="2" />
      {/* Envelope flap */}
      <path d="M3 4 L20 17 L37 4" fill="none" stroke="#5C4813" strokeWidth="2" strokeLinejoin="round" />
      {/* Inner shadow lines */}
      <path d="M3 28 L15 17" fill="none" stroke="#D9CEAF" strokeWidth="1.5" />
      <path d="M37 28 L25 17" fill="none" stroke="#D9CEAF" strokeWidth="1.5" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg width="76" height="76" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Globe */}
      <circle cx="19" cy="19" r="15" fill="#5BA4E6" stroke="#5C4813" strokeWidth="2" />
      {/* Horizontal lines */}
      <ellipse cx="19" cy="12" rx="12" ry="2.5" fill="none" stroke="#3D7FBF" strokeWidth="1.5" />
      <ellipse cx="19" cy="19" rx="15" ry="4" fill="none" stroke="#3D7FBF" strokeWidth="1.5" />
      <ellipse cx="19" cy="26" rx="12" ry="2.5" fill="none" stroke="#3D7FBF" strokeWidth="1.5" />
      {/* Vertical arc */}
      <ellipse cx="19" cy="19" rx="5" ry="15" fill="none" stroke="#3D7FBF" strokeWidth="1.5" />
      {/* Land blobs */}
      <ellipse cx="13" cy="13" rx="4" ry="3" fill="#6BC26B" />
      <ellipse cx="24" cy="17" rx="5" ry="3" fill="#6BC26B" />
      <ellipse cx="15" cy="24" rx="3" ry="2.5" fill="#6BC26B" />
    </svg>
  );
}

export const iconMap: Record<string, React.FC> = {
  folder: FolderIcon,
  document: DocumentIcon,
  notepad: NotepadIcon,
  mail: MailIcon,
  globe: GlobeIcon,
};
