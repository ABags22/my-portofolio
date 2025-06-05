document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi AOS
  AOS.init({ duration: 800, once: true });

  // DARK MODE TOGGLE
  const toggle = document.getElementById("dark-toggle");
  const icon = document.getElementById("icon-toggle");
  const html = document.documentElement;

  // Fungsi untuk update ikon
  const updateIcon = () => {
    icon.innerHTML = html.classList.contains("dark")
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
           d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
           d="M12 3v1m0 16v1m8.66-12.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 4.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
  };

  // Terapkan preferensi awal
  if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  updateIcon();

  // Event toggle
  toggle.addEventListener("click", () => {
    html.classList.toggle("dark");
    const theme = html.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    updateIcon();
  });

  // SCROLL TO TOP BUTTON
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    scrollToTopBtn.classList.toggle("hidden", window.scrollY <= 300);
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // FORM VALIDATION (CONTACT)
  const contactForm = document.getElementById("contactForm");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name) return alert("Nama tidak boleh kosong.");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return alert("Masukkan email yang valid.");
    if (!message) return alert("Pesan tidak boleh kosong.");

    alert("Pesan berhasil dikirim! (simulasi)");
    contactForm.reset();
  });

  // LOAD & RENDER PROJECTS
  fetch("data/projects.json")
    .then((res) => res.json())
    .then((projects) => {
      const container = document.getElementById("projectList");

      const renderProjects = (category) => {
        const filtered = category === "All" ? projects : projects.filter((p) => p.category.toLowerCase() === category.toLowerCase());

        container.innerHTML = filtered
          .map(
            (project) => `
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition" data-aos="fade-up">
                <div class="aspect-square w-full mb-4 overflow-hidden rounded-md">
                  <img src="${project.image}" alt="${project.title}"
                    class="w-full h-full object-cover transition hover:scale-105" />
                </div>
                <h4 class="text-lg font-bold mb-1">${project.title}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  ${project.description}
                </p>
                <div class="flex flex-wrap gap-2 mb-3">
                  ${project.tools.map((tool) => `<span class="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded">${tool}</span>`).join("")}
                </div>
                <a href="${project.link}" target="_blank"
                  class="text-indigo-500 text-sm font-semibold hover:underline">
                  View Project →
                </a>
              </div>
            `
          )
          .join("");

        AOS.refresh();
      };

      renderProjects("All");

      document.querySelectorAll(".filter-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const category = button.getAttribute("data-category");

          // Update button style
          document.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.classList.remove("bg-blue-500", "text-white");
            btn.classList.add("bg-gray-200", "dark:bg-gray-700");
          });

          button.classList.add("bg-blue-500", "text-white");
          button.classList.remove("bg-gray-200", "dark:bg-gray-700");

          renderProjects(category);
        });
      });
    })
    .catch((err) => {
      console.error("Gagal memuat project:", err);
    });

  // HAMBURGER MENU TOGGLE
  lucide.createIcons();

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const iconHamburger = document.getElementById("icon-hamburger");
  const iconClose = document.getElementById("icon-close");

  menuToggle.addEventListener("click", () => {
    // Toggle menu
    menu.classList.toggle("flex");

    // Toggle icon hamburger & close
    iconHamburger.classList.toggle("hidden");
    iconClose.classList.toggle("hidden");
  });
});
