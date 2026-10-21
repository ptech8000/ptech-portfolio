import type { Project } from "../schema";

const project: Project = {
  "slug": "vault-raspberry-pi-file-server",
  "title": "Raspberry Pi 3 Model B File Server (Vault)",
  "category": "NETWORKING / INFRASTRUCTURE",
  "group": "EMBEDDED",
  "icon": "server",
  "hue": "#fbbf24",
  "built": true,
  "image": "/projects/raspberry-pi-file-server/vault-dashboard.png",
  "imageAlt": "Vault web file server interface running on a Raspberry Pi 3 Model B showing Public and Restricted folders, search, upload, and storage usage",
  "gallery": [
    { "src": "/projects/raspberry-pi-file-server/vault-dashboard.png", "caption": "Vault file manager interface showing folder visibility controls (Public / Restricted), file search, upload/folder creation, user management, and active storage usage" },
    { "src": "/projects/raspberry-pi-file-server/vault-login.png", "caption": "Vault authentication portal requiring username and password login before accessing hosted files" }
  ],
  "tags": "Raspberry Pi 3 Model B · Vault Web UI · Access Control · File Hosting",
  "summary": "A self-hosted file server ('Vault') running on a Raspberry Pi 3 Model B with a dark-themed web interface, user authentication, Public and Restricted folder permissions, trash recovery, activity logging, and real-time storage monitoring.",
  "status": "WORKING SYSTEM / DEPLOYED",
  "implementation": "PRODUCTION READY",
  "evidence": "Running in active use on a Raspberry Pi 3 Model B hosting multi-gigabyte media and project directories with role-based access (Administrator & user accounts), Public/Restricted folder visibility, file search, browser uploads, and activity audit logs.",
  "platform": "Raspberry Pi 3 Model B",
  "control": "Vault Web Interface",
  "communication": "LAN / Wi-Fi HTTP(S)",
  "video": "—",
  "audio": "—",
  "hardware": [
    "Raspberry Pi 3 Model B",
    "External storage drive / high-endurance flash storage",
    "Dedicated 5 V power supply",
    "Local Wi-Fi / Ethernet network connection"
  ],
  "software": [
    "Raspberry Pi OS (Linux)",
    "Vault web file server application",
    "Username & password session authentication",
    "Public vs. Restricted folder visibility & user permissions",
    "Real-time file search, browser upload, and folder creation",
    "Administration suite: Trash management, Users panel, and Activity Log",
    "Live storage usage meter"
  ],
  "facts": [
    [
      "Platform",
      "Raspberry Pi 3 Model B"
    ],
    [
      "Web App",
      "Vault File Server UI"
    ],
    [
      "Access Control",
      "Login auth · Public & Restricted folders"
    ],
    [
      "Admin Tools",
      "Users · Activity Log · Trash · Storage gauge"
    ]
  ],
  "problem": "Sharing large files, media libraries, and engineering assets across devices on a network without paying for cloud subscriptions or exposing private folders to every user on the LAN.",
  "solution": "Built and deployed 'Vault' on a Raspberry Pi 3 Model B — a self-hosted web file server with a clean dark UI. Users sign in through an authentication portal to browse, search, and upload files. Administrators can set individual folders to Public or Restricted, manage user accounts, review the Activity Log, recover deleted items from the Trash, and monitor disk usage in real time.",
  "futureLabel": "COMPLETED FEATURES",
  "futureHeading": "DEPLOYED SERVER CAPABILITIES",
  "future": [
    "Self-hosted on a Raspberry Pi 3 Model B with reliable continuous operation",
    "Secure username and password sign-in portal",
    "Granular Public and Restricted folder visibility controls",
    "Browser-based file upload, folder creation, and instant file search",
    "Administrator dashboard with Users management, Activity Log, Trash, and live storage gauge"
  ],
  "related": [
    "code4us",
    "smart-multi-purpose-ugv"
  ]
};

export default project;
