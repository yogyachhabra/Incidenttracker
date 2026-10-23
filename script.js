(() => {
  "use strict";

  // Severity -> LED colour (low to extreme)
  const LED = ["#fbbf1c", "#f6a21a", "#f08419", "#e9560f", "#e23a0b"];

  // days = fixed sample value, sev = 0..4
  const INCIDENTS = [
    { name: "Earthquake", days: 0, sev: 0, last: ["Magnitude 1.1 earthquake", "7 km NW of The Geysers, CA about 15 minutes ago"], info: "Any earthquake of any size recorded anywhere on Earth. Small tremors happen all day long." },
    { name: "Magnitude 6.0 Earthquake", days: 1, sev: 1, last: ["Magnitude 7.0 earthquake", "191 km ENE of Nagqu, China about 19 hours ago"], info: "Earthquakes of magnitude 6.0 or higher, strong enough to damage buildings near the epicentre." },
    { name: "Magnitude 7.0 Earthquake", days: 1, sev: 2, last: ["Magnitude 7.0 earthquake", "191 km ENE of Nagqu, China about 19 hours ago"], info: "Major earthquakes. These can cause serious damage across wide areas." },
    { name: "Interplanetary Shock", days: 25, sev: 0, last: ["Interplanetary shock", "detected near Earth on Sep 28, 2026"], info: "A shock wave in the solar wind, usually pushed by a coronal mass ejection, passing a spacecraft near Earth." },
    { name: "Solar Flare", days: 34, sev: 0, last: ["Class C3.3 solar flare", "on Sep 19, 2026"], info: "A sudden burst of radiation from the Sun. Flares are ranked A, B, C, M and X, with X the strongest." },
    { name: "Tsunami", days: 60, sev: 0, last: ["0.72m high tsunami", "in Balearic Islands on Aug 24, 2026"], info: "A series of ocean waves, usually triggered by an undersea earthquake or landslide." },
    { name: "Geomagnetic Storm", days: 75, sev: 0, last: ["Geomagnetic storm detected", "on Aug 8, 2026"], info: "A disturbance of Earth's magnetic field caused by solar activity. It can bring auroras far from the poles." },
    { name: "Class X1 Solar Flare", days: 111, sev: 0, last: ["Class X1.3 solar flare", "on Jul 5, 2026"], info: "Solar flares at X1 strength or above can disrupt radio communications on the sunlit side of Earth." },
    { name: "Strong Geomagnetic Storm", days: 111, sev: 2, last: ["Strong geomagnetic storm", "detected on Jul 4, 2026"], info: "A G3 level storm on the five step scale. It can affect satellites and some power systems." },
    { name: "Volcanic Eruption", days: 227, sev: 0, last: ["Whakaari/White Island eruption", "in New Zealand on Mar 10, 2026"], info: "An eruption reported by volcano observatories, ranging from small ash emissions to large explosions." },
    { name: "Severe Geomagnetic Storm", days: 277, sev: 3, last: ["Severe geomagnetic storm", "detected on Jan 19, 2026"], info: "A G4 level storm. Auroras can be seen at low latitudes and navigation systems may be disturbed." },
    { name: "Cataclysmic Volcanic Eruption (VEI 4)", days: 334, sev: 2, last: ["Hayli Gubbi eruption", "in Ethiopia on Nov 23, 2025"], info: "A Volcanic Explosivity Index 4 eruption throws out at least 0.1 cubic kilometres of material." },
    { name: "Typhoon", days: 334, sev: 2, last: ["Typhoon Koto", "started on Nov 23, 2025"], info: "A tropical cyclone with sustained winds of 118 km/h or more in the northwest Pacific." },
    { name: "Class X5 Solar Flare", days: 346, sev: 2, last: ["Class X5.1 solar flare", "on Nov 11, 2025"], info: "Five times as intense as an X1 flare. Only a few of these happen in a typical solar cycle." },
    { name: "Super Typhoon", days: 354, sev: 4, last: ["Super Typhoon Fung-wong", "started on Nov 3, 2025"], info: "A typhoon with sustained winds of at least 185 km/h." },
    { name: "Category 5 Hurricane", days: 367, sev: 3, last: ["Category 5 Hurricane Melissa", "started on Oct 21, 2025"], info: "The top of the Saffir-Simpson scale, with winds of 252 km/h or more." },
    { name: "Category 1 Hurricane", days: 390, sev: 0, last: ["Category 1 Hurricane", "started on Sep 28, 2025"], info: "The lowest hurricane category, with winds of 119 to 153 km/h." }
  ];

  // Seven-segment geometry on a 60 x 100 grid. Order: a b c d e f g
  const SEGS = [
    "10,8 16,2 44,2 50,8 44,14 16,14",      // a top
    "52,10 58,16 58,44 52,50 46,44 46,16",  // b top right
    "52,52 58,58 58,86 52,92 46,86 46,58",  // c bottom right
    "10,92 16,86 44,86 50,92 44,98 16,98",  // d bottom
    "8,52 14,58 14,86 8,92 2,86 2,58",      // e bottom left
    "8,10 14,16 14,44 8,50 2,44 2,16",      // f top left
    "10,50 16,44 44,44 50,50 44,56 16,56"   // g middle
  ];
  const MAP = {
    0: "abcdef", 1: "bc", 2: "abdeg", 3: "abcdg", 4: "bcfg",
    5: "acdfg", 6: "acdefg", 7: "abc", 8: "abcdefg", 9: "abcdfg"
  };
  const NS = "http://www.w3.org/2000/svg";

  function digitEl(n) {
    const on = MAP[n];
    const wrap = document.createElement("div");
    wrap.className = "digit";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 60 100");
    svg.setAttribute("aria-hidden", "true");
    SEGS.forEach((pts, i) => {
      const p = document.createElementNS(NS, "polygon");
      p.setAttribute("points", pts);
      p.setAttribute("class", "seg" + (on.includes("abcdefg"[i]) ? " on" : ""));
      svg.appendChild(p);
    });
    wrap.appendChild(svg);
    return wrap;
  }

  function board(item) {
    const art = document.createElement("article");
    art.className = "board";

    const head = document.createElement("div");
    head.className = "board-head";
    const color = LED[item.sev];
    head.innerHTML =
      `<i class="led l" style="background:${color}"></i><i class="led r" style="background:${color}"></i>` +
      `<span>Days since <b></b></span>`;
    head.querySelector("b").textContent = item.name;

    const info = document.createElement("button");
    info.className = "info"; info.type = "button"; info.textContent = "i";
    info.setAttribute("aria-label", "About " + item.name);
    const tip = document.createElement("span");
    tip.className = "tip"; tip.textContent = item.info;
    info.appendChild(tip);
    head.querySelector("span").appendChild(info);

    const digits = document.createElement("div");
    digits.className = "digits";
    digits.setAttribute("role", "img");
    digits.setAttribute("aria-label", item.days + (item.days === 1 ? " day" : " days"));
    String(item.days).padStart(8, "0").split("").forEach((c) => digits.appendChild(digitEl(+c)));

    const last = document.createElement("div");
    last.className = "last";
    const k = document.createElement("span"); k.className = "k"; k.textContent = "Last: ";
    const u = document.createElement("u"); u.textContent = item.last[0];
    last.append(k, u, " " + item.last[1]);

    art.append(head, digits, last);
    return art;
  }

  const root = document.getElementById("boards");
  INCIDENTS.forEach((it) => root.appendChild(board(it)));
})();
