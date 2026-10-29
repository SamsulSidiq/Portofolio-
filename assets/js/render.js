/**
 * RENDERER ENGINE
 * Bertanggung jawab merender data dari folder assets/js/data/ ke halaman web secara dinamis dan rapi.
 */

function renderAll() {
    renderProfile();
    renderExperience();
    renderProjects();
    renderSkills();
}

// 1. Render Profil & Biodata
function renderProfile() {
    if (typeof profileData === "undefined") return;

    // Ambil data yang tersimpan di localStorage jika ada
    const saved = localStorage.getItem("portfolio_profile_data");
    let activeProfile = { ...profileData };
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.fullName && parsed.fullName !== "Nama Lengkap Anda") {
                if (parsed.university && (parsed.university.includes("[") || parsed.university.includes("Terkemuka"))) {
                    parsed.university = profileData.university;
                }
                activeProfile = { ...activeProfile, ...parsed };
            }
        } catch (e) {
            console.error("Gagal membaca profile localStorage:", e);
        }
    }

    // Bind data ke semua elemen ber-atribut data-bind
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
                    const cleanPhone = activeProfile.phone.replace(/[^0-9]/g, '');
                    el.href = `https://wa.me/${cleanPhone}`;
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

    // Update Action Button Hrefs
    const heroMailBtn = document.getElementById("hero-email-btn");
    if (heroMailBtn) {
        heroMailBtn.href = `mailto:${activeProfile.email}?subject=Tawaran%20Peluang%20Kerja%20-%20IT%20Support%20%2F%20Administrasi%20IT`;
    }

    const heroWaBtn = document.getElementById("hero-wa-btn");
    if (heroWaBtn) {
        const cleanPhone = activeProfile.phone.replace(/[^0-9]/g, '');
        const msg = encodeURIComponent(`Halo ${activeProfile.fullName}, saya melihat portofolio Anda di bidang IT Support & Administrasi IT dan tertarik untuk mendiskusikan peluang kerja.`);
        heroWaBtn.href = `https://wa.me/${cleanPhone}?text=${msg}`;
    }

    const contactWaBtn = document.getElementById("contact-wa-btn");
    if (contactWaBtn) {
        const cleanPhone = activeProfile.phone.replace(/[^0-9]/g, '');
        const msg = encodeURIComponent(`Halo ${activeProfile.fullName}, saya tertarik untuk mengundang Anda berdiskusi mengenai kesempatan kerja.`);
        contactWaBtn.href = `https://wa.me/${cleanPhone}?text=${msg}`;
    }

    // Update Foto Profil Avatar
    const avatarImg = document.getElementById("avatar-img");
    const fallbackIcon = document.getElementById("avatar-fallback-icon");
    if (avatarImg) {
        avatarImg.onload = function () {
            avatarImg.style.display = "block";
            if (fallbackIcon) {
                fallbackIcon.classList.add("hidden");
                fallbackIcon.classList.remove("flex");
            }
        };
        avatarImg.onerror = function () {
            avatarImg.style.display = "none";
            if (fallbackIcon) {
                fallbackIcon.classList.remove("hidden");
                fallbackIcon.classList.add("flex");
            }
        };
        avatarImg.src = activeProfile.photoUrl || "assets/images/profile.jpg";
    }

    // Render 3 Pilar Nilai Profesional
    const valuesContainer = document.getElementById("values-container");
    if (valuesContainer && activeProfile.professionalValues) {
        valuesContainer.innerHTML = activeProfile.professionalValues.map(val => `
            <div class="flex items-start gap-3 bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
                <div class="w-7 h-7 rounded-full bg-${val.colorClass}-100 dark:bg-${val.colorClass}-900/60 text-${val.colorClass}-600 dark:text-${val.colorClass}-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    <i class="fa-solid ${val.icon}"></i>
                </div>
                <div>
                    <h4 class="text-sm font-semibold text-slate-800 dark:text-slate-200">${val.title}</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${val.description}</p>
                </div>
            </div>
        `).join('');
    }
}

