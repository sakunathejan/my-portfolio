// DOM Elements
let myWork = document.getElementById("projects-grid");
let myWorkBottomSection = document.getElementById("bottom-section");
let mobileMenuBtn = document.getElementById("mobile-menu-btn");
let mobileMenu = document.getElementById("mobile-menu");
let contactForm = document.getElementById("contact-form");
let formFeedback = document.getElementById("form-feedback");

// Helper function to format repository titles nicely
function formatRepoName(repoName) {
    return repoName.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase());
}

// ----------------------------------------------------
// 1. Mobile Menu Toggle
// ----------------------------------------------------
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });

    // Close menu when a navigation link is clicked
    let navLinks = document.querySelectorAll(".mobile-nav-link");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            mobileMenu.classList.add("hidden");
        });
    });
}

// ----------------------------------------------------
// 2. Fetch Repositories from GitHub
// ----------------------------------------------------
function renderProjects(projectsList) {
    if (!myWork) return;
    myWork.innerHTML = ""; // Clear loading placeholder

    projectsList.forEach((element, index) => {
        myWork.innerHTML += `
            <article class="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#111217] p-5 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#C6F432]/50 hover:shadow-[0_20px_55px_-25px_rgba(198,244,50,0.25)]">

                <!-- Ambient Glow -->
                <div class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#C6F432]/10 blur-3xl opacity-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-100"></div>

                <!-- Accent Line -->
                <div class="absolute inset-x-5 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#C6F432] to-transparent transition-transform duration-500 group-hover:scale-x-100"></div>

                <!-- Header -->
                <div class="relative flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="text-4xl font-black tracking-tighter text-[#C6F432]/35 transition-all duration-500 group-hover:scale-110 group-hover:text-[#C6F432]">
                            ${String(index + 1).padStart(2, "0")}
                        </span>
                        <div class="h-8 w-px bg-white/10"></div>
                        <div>
                            <p class="text-[10px] uppercase tracking-[0.2em] text-[#A9A9A4]">Project</p>
                            <p class="mt-1 text-xs font-medium text-[#EDEDEA]">Repository #${index + 1}</p>
                        </div>
                    </div>

                    <span class="inline-flex max-w-[125px] items-center gap-2 truncate rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-[#A9A9A4] transition-all duration-300 group-hover:border-[#C6F432]/30 group-hover:text-[#C6F432]">
                        <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C6F432] shadow-[0_0_8px_#C6F432] transition-transform duration-300 group-hover:scale-125"></span>
                        ${element.language || "Java / Web"}
                    </span>
                </div>

                <!-- Decorative Code Area -->
                <div class="relative mt-5 flex h-[86px] items-center justify-between overflow-hidden rounded-xl border border-white/[0.06] bg-[#0E0F13] px-4">
                    <div class="relative z-10 space-y-2">
                        <div class="flex items-center gap-2">
                            <span class="text-xs text-[#C6F432]">01</span>
                            <div class="h-1.5 w-20 rounded-full bg-[#C6F432]/50 transition-all duration-500 group-hover:w-28 group-hover:bg-[#C6F432]"></div>
                        </div>
                        <div class="flex items-center gap-2 pl-4">
                            <span class="text-xs text-purple-300/70">&lt;/&gt;</span>
                            <div class="h-1 w-12 rounded-full bg-white/15"></div>
                            <div class="h-1 w-7 rounded-full bg-white/10"></div>
                        </div>
                        <div class="flex items-center gap-2 pl-4">
                            <div class="h-1 w-8 rounded-full bg-[#C6F432]/25"></div>
                            <div class="h-1 w-16 rounded-full bg-white/10"></div>
                        </div>
                    </div>

                    <div class="absolute right-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C6F432]/10 bg-[#C6F432]/[0.04] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-[#C6F432]/30 group-hover:bg-[#C6F432]/10">
                        <span class="text-3xl font-light text-[#C6F432]/50 transition-all duration-500 group-hover:text-[#C6F432]">{ }</span>
                    </div>
                </div>

                <!-- Project Details -->
                <div class="relative mt-5">
                    <h3 class="break-words text-xl font-bold tracking-tight text-[#EDEDEA] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#C6F432]">
                        ${formatRepoName(element.name)}
                    </h3>
                    <p class="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-[#A9A9A4]">
                        ${element.description || "An experiment in building, learning, and solving problems through code."}
                    </p>
                </div>

                <!-- Repository Statistics -->
                <div class="relative mt-4 flex items-center gap-4 border-t border-white/[0.07] pt-4">
                    <span class="inline-flex items-center gap-1.5 text-xs text-[#A9A9A4] transition-colors duration-300 group-hover:text-[#EDEDEA]">
                        <span class="text-sm text-[#C6F432]">★</span>
                        ${element.stargazers_count || 0}
                        <span class="hidden sm:inline">Stars</span>
                    </span>

                    <span class="inline-flex items-center gap-1.5 text-xs text-[#A9A9A4] transition-colors duration-300 group-hover:text-[#EDEDEA]">
                        <span class="text-sm">⑂</span>
                        ${element.forks_count || 0}
                        <span class="hidden sm:inline">Forks</span>
                    </span>

                    <span class="ml-auto rounded-md border border-white/[0.07] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#A9A9A4]">
                        GitHub
                    </span>
                </div>

                <!-- Repository Link -->
                <a href="${element.html_url}" target="_blank" rel="noopener noreferrer" aria-label="View ${formatRepoName(element.name)} on GitHub" class="relative mt-4 flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-[#C6F432]/40 hover:bg-[#C6F432]/[0.06]">
                    <span class="text-sm font-semibold text-[#EDEDEA] transition-colors duration-300 group-hover:text-[#C6F432]">
                        Explore Project
                    </span>
                    <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.05] text-[#A9A9A4] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#C6F432] group-hover:text-[#0E0F13]">
                        ↗
                    </span>
                </a>

            </article>
        `;
    });
}

