/**
 * Portfolio Core Interactive Engine
 * Mochamad Shcamsul Sieddik Permana - IT Support & Administrasi IT
 */

// Fallback Default Data (synchronized with assets/js/data/profil.js)
const defaultProfile = {
    fullName: (typeof profileData !== "undefined" && profileData.fullName) ? profileData.fullName : "Mochamad Shcamsul Sieddik Permana",
    title: (typeof profileData !== "undefined" && profileData.title) ? profileData.title : "IT Support • Administrasi IT",
    degree: (typeof profileData !== "undefined" && profileData.degree) ? profileData.degree : "Sarjana (S1)",
    status: (typeof profileData !== "undefined" && profileData.status) ? profileData.status : "Sarjana (S1) • Lulusan 2026 | Terbuka untuk Peluang Magang & Kerja Profesional",
    photoUrl: (typeof profileData !== "undefined" && profileData.photoUrl) ? profileData.photoUrl : "assets/images/profile.jpg",
    email: (typeof profileData !== "undefined" && profileData.email) ? profileData.email : "samsulsidiq120@gmail.com",
    phone: (typeof profileData !== "undefined" && profileData.phone) ? profileData.phone : "+62 831-4304-8170",
    location: (typeof profileData !== "undefined" && profileData.location) ? profileData.location : "Bandung, Jawa Barat",
    linkedin: (typeof profileData !== "undefined" && profileData.linkedin) ? profileData.linkedin : "https://www.linkedin.com/in/samsul-sidiq-471a8a443",
    linkedinDisplay: (typeof profileData !== "undefined" && profileData.linkedinDisplay) ? profileData.linkedinDisplay : "linkedin.com/in/samsul-sidiq-471a8a443",
    github: (typeof profileData !== "undefined" && profileData.github) ? profileData.github : "https://github.com/SamsulSidiq",
    githubDisplay: (typeof profileData !== "undefined" && profileData.githubDisplay) ? profileData.githubDisplay : "github.com/SamsulSidiq",
    university: (typeof profileData !== "undefined" && profileData.university) ? profileData.university : "Institut Digital Ekonomi LPKIA Bandung",
    major: (typeof profileData !== "undefined" && profileData.major) ? profileData.major : "Teknik Informatika",
    gradYear: (typeof profileData !== "undefined" && profileData.gradYear) ? profileData.gradYear : "2026",
    bio: (typeof profileData !== "undefined" && profileData.bio) ? profileData.bio : "Mahasiswa tingkat akhir / Sarjana (S1) Teknik Informatika dari Institut Digital Ekonomi LPKIA Bandung yang memiliki pengalaman magang di PT Primasaga Strategic dan LSP GMBE, serta minat berkarier pada bidang IT Support dan Administrasi IT. Memiliki motivasi tinggi untuk terus belajar, bekerja secara teliti dan terstruktur, serta siap memberikan kontribusi nyata dalam kelancaran operasional perusahaan.",
    primasagaPeriod: "Agustus 2023 – Desember 2023",
    gmbePeriod: "Februari 2023 – Juni 2023"
};

let activeProfile = {};

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadProfileState();
    initSkillFilters();
    initModals();
    initInteractiveTerminal();
    initScrollSpy();
    setupEventListeners();
});

// Load profile state directly from profil.js
function loadProfileState() {
    let base = { ...defaultProfile };
    if (typeof profileData !== "undefined") {
        base = { ...base, ...profileData };
    }
    activeProfile = { ...base };
    renderProfileData();
}