// 2. Render Riwayat Pengalaman Magang
function renderExperience() {
    const container = document.getElementById("experience-container");
    if (!container || typeof experienceData === "undefined") return;

    container.innerHTML = experienceData.map(exp => `
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-2xl bg-${exp.colorTheme}-600/10 dark:bg-${exp.colorTheme}-500/20 text-${exp.colorTheme}-600 dark:text-${exp.colorTheme}-400 flex items-center justify-center text-2xl font-bold shrink-0">
                        <i class="fa-solid ${exp.icon}"></i>
                    </div>
                    <div>
                        <span class="inline-block bg-${exp.colorTheme}-100 dark:bg-${exp.colorTheme}-900/60 text-${exp.colorTheme}-800 dark:text-${exp.colorTheme}-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                            ${exp.badge}
                        </span>
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                            ${exp.company}
                        </h3>
                        <p class="text-sm font-semibold text-${exp.colorTheme}-600 dark:text-${exp.colorTheme}-400">
                            ${exp.role}
                        </p>
                    </div>
                </div>
                <div class="text-xs sm:text-right text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700/60 inline-flex sm:block items-center gap-2">
                    <span class="font-semibold block text-slate-700 dark:text-slate-300">Periode Magang:</span>
                    <span data-bind="${exp.periodKey}">${exp.period}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
                <!-- Tugas & Tanggung Jawab -->
                <div class="lg:col-span-7 space-y-3">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                        <i class="fa-solid fa-list-check text-${exp.colorTheme}-500"></i> Tugas dan Tanggung Jawab:
                    </h4>
                    <ul class="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                        ${exp.responsibilities.map(r => `
                            <li class="flex items-start gap-2.5">
                                <i class="fa-solid fa-circle-check text-${exp.colorTheme}-600 dark:text-${exp.colorTheme}-400 text-xs mt-1 shrink-0"></i>
                                <span>${r}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Tools & Kontribusi Hasil -->
                <div class="lg:col-span-5 space-y-4">
                    <div>
                        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-2">
                            <i class="fa-solid fa-wrench text-amber-500"></i> Tools & Aplikasi yang Digunakan:
                        </h4>
                        <div class="flex flex-wrap gap-1.5">
                            ${exp.tools.map(t => `
                                <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700">
                                    ${t}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="p-3.5 rounded-xl bg-${exp.colorTheme}-50/70 dark:bg-${exp.colorTheme}-950/40 border border-${exp.colorTheme}-200/70 dark:border-${exp.colorTheme}-900/60">
                        <h4 class="text-xs font-bold uppercase tracking-wider text-${exp.colorTheme}-900 dark:text-${exp.colorTheme}-300 mb-1 flex items-center gap-1.5">
                            <i class="fa-solid fa-trophy text-amber-500"></i> Hasil & Kontribusi:
                        </h4>
                        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            ${exp.achievements}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. Render Proyek Pilihan & Modal Detailnya
function renderProjects() {
    const container = document.getElementById("projects-container");
    const modalsContainer = document.getElementById("project-modals-container");
    if (!container || typeof projectsData === "undefined") return;

    // Render Cards
    container.innerHTML = projectsData.map(p => `
        <div class="group bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 hover:border-${p.colorTheme}-400 dark:hover:border-${p.colorTheme}-600 transition shadow-sm hover:shadow-lg flex flex-col justify-between">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-${p.colorTheme}-100 text-${p.colorTheme}-800 dark:bg-${p.colorTheme}-900/70 dark:text-${p.colorTheme}-300">
                        <i class="fa-solid ${p.icon}"></i> ${p.badge}
                    </span>
                    <span class="text-xs font-mono text-slate-400 dark:text-slate-500">${p.category}</span>
                </div>

                <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-${p.colorTheme}-600 dark:group-hover:text-${p.colorTheme}-400 transition">
                    ${p.title}
                </h3>

                <!-- Konteks -->
                <div class="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1.5">
                    <div class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <i class="fa-solid fa-circle-info text-${p.colorTheme}-500"></i> ${p.contextTitle}
                    </div>
                    <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                        ${p.contextText}
                    </p>
                    <div class="font-semibold text-slate-600 dark:text-slate-400 pt-1">
                        <span class="text-${p.colorTheme}-600 dark:text-${p.colorTheme}-400">Metode Kerja:</span> ${p.contextMethod}
                    </div>
                </div>

                <!-- Peran dan Hasil -->
                <div class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Peran dan Hasil Implementasi:
                    </h4>
                    <p class="text-xs sm:text-sm leading-relaxed">
                        ${p.roleAndResults}
                    </p>
                </div>

                <!-- Tech Badges -->
                <div class="flex flex-wrap gap-1.5 pt-1">
                    ${p.techBadges.map(b => `
                        <span class="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-700">
                            ${b}
                        </span>
                    `).join('')}
                </div>
            </div>

            <!-- Action Button -->
            <div class="pt-6 mt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <button id="${p.modal.openBtnId}"
                    class="inline-flex items-center gap-2 text-xs font-bold text-${p.colorTheme}-600 hover:text-${p.colorTheme}-700 dark:text-${p.colorTheme}-400 dark:hover:text-${p.colorTheme}-300 transition cursor-pointer">
                    <span>${p.id === 'proyek-1' ? 'Lihat Rincian Alur Scrum & Fitur' : 'Lihat Pipeline CRISP-DM & Hasil Evaluasi'}</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
                <span class="text-[11px] text-${p.colorTheme === 'blue' ? 'emerald' : 'blue'}-600 dark:text-${p.colorTheme === 'blue' ? 'emerald' : 'blue'}-400 font-semibold bg-${p.colorTheme === 'blue' ? 'emerald' : 'blue'}-50 dark:bg-${p.colorTheme === 'blue' ? 'emerald' : 'blue'}-950/60 px-2 py-0.5 rounded border border-${p.colorTheme === 'blue' ? 'emerald' : 'blue'}-200 dark:border-${p.colorTheme === 'blue' ? 'emerald' : 'blue'}-800">
                    ${p.statusText}
                </span>
            </div>
        </div>
    `).join('');

    // Render Modals Detail Proyek
    if (modalsContainer) {
        modalsContainer.innerHTML = projectsData.map(p => {
            const m = p.modal;
            if (p.id === "proyek-1") {
                return `
                    <div id="${m.id}" class="modal-backdrop fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm hidden flex items-center justify-center p-4 overflow-y-auto">
                        <div class="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 max-h-[90vh] overflow-y-auto">
                            <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
                                        <i class="fa-solid ${m.icon}"></i>
                                    </div>
                                    <div>
                                        <span class="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">${m.subtitle}</span>
                                        <h3 class="font-bold text-slate-900 dark:text-white text-lg">${m.modalTitle}</h3>
                                    </div>
                                </div>
                                <button id="${m.closeBtnId}" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>

                            <div class="space-y-5 pt-4 text-sm text-slate-600 dark:text-slate-300">
                                <div>
                                    <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                                        <i class="fa-solid fa-diagram-project text-blue-500"></i> Implementasi Metodologi Agile Scrum
                                    </h4>
                                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                                        ${m.sprints.map(s => `
                                            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                                <span class="font-bold text-blue-600 block">${s.name}</span>
                                                ${s.desc}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                                <div>
                                    <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                                        <i class="fa-solid fa-layer-group text-blue-500"></i> Fitur Kunci Sistem
                                    </h4>
                                    <ul class="space-y-1.5 text-xs">
                                        ${m.keyFeatures.map(kf => `
                                            <li class="flex items-center gap-2">
                                                <i class="fa-solid fa-check text-emerald-500"></i> ${kf}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>

                                <div class="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/60">
                                    <span class="text-xs font-bold text-blue-900 dark:text-blue-300 block mb-1">Kontribusi Utama:</span>
                                    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${m.mainContribution}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div id="${m.id}" class="modal-backdrop fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm hidden flex items-center justify-center p-4 overflow-y-auto">
                        <div class="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 max-h-[90vh] overflow-y-auto">
                            <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-lg">
                                        <i class="fa-solid ${m.icon}"></i>
                                    </div>
                                    <div>
                                        <span class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">${m.subtitle}</span>
                                        <h3 class="font-bold text-slate-900 dark:text-white text-lg">${m.modalTitle}</h3>
                                    </div>
                                </div>
                                <button id="${m.closeBtnId}" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>

                            <div class="space-y-5 pt-4 text-sm text-slate-600 dark:text-slate-300">
                                <div>
                                    <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                                        <i class="fa-solid fa-chart-pie text-indigo-500"></i> Metodologi 6 Tahap CRISP-DM
                                    </h4>
                                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs">
                                        ${m.crispDmStages.map(st => `
                                            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                                <span class="font-bold text-indigo-600 block">${st.step}</span>
                                                ${st.desc}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                                <div>
                                    <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                                        <i class="fa-solid fa-filter text-amber-500"></i> Pipeline Text Preprocessing (NLP)
                                    </h4>
                                    <div class="text-xs bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono leading-relaxed space-y-1">
                                        ${m.nlpPipeline.map(item => `<div>${item}</div>`).join('')}
                                    </div>
                                </div>

                                <div class="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-900/60">
                                    <span class="text-xs font-bold text-indigo-900 dark:text-indigo-300 block mb-1">Hasil Evaluasi & Rekomendasi:</span>
                                    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${m.evaluationAndFindings}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }).join('');
    }

    // Pasang event listener modal proyek setelah dirender
    setupProjectModal("project-modal-1", "open-modal-1", "close-modal-1");
    setupProjectModal("project-modal-2", "open-modal-2", "close-modal-2");
}

// 4. Render Keterampilan (4 Area Kurikulum Portofolio)
function renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container || typeof skillsData === "undefined") return;

    container.innerHTML = skillsData.map(s => `
        <div class="skill-card bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
            data-category="${s.category}">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-${s.colorTheme}-100 dark:bg-${s.colorTheme}-900/50 text-${s.colorTheme}-600 dark:text-${s.colorTheme}-400 flex items-center justify-center text-lg">
                        <i class="fa-solid ${s.icon}"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-slate-900 dark:text-white text-base">${s.title}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">${s.subtitle}</p>
                    </div>
                </div>
                <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-${s.colorTheme}-50 dark:bg-${s.colorTheme}-950 text-${s.colorTheme}-700 dark:text-${s.colorTheme}-300 border border-${s.colorTheme}-200 dark:border-${s.colorTheme}-800">
                    ${s.levelBadge}
                </span>
            </div>

            <div class="space-y-3">
                <div class="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    Keterampilan / Bukti Kemampuan:
                </div>
                <p class="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    ${s.summary}
                </p>

                <div class="space-y-2 pt-2">
                    ${s.items.map(it => `
                        <div class="flex justify-between items-center text-xs">
                            <span class="text-slate-600 dark:text-slate-300">${it.name}</span>
                            <span class="font-bold text-${s.colorTheme}-600 dark:text-${s.colorTheme}-400">${it.percent}%</span>
                        </div>
                        <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                            <div class="bg-${s.colorTheme}-600 h-2 rounded-full transition-all duration-500" style="width: ${it.percent}%"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}