// Fallback project data if GitHub API limit is reached or offline
const fallbackProjects = [
    {
        name: "student-management-system",
        language: "Java",
        description: "Comprehensive desktop software with layered architecture, MVC pattern, and MySQL database integration.",
        stargazers_count: 3,
        forks_count: 1,
        html_url: "https://github.com/sakunathejan"
    },
    {
        name: "modern-portfolio-web",
        language: "HTML / Tailwind",
        description: "Responsive personal developer portfolio built with modern Tailwind CSS, clean layouts, and asynchronous JavaScript.",
        stargazers_count: 5,
        forks_count: 2,
        html_url: "https://github.com/sakunathejan"
    },
    {
        name: "pos-inventory-app",
        language: "Java & MySQL",
        description: "Point of Sale (POS) and inventory tracking application featuring customer management and receipt generation.",
        stargazers_count: 4,
        forks_count: 1,
        html_url: "https://github.com/sakunathejan"
    }
];

// Fetch GitHub Repos
fetch("https://api.github.com/users/sakunathejan/repos?sort=created&direction=desc&per_page=100")
    .then(response => {
        if (!response.ok) {
            throw new Error("GitHub API response not ok");
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            renderProjects(data.slice(0, 3));
        } else {
            renderProjects(fallbackProjects);
        }
    })
    .catch(error => {
        console.warn("Could not load GitHub repos, displaying fallback projects:", error);
        renderProjects(fallbackProjects);
    });

// Fetch GitHub User details for the bottom link
if (myWorkBottomSection) {
    fetch("https://api.github.com/users/sakunathejan")
        .then(res => res.json())
        .then(data => {
            let profileUrl = data.html_url || "https://github.com/sakunathejan";
            myWorkBottomSection.innerHTML = `
                <p class="text-sm text-[#A9A9A4]">
                    Always building. Always learning.
                </p>
                <a href="${profileUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm font-medium text-[#C6F432] hover:text-[#EDEDEA] transition">
                    Explore more repositories on GitHub
                    <span>↗</span>
                </a>
            `;
        })
        .catch(() => {
            myWorkBottomSection.innerHTML = `
                <p class="text-sm text-[#A9A9A4]">
                    Always building. Always learning.
                </p>
                <a href="https://github.com/sakunathejan" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm font-medium text-[#C6F432] hover:text-[#EDEDEA] transition">
                    Explore more repositories on GitHub
                    <span>↗</span>
                </a>
            `;
        });
}

// ----------------------------------------------------
// 3. Contact Form Submission (Beginner-Friendly Handler)
// ----------------------------------------------------
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        // Prevent default browser page refresh
        e.preventDefault();

        // Get user values
        let nameInput = document.getElementById("user-name");
        let emailInput = document.getElementById("user-email");
        let subjectInput = document.getElementById("user-subject");
        let messageInput = document.getElementById("user-message");

        let name = nameInput ? nameInput.value.trim() : "Friend";

        // Display feedback notification
        if (formFeedback) {
            formFeedback.className = "mb-6 p-4 rounded-xl border border-[#C6F432]/40 bg-[#C6F432]/10 text-[#C6F432] text-sm font-medium block";
            formFeedback.innerHTML = `
                <div class="flex items-center gap-2">
                    <span class="text-base">✓</span>
                    <span>Thank you, <strong>${name}</strong>! Your message has been received. I will reply to you as soon as possible.</span>
                </div>
            `;

            // Scroll feedback into view smoothly
            formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });

            // Automatically hide after 6 seconds
            setTimeout(function () {
                formFeedback.classList.add("hidden");
                formFeedback.classList.remove("block");
            }, 6000);
        }

        // Reset form inputs
        contactForm.reset();
    });
}
