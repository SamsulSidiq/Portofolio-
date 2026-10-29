/**
 * DATA PROYEK PILIHAN
 * Edit file ini untuk memperbarui portofolio proyek, teknologi, dan alur metodologinya.
 */

const projectsData = [
    {
        id: "proyek-1",
        title: "Sistem Laporan Kegiatan Karyawan",
        badge: "Proyek 01 | PKL",
        category: "Agile Scrum Framework",
        icon: "fa-code",
        colorTheme: "blue",
        statusText: "Selesai & Teruji",
        contextTitle: "Konteks Proyek:",
        contextText: "Proyek sistem laporan kegiatan karyawan yang dikembangkan dalam konteks <strong>Praktik Kerja Lapangan (PKL)</strong> untuk mempermudah pemantauan produktivitas kerja tim.",
        contextMethod: "Agile Scrum (Sprint Planning, Daily Standup, Sprint Review, dan Retrospective).",
        roleAndResults: "Berperan merancang struktur basis data relasional (MySQL), mengembangkan antarmuka form pengisian aktivitas terstruktur, fitur upload lampiran bukti tugas, status verifikasi supervisor, serta modul rekapitulasi laporan berkala (PDF/Excel).",
        techBadges: [
            "PHP / Web Dev",
            "MySQL Database",
            "Bootstrap / CSS",
            "Agile Scrum",
            "Git Version Control"
        ],
        modal: {
            id: "project-modal-1",
            openBtnId: "open-modal-1",
            closeBtnId: "close-modal-1",
            modalTitle: "Sistem Laporan Kegiatan Karyawan",
            subtitle: "Proyek PKL • Agile Scrum",
            icon: "fa-list-check",
            sprints: [
                { name: "Sprint 1", desc: "Analisis & Perancangan ERD Database" },
                { name: "Sprint 2", desc: "Modul Login & Input Log Harian" },
                { name: "Sprint 3", desc: "Approval Supervisor & Filter" },
                { name: "Sprint 4", desc: "Testing & Rekap Export PDF" }
            ],
            keyFeatures: [
                "Form entri aktivitas kerja harian dengan validasi tanggal & waktu kerja.",
                "Fitur unggah berkas bukti pekerjaan / lampiran pendukung.",
                "Dashboard supervisor untuk approval/revisi laporan bawahan.",
                "Ekspor rekapitulasi laporan kegiatan format PDF & Excel."
            ],
            mainContribution: "Berhasil menyelesaikan siklus pengembangan tepat waktu dalam 4 sprint, mempermudah pelaporan harian karyawan tanpa berkas kertas manual, dan mempercepat rekapitulasi laporan bulanan pimpinan."
        }
    },
    {
        id: "proyek-2",
        title: "Analisis Sentimen Ulasan Aplikasi Persib",
        badge: "Proyek 02 | Skripsi / Riset",
        category: "CRISP-DM & Decision Tree",
        icon: "fa-chart-line",
        colorTheme: "indigo",
        statusText: "Akurasi Terverifikasi",
        contextTitle: "Konteks Proyek:",
        contextText: "Proyek akademik / tugas akhir (skripsi) untuk menganalisis sentimen ulasan pengguna aplikasi resmi <strong>Persib di Google Play Store</strong> guna memetakan kepuasan pengguna.",
        contextMethod: "CRISP-DM Framework dan Algoritma <strong>Decision Tree Classifier</strong>.",
        roleAndResults: "Mengumpulkan ulasan via web scraper, melakukan preprocessing teks intensif (case folding, filtering, tokenizing, stopword removal, dan stemming kata Bahasa Indonesia dengan Sastrawi), ekstraksi bobot TF-IDF, serta evaluasi performa model dengan confusion matrix.",
        techBadges: [
            "Python",
            "Google Colab",
            "Scikit-Learn",
            "Pandas & NumPy",
            "NLP Sastrawi"
        ],
        modal: {
            id: "project-modal-2",
            openBtnId: "open-modal-2",
            closeBtnId: "close-modal-2",
            modalTitle: "Analisis Sentimen Ulasan Aplikasi Persib",
            subtitle: "Skripsi / Riset Data Science",
            icon: "fa-brain",
            crispDmStages: [
                { step: "1. Bus. Und.", desc: "Analisis kebutuhan & rumusan masalah" },
                { step: "2. Data Und.", desc: "Scraping 2.000+ data Play Store" },
                { step: "3. Data Prep", desc: "Cleaning, Stemming Sastrawi" },
                { step: "4. Modeling", desc: "Decision Tree (CART/C4.5)" },
                { step: "5. Evaluation", desc: "Akurasi, Confusion Matrix" },
                { step: "6. Deployment", desc: "Visualisasi rekomendasi" }
            ],
            nlpPipeline: [
                "1. Case Folding: Mengubah huruf kecil seluruh ulasan",
                "2. Text Cleaning: Menghapus emoji, tanda baca, angka, & link",
                "3. Tokenizing: Memecah kalimat menjadi token kata",
                "4. Normalization: Mengubah kata slang/singkatan ke kata baku",
                "5. Stopword Removal: Menghapus kata hubung Bahasa Indonesia",
                "6. Stemming (Sastrawi): Mengembalikan kata ke bentuk dasar",
                "7. TF-IDF: Pembobotan term frequency - inverse document freq"
            ],
            evaluationAndFindings: "Model Decision Tree berhasil memprediksi ulasan dengan akurasi teruji. Analisis menemukan bahwa sentimen negatif mayoritas dipicu oleh kendala pada fitur login akun member dan pembelian tiket online, menjadi rekomendasi konkret bagi tim pengembang aplikasi Persib."
        }
    }
];
