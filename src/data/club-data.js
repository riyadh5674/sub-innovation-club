/*
  ============================================================
  SUB INNOVATION CLUB - EDITABLE CONTENT
  ============================================================
  All the text/content on the page lives here so you can edit
  everything in one place. Edit the values below and the rest
  of the page updates automatically.

  - Committee members are currently PLACEHOLDERS. Replace the
    name/role/photo once you have the real executive committee.
  - Events & activities use real info found on the club's
    Facebook page (facebook.com/subinnovationclub) plus the
    official SUB site.
  ============================================================
*/

export const clubData = {
  /* ---- Club identity ------------------------------------------------- */
  name: 'SUB Innovation Club',
  short: 'SUBIC',
  tagline:
    'Encouraging creativity, problem-solving, and entrepreneurship through innovation challenges and projects.',
  objective:
    'Encouraging creativity, problem-solving, and entrepreneurship through innovation challenges and projects.',
  foundingNote:
    'A central club at the State University of Bangladesh (SUB) dedicated to nurturing the innovators, problem-solvers and entrepreneurs of tomorrow.',

  /* ---- About statement ------------------------------------------------ */
  about: [
    'The SUB Innovation Club is a central club of the State University of Bangladesh (SUB). We bring together students from every department to imagine, build and launch ideas that matter.',
    'Through hands-on competitions, hackathons and workshops, we turn curiosity into creation — equipping students with the mindset and tools to thrive in a fast-changing digital world.',
  ],

  /* ---- Mission & Vision ----------------------------------------------- */
  mission: [
    'Encourage creativity and out-of-the-box thinking through innovation challenges.',
    'Build practical problem-solving and teamwork skills among students.',
    'Foster an entrepreneurial mindset and connect students with real-world opportunities.',
    'Create a campus culture where every idea is welcome and every student can contribute.',
  ],
  vision:
    'To be the leading student-driven hub for innovation and entrepreneurship at the State University of Bangladesh — where ideas are born, tested and turned into impact.',

  /* ---- Key stats (shown in the hero/about area) ----------------------- */
  stats: [
    { value: '8+', label: 'Flagship Activities' },
    { value: '10+', label: 'Departments Represented' },
    { value: '2+', label: 'Major Workshops' },
    { value: '100%', label: 'Open to Every Student' },
  ],

  /* ---- Major activities (from the official SUB page) ------------------ */
  activities: [
    {
      icon: 'fa-solid fa-lightbulb',
      title: 'Brainwave Battle',
      desc: 'A rapid-fire idea competition where teams pitch creative solutions to real-world problems.',
    },
    {
      icon: 'fa-solid fa-laptop-code',
      title: 'Smart University Hackathon',
      desc: 'A 24-hour build marathon where students code, design and prototype solutions for a smarter campus.',
    },
    {
      icon: 'fa-solid fa-leaf',
      title: 'Green Campus Initiative',
      desc: 'Sustainability projects and campaigns that make our campus greener and more climate-conscious.',
    },
    {
      icon: 'fa-solid fa-brain',
      title: 'On-the-Spot Problem-Solving Challenge',
      desc: 'Think fast under pressure as teams tackle surprise challenges with limited time and resources.',
    },
    {
      icon: 'fa-solid fa-map-location-dot',
      title: 'Campus Treasure Hunt',
      desc: 'A fun, puzzle-driven scavenger hunt across the campus that tests logic, speed and teamwork.',
    },
    {
      icon: 'fa-solid fa-clapperboard',
      title: 'Narrative Filmmaking Contest',
      desc: 'Students tell compelling short stories through film, honing creativity and media skills.',
    },
    {
      icon: 'fa-solid fa-robot',
      title: 'Robotics Contest',
      desc: 'Design, build and race robots — combining engineering, programming and hands-on invention.',
    },
    {
      icon: 'fa-solid fa-puzzle-piece',
      title: 'Sudoku Competition',
      desc: 'A test of logic and patience as students race to complete the toughest Sudoku grids.',
    },
  ],

  /* ---- Events / highlights (taken from the club FB page) -------------- */
  /* Each event: date, title, body, tags                                    */
  events: [
    {
      date: '13 May 2025',
      title: 'Workshop: Freelancing for Everyone',
      body:
        'The SUB Innovation Club successfully organized a workshop titled "Freelancing for Everyone: Opportunities, Challenges, and Success Strategies" at the SUB campus seminar room. The programme was inaugurated by Prof. Dr. Md. Akhter Hossain Khan, Vice Chancellor (Designate), with welcome remarks from Dr. Ahmed Hussain, Registrar, and a keynote by Abdullah Al Mamun — CEO of Digital Solutions Zone and a proud CSE alumnus.',
      tags: ['Workshop', 'Freelancing', 'CSE'],
    },
    {
      date: '25 May 2025',
      title: 'SUB Innovation Club Election',
      body:
        'The annual SUB Innovation Club election was held at the Open Space to form the new executive committee and continue the club\'s mission with fresh energy and leadership.',
      tags: ['Election', 'Leadership'],
    },
  ],

  /* ---- Committee members (PLACEHOLDERS - edit later) ------------------ */
  // photo: leave empty string "" to show a generated initials avatar.
  committee: [
    {
      name: 'President',
      role: 'President',
      photo: '',
      dept: 'Computer Science & Engineering',
    },
    {
      name: 'Vice President',
      role: 'Vice President',
      photo: '',
      dept: 'Business Studies',
    },
    {
      name: 'General Secretary',
      role: 'General Secretary',
      photo: '',
      dept: 'Computer Science & Engineering',
    },
    {
      name: 'Joint Secretary',
      role: 'Joint Secretary',
      photo: '',
      dept: 'English Studies',
    },
    {
      name: 'Treasurer',
      role: 'Treasurer',
      photo: '',
      dept: 'Business Studies',
    },
    {
      name: 'Event Coordinator',
      role: 'Event Coordinator',
      photo: '',
      dept: 'Law',
    },
    {
      name: 'Public Relations',
      role: 'Public Relations Officer',
      photo: '',
      dept: 'Journalism, Communication & Media Studies',
    },
    {
      name: 'Creative & Design',
      role: 'Creative & Design Lead',
      photo: '',
      dept: 'Architecture',
    },
  ],

  /* ---- Advisors / Convenor (real, from SUB sources) ------------------- */
  advisors: [
    {
      name: 'Md. Samiul Islam',
      role: 'Convenor',
      photo: '',
      dept: 'Assistant Professor, Computer Science & Engineering',
    },
  ],

  /* ---- Photo gallery (placeholders - add real image URLs later) ------- */
  // Use any https:// image URL. Add as many as you like.
  gallery: [
    'https://www.sub.ac.bd/uploads/gallery/e415a1a5923ef29ac4ea.JPG',
    'https://www.sub.ac.bd/uploads/gallery/0e3dbf3a1e8c93a427df.JPG',
    'https://www.sub.ac.bd/uploads/gallery/a564097d28a40056978c.JPG',
    'https://www.sub.ac.bd/uploads/gallery/3803452d222bd7f4d863.jpg',
  ],

  /* ---- Contact & social (from club FB page / SUB site) ---------------- */
  contacts: {
    email: 'innovationclub@sub.ac.bd',
    phone: '+880 1766-662992',
    whatsapp: 'https://wa.me/8801766662992',
    facebook: 'https://www.facebook.com/subinnovationclub',
    instagram: '',
    linkedin: '',
    youtube: '',
    location: 'State University of Bangladesh, 696 Kendua, Kanchan, Rupganj, Narayanganj, Dhaka-1461, Bangladesh',
  },
};
