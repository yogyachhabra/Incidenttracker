HAZARD BOARD

A "days since last incident" tracker for a very eventful planet.

You know the sign in a factory that says "14 days since last accident"? This is that, except the incidents are earthquakes, solar flares, typhoons and volcanoes. Every one of them gets its own counter, drawn with chunky seven-segment digits, under a hazard-tape border.

Try it now!

https://yogyachhabra.github.io/Incidenttracker/

FEATURES
Incident counters: every event has its own board showing the days since it last happened.
Seven-segment digits: a classic display look, with the unlit segments faintly visible like a real one.
Severity lights: the two lamps on each board go from yellow to red-orange depending on how serious the event is.
Info buttons: hover over the ⓘ next to a title to read a short explanation of the event.
Hazard-tape design: a black-and-yellow border and a tilted, bolted sign at the top.
Works on phones: the layout and digits resize on small screens.
WHY I MADE THIS

Because the "days since last incident" sign is one of the funniest ideas out there, and everyone already understands it without an explanation.

I wanted to build something with a strong personality that was still simple underneath. It also gave me a good reason to practise drawing things with plain CSS and SVG instead of using images.

HOW I MADE THIS
HTML for the structure of the page
CSS for the hazard-tape border, the sign, the boards and the layout
JavaScript to build every counter from a list of incidents, and to draw the seven-segment digits as small SVG shapes

No frameworks and no libraries. The numbers are fixed sample values, so there's no live data.

RUN LOCALLY

1. Clone the repo

git clone https://github.com/your-username/hazard-board

2. Go to the project folder

cd hazard-board

3. Install Live Server

Download the Live Server extension for your code editor (for example, VS Code).

4. Open the project

Right-click the index.html file and choose Open with Live Server. The page will open in your browser on localhost.

ADD YOUR OWN INCIDENT

Open script.js and add a line to the INCIDENTS list:

js
{
  name: "Meteor Shower",
  days: 12,
  sev: 1,
  last: ["Perseid peak", "on Oct 11, 2026"],
  info: "Bits of comet dust burning up in the atmosphere."
}

sev goes from 0 (mild) to 4 (extreme) and sets the color of the lamps.
