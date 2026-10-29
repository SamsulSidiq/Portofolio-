/**
 * DATA KEAHLIAN & KETERAMPILAN
 * Edit file ini untuk mengubah keterampilan, level kemahiran, dan persentase penguasaan Anda.
 */

const skillsData = [
    {
        category: "support",
        title: "IT Support",
        subtitle: "Area Keterampilan Utama",
        levelBadge: "Tingkat: Mahir / Siap Kerja",
        icon: "fa-headset",
        colorTheme: "blue",
        summary: "Troubleshooting perangkat keras & lunak, instalasi aplikasi, dukungan pengguna, dasar jaringan.",
        items: [
            {
                name: "Troubleshooting Hardware & OS (Win 10/11)",
                percent: 90
            },
            {
                name: "Dukungan Pengguna & Helpdesk Ticketing",
                percent: 85
            },
            {
                name: "Dasar Jaringan (LAN, IP Addressing, WiFi)",
                percent: 80
            }
        ]
    },
    {
        category: "admin",
        title: "Administrasi IT",
        subtitle: "Area Keterampilan Utama",
        levelBadge: "Tingkat: Mahir / Terstruktur",
        icon: "fa-folder-tree",
        colorTheme: "indigo",
        summary: "Dokumentasi, pencatatan aset, pengelolaan data, laporan.",
        items: [
            {
                name: "Pencatatan & Inventarisasi Aset IT",
                percent: 88
            },
            {
                name: "Dokumentasi Teknis & Pembuatan SOP",
                percent: 85
            },
            {
                name: "Pengelolaan & Audit Berkas Data",
                percent: 90
            }
        ]
    },
    {
        category: "tools",
        title: "Tools & Produktivitas",
        subtitle: "Software & Tools Operasional",
        levelBadge: "Tingkat: Tingkat Lanjut",
        icon: "fa-toolbox",
        colorTheme: "emerald",
        summary: "Microsoft Office / Excel, Google Workspace, tools teknis yang dikuasai.",
        items: [
            {
                name: "Microsoft Excel (VLOOKUP, Pivot, Formulas)",
                percent: 92
            },
            {
                name: "Google Workspace (Docs, Sheets, Drive, Forms)",
                percent: 90
            },
            {
                name: "Remote Utilities (AnyDesk, TeamViewer, RDP)",
                percent: 85
            }
        ]
    },
    {
        category: "data",
        title: "Teknis / Data",
        subtitle: "Pengolahan Data & Analisis",
        levelBadge: "Tingkat: Menengah / Praktis",
        icon: "fa-chart-pie",
        colorTheme: "amber",
        summary: "Python, Google Colab, pengolahan data atau tools lain jika dikuasai.",
        items: [
            {
                name: "Python Data Preprocessing (Pandas, Sastrawi)",
                percent: 80
            },
            {
                name: "Google Colab & Jupyter Environment",
                percent: 85
            },
            {
                name: "Dasar Query SQL & Data Modeling (CRISP-DM)",
                percent: 75
            }
        ]
    }
];
