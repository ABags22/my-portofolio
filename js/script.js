document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi AOS
  AOS.init({
    duration: 800,
    once: true,
  });

  const toggle = document.getElementById("dark-toggle");
  const icon = document.getElementById("icon-toggle");
  const html = document.documentElement;

  // Fungsi untuk update ikon
  const updateIcon = () => {
    icon.innerHTML = html.classList.contains("dark")
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />` // bulan
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 3v1m0 16v1m8.66-12.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 4.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`; // matahari
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
});