// Render data to DOM elements
function renderProfileData() {
    document.querySelectorAll("[data-bind]").forEach(el => {
        const key = el.getAttribute("data-bind");
        if (activeProfile[key] !== undefined) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.value = activeProfile[key];
            } else if (el.tagName === "A" && el.hasAttribute("data-bind-href")) {
                const hrefKey = el.getAttribute("data-bind-href");
                if (hrefKey === "email") {
                    el.href = `mailto:${activeProfile.email}`;
                } else if (hrefKey === "phone") {
                    const clean = activeProfile.phone.replace(/[^0-9]/g, '');
                    el.href = `https://wa.me/${clean}`;
                } else if (hrefKey === "linkedin") {
                    el.href = activeProfile.linkedin.startsWith("http") ? activeProfile.linkedin : `https://${activeProfile.linkedin}`;
                } else if (hrefKey === "github") {
                    el.href = activeProfile.github.startsWith("http") ? activeProfile.github : `https://${activeProfile.github}`;
                }
                el.textContent = activeProfile[key];
            } else {
                el.textContent = activeProfile[key];
            }
        }
    });

    // Handle profile photo & avatar fallback
    const photoImg = document.getElementById("hero-profile-img");
    const photoFallback = document.getElementById("hero-photo-fallback");
    if (photoImg) {
        photoImg.onload = function() {
            photoImg.classList.remove("hidden");
            if (photoFallback) photoFallback.classList.add("hidden");
        };
        photoImg.onerror = function() {
            photoImg.classList.add("hidden");
            if (photoFallback) photoFallback.classList.remove("hidden");
        };
        photoImg.src = activeProfile.photoUrl || "assets/images/profile.jpg";
    }

    // Update Initials
    const initials = getInitials(activeProfile.fullName);
    document.querySelectorAll(".profile-initials-badge").forEach(el => {
        el.textContent = initials;
    });

    // Update Dynamic WhatsApp links
    const cleanPhone = activeProfile.phone.replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(`Halo ${activeProfile.fullName}, saya melihat portofolio Anda di bidang IT Support & Administrasi IT dan tertarik mendiskusikan peluang kerja.`);
    document.querySelectorAll(".dynamic-wa-link").forEach(link => {
        link.href = `https://wa.me/${cleanPhone}?text=${waText}`;
    });

    // Update Dynamic Mail links
    const mailSubject = encodeURIComponent("Undangan Diskusi Peluang Kerja - IT Support & Administrasi IT");
    document.querySelectorAll(".dynamic-mail-link").forEach(link => {
        link.href = `mailto:${activeProfile.email}?subject=${mailSubject}`;
    });
}

function getInitials(name) {
    if (!name) return "IT";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Theme handling (Light / Dark)
function initTheme() {
    const savedTheme = localStorage.getItem("portfolio_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
        updateThemeIcons(false);
    } else {
        document.documentElement.classList.add("dark");
        updateThemeIcons(true);
    }

    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const isDark = document.documentElement.classList.toggle("dark");
            localStorage.setItem("portfolio_theme", isDark ? "dark" : "light");
            updateThemeIcons(isDark);
            showToast(isDark ? "🌙 Mode Gelap Aktif" : "☀️ Mode Terang Aktif");
        });
    }
}

function updateThemeIcons(isDark) {
    const sunIcon = document.getElementById("theme-icon-sun");
    const moonIcon = document.getElementById("theme-icon-moon");
    if (sunIcon && moonIcon) {
        if (isDark) {
            sunIcon.classList.remove("hidden");
            moonIcon.classList.add("hidden");
        } else {
            sunIcon.classList.add("hidden");
            moonIcon.classList.remove("hidden");
        }
    }
}

// Terminal Shell Emulator in Hero
function initInteractiveTerminal() {
    const logsContainer = document.getElementById("terminal-logs");
    if (!logsContainer) return;

    const commands = [
        { cmd: "check-system --status", out: "✓ OS: Windows 11 Enterprise | Memory: 16GB | Hardware Health: 100%" },
        { cmd: "ping gateway.lan.primasaga -c 3", out: "3 packets transmitted, 0% packet loss, avg rtt: 1.6ms [STABLE]" },
        { cmd: "query --db e_report_karyawan --deployed", out: "Backend: PHP/MySQL | 4 Sprints Completed | All logs verified" },
        { cmd: "python evaluate_sentimen_persib.py", out: "Model: DecisionTree | Accuracy: 86.4% | Precision: 85.1% | CRISP-DM OK" },
        { cmd: "whoami", out: "Mochamad Shcamsul Sieddik Permana • Ready for IT Support & Admin Role 🚀" }
    ];

    let index = 0;
    function addCommandLine() {
        if (index >= commands.length) index = 0;
        const current = commands[index];

        const line = document.createElement("div");
        line.className = "text-xs space-y-0.5 animate-fadeIn font-mono";
        line.innerHTML = `
            <div class="flex items-center gap-1.5 text-blue-400">
                <span class="text-emerald-400 font-bold">admin@station:~$</span>
                <span class="text-slate-200">${current.cmd}</span>
            </div>
            <div class="text-slate-400 pl-4 font-mono text-[11px]">${current.out}</div>
        `;
        logsContainer.appendChild(line);

        while (logsContainer.children.length > 4) {
            logsContainer.removeChild(logsContainer.firstChild);
        }

        index++;
    }

    addCommandLine();
    addCommandLine();
    setInterval(addCommandLine, 4200);
}

// Skills Filter
function initSkillFilters() {
    const buttons = document.querySelectorAll(".skill-filter-btn");
    const cards = document.querySelectorAll(".skill-card-item");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => {
                b.classList.remove("bg-blue-600", "text-white", "shadow-md");
                b.classList.add("bg-slate-100", "dark:bg-slate-800/80", "text-slate-600", "dark:text-slate-400");
            });

            btn.classList.add("bg-blue-600", "text-white", "shadow-md");
            btn.classList.remove("bg-slate-100", "dark:bg-slate-800/80", "text-slate-600", "dark:text-slate-400");

            const filter = btn.getAttribute("data-filter");
            cards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
}

// Modals
function initModals() {
    // Project Modals
    setupModal("project-modal-1", "open-modal-1", "close-modal-1");
    setupModal("project-modal-2", "open-modal-2", "close-modal-2");

    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal-backdrop")) {
            e.target.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.add("hidden"));
            document.body.classList.remove("overflow-hidden");
        }
    });
}

function setupModal(modalId, openTriggerId, closeTriggerId) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openTriggerId);
    const closeBtn = document.getElementById(closeTriggerId);

    if (modal && openBtn) {
        openBtn.addEventListener("click", () => {
            modal.classList.remove("hidden");
            document.body.classList.add("overflow-hidden");
        });
    }

    if (modal && closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
        });
    }
}

// Scrollspy for navbar
function initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-desktop-link");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPosition = window.pageYOffset + 130;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("text-blue-600", "dark:text-blue-400", "font-bold");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("text-blue-600", "dark:text-blue-400", "font-bold");
            }
        });
    });
}

// Global Event Listeners
function setupEventListeners() {
    // Print CV
    document.querySelectorAll(".btn-print-cv").forEach(btn => {
        btn.addEventListener("click", () => {
            window.print();
        });
    });

    // Copy to clipboard
    document.querySelectorAll("[data-copy]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const key = btn.getAttribute("data-copy");
            const val = activeProfile[key] || btn.getAttribute("data-value");
            if (val) {
                navigator.clipboard.writeText(val).then(() => {
                    showToast(`📋 ${key === 'email' ? 'Email' : 'No. HP'} berhasil disalin: ${val}`);
                });
            }
        });
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });

        mobileMenu.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });
    }

    // Direct message form
    const msgForm = document.getElementById("direct-message-form");
    if (msgForm) {
        msgForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("msg-name").value;
            const email = document.getElementById("msg-email").value;
            const subject = document.getElementById("msg-subject").value || "Undangan Wawancara IT Support & Administrasi";
            const text = document.getElementById("msg-text").value;

            const body = encodeURIComponent(`Halo ${activeProfile.fullName},\n\nNama/Perusahaan: ${name} (${email})\n\nPesan:\n${text}`);
            const mailtoUri = `mailto:${activeProfile.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            window.location.href = mailtoUri;
            showToast("🚀 Membuka aplikasi email...");
        });
    }
}

// Toast popup
function showToast(msg) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-msg bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/50 dark:border-slate-200 text-xs font-semibold flex items-center gap-2.5 backdrop-blur-md";
    toast.innerHTML = `<span>${msg}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(8px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}
