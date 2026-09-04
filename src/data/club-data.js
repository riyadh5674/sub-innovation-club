/*
  ============================================================
  SUB INNOVATION CLUB - EDITABLE CONTENT
  ============================================================
  All the text/content on the page lives here so you can edit
  everything in one place. Edit the values below and the rest
  of the page updates automatically.
  ============================================================
*/

import workshop01 from '../assets/images/freelancing-workshop-01.jpg';
import workshop02 from '../assets/images/freelancing-workshop-02.jpg';
import workshop03 from '../assets/images/freelancing-workshop-03.jpg';
import workshop04 from '../assets/images/freelancing-workshop-04.jpg';
import workshop05 from '../assets/images/freelancing-workshop-05.jpg';
import subLogo from '../assets/images/sub-logo.jpg';
import convenorPhoto from '../assets/images/convenor-sovon-mallick.jpg';

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
  aboutImage: workshop01,
  universityLogo: subLogo,

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
    { value: 8, suffix: '+', label: 'Flagship Activities' },
    { value: 10, suffix: '+', label: 'Departments Represented' },
    { value: 2, suffix: '+', label: 'Major Workshops' },
    { value: 100, suffix: '%', label: 'Open to Every Student' },
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

  /* ---- Executive committee -------------------------------------------- */
  committee: [
    { name: '', role: 'President', photo: '', dept: '' },
    { name: '', role: 'Vice President', photo: '', dept: '' },
    { name: '', role: 'General Secretary', photo: '', dept: '' },
    { name: '', role: 'Joint Secretary', photo: '', dept: '' },
    { name: '', role: 'Treasurer', photo: '', dept: '' },
    { name: '', role: 'Event Coordinator', photo: '', dept: '' },
    { name: '', role: 'Public Relations Officer', photo: '', dept: '' },
    { name: '', role: 'Creative & Design Lead', photo: '', dept: '' },
  ],

  /* ---- Convenor / Advisors -------------------------------------------- */
  advisors: [
    {
      name: 'Sovon Mallick',
      role: 'Convenor',
      photo: convenorPhoto,
      dept: 'Lecturer, Department of CSE',
      url: 'https://sub.ac.bd/faculty/428',
    },
  ],

  /* ---- Photo gallery -------------------------------------------------- */
  gallery: [
    { src: workshop01, caption: 'Freelancing for Everyone Workshop' },
    { src: workshop02, caption: 'Freelancing for Everyone Workshop' },
    { src: workshop03, caption: 'Freelancing for Everyone Workshop' },
    { src: workshop04, caption: 'Freelancing for Everyone Workshop' },
    { src: workshop05, caption: 'Freelancing for Everyone Workshop' },
    'https://www.sub.ac.bd/uploads/gallery/e415a1a5923ef29ac4ea.JPG',
    'https://www.sub.ac.bd/uploads/gallery/0e3dbf3a1e8c93a427df.JPG',
    'https://www.sub.ac.bd/uploads/gallery/a564097d28a40056978c.JPG',
    'https://www.sub.ac.bd/uploads/gallery/3803452d222bd7f4d863.jpg',
  ],

  /* ---- FAQ ----------------------------------------------------------- */
  faq: [
    {
      q: 'Who can join the SUB Innovation Club?',
      a: 'Any currently enrolled student at the State University of Bangladesh (SUB) — regardless of department or batch — can apply for membership.',
    },
    {
      q: 'How much is the membership fee?',
      a: 'The membership fee is ৳300 (three hundred Bangladeshi Taka). This covers your club ID card, event materials, and administrative costs for the academic year.',
    },
    {
      q: 'How do I pay the membership fee?',
      a: 'You can pay via bKash, Nagad, Rocket, or bank transfer. After making the payment, enter your Transaction ID and upload a screenshot in the membership form. Our team will verify your payment within 48 hours.',
    },
    {
      q: 'Do I need any prior experience to join?',
      a: 'Not at all! We welcome students of all skill levels. Whether you are a beginner or an experienced innovator, there is a place for you in the club.',
    },
    {
      q: 'What activities does the club organize?',
      a: 'We organize hackathons, idea competitions, workshops, film-making contests, robotics events, treasure hunts, problem-solving challenges, and much more throughout the academic year.',
    },
    {
      q: 'Will I receive a membership card?',
      a: 'Yes! After your application is verified, you will receive an official SUB Innovation Club membership card which gives you access to all club events and workshops.',
    },
    {
      q: 'Can I participate in events without being a member?',
      a: 'Some events are open to all students, but members get priority registration, exclusive workshops, and special networking opportunities. We recommend joining to get the full experience.',
    },
    {
      q: 'How long is the membership valid?',
      a: 'Your membership is valid for one academic year. You can renew your membership at the start of each new academic year.',
    },
  ],

  /* ---- Testimonials -------------------------------------------------- */
  testimonials: [
    {
      text: 'Joining SUBIC was the best decision of my university life. The hackathon organized by the club gave me the confidence to launch my own startup. The mentors and peers here are incredibly supportive.',
      name: 'Rafid Hossain',
      dept: 'CSE, Batch 2022',
    },
    {
      text: 'The Freelancing Workshop opened my eyes to a world of opportunities. Within three months of joining the club, I landed my first freelance client. SUBIC truly bridges the gap between learning and earning.',
      name: 'Tasnim Ahmed',
      dept: 'BBA, Batch 2023',
    },
    {
      text: 'As a design enthusiast, I found the perfect creative community in SUBIC. The filmmaking contest and design challenges pushed me to think outside the box and build a strong portfolio.',
      name: 'Nusrat Jahan',
      dept: 'English, Batch 2023',
    },
  ],

  /* ---- Partners / Sponsors ------------------------------------------- */
  partners: [
    { name: 'State University of Bangladesh', url: '' },
    { name: 'SUB CSE Department', url: '' },
    { name: 'Digital Solutions Zone', url: '' },
  ],

  /* ---- Blog / Announcements ------------------------------------------ */
  blog: [
    {
      title: 'Freelancing Workshop Recap',
      excerpt: 'A look back at our most successful workshop with 100+ participants learning freelancing strategies from industry experts.',
      date: '15 May 2025',
      tag: 'Workshop',
      image: workshop01,
    },
    {
      title: 'New Executive Committee Elected',
      excerpt: 'The club has elected a dynamic new executive committee ready to lead SUBIC into an exciting new chapter of innovation.',
      date: '26 May 2025',
      tag: 'Club News',
      image: workshop02,
    },
    {
      title: 'Upcoming: Smart University Hackathon',
      excerpt: 'Get ready for our flagship 24-hour hackathon. Teams of 2-4 will compete to build solutions for a smarter campus.',
      date: 'Coming Soon',
      tag: 'Event',
      image: workshop03,
    },
  ],

  /* ---- Membership Fee ------------------------------------------------ */
  membershipFee: 300,
  membershipFeeCurrency: 'BDT',

  /* ---- Departments (for membership form dropdown) -------------------- */
  departments: [
    'B.Sc. in Computer Science & Engineering (CSE)',
    'B.Sc. in Electronics & Communication Engineering (ECE)',
    'B.Sc. in Electrical & Electronic Engineering (EEE)',
    'B.Sc. in Civil Engineering',
    'B.Sc. in Mechanical Engineering',
    'BBA in Finance & Banking',
    'BBA in Management',
    'BBA in Marketing',
    'B.Sc. in Accounting & Information Systems (AIS)',
    'B.Sc. in Electronics & Telecommunication Engineering',
    'BA in English',
    'BA in Bangla',
    'BSS in Sociology',
    'BSS in Economics',
    'LLB (Hons.)',
    'B.Pharm',
    'B.Sc. in Textile Engineering',
    'Other',
  ],

  /* ---- Interests (for membership form) -------------------------------- */
  interests: [
    'Programming',
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Graphic Design',
    'AI & Machine Learning',
    'Robotics',
    'Business & Entrepreneurship',
    'Marketing',
    'Content Writing',
    'Film Making',
    'Photography',
    'Public Speaking',
    'Event Management',
    'Data Science',
    'Cybersecurity',
  ],

  /* ---- Payment Instructions ------------------------------------------ */
  paymentInstructions: {
    bkash: {
      title: 'How to Pay via bKash',
      steps: [
        'Open the bKash app on your phone.',
        'Tap "Send Money" and enter the number: <strong>01766-662992</strong>',
        'Enter the amount: <strong>৳300</strong>',
        'In the reference field, type: <strong>SUBIC-[Your Student ID]</strong>',
        'Confirm the payment and note the <strong>Transaction ID</strong>.',
        'Enter the Transaction ID below and upload a screenshot of the confirmation.',
      ],
    },
    nagad: {
      title: 'How to Pay via Nagad',
      steps: [
        'Open the Nagad app on your phone.',
        'Tap "Send Money" and enter the number: <strong>01766-662992</strong>',
        'Enter the amount: <strong>৳300</strong>',
        'In the reference field, type: <strong>SUBIC-[Your Student ID]</strong>',
        'Confirm the payment and note the <strong>Transaction ID</strong>.',
        'Enter the Transaction ID below and upload a screenshot of the confirmation.',
      ],
    },
    rocket: {
      title: 'How to Pay via Rocket',
      steps: [
        'Open the Rocket app or dial *167# from your Robi/Airtel number.',
        'Select "Send Money" and enter: <strong>01766-662992</strong>',
        'Enter the amount: <strong>৳300</strong>',
        'In the reference, type: <strong>SUBIC-[Your Student ID]</strong>',
        'Confirm and note the <strong>Transaction ID</strong>.',
        'Enter the Transaction ID below and upload a screenshot.',
      ],
    },
    bank: {
      title: 'How to Pay via Bank Transfer',
      steps: [
        'Transfer <strong>৳300</strong> to the following bank account.',
        'Account Name: <strong>SUB Innovation Club</strong>',
        'Account Number: <strong>[Contact us for details]</strong>',
        'Bank: <strong>[Contact us for details]</strong>',
        'In the reference/narration, write: <strong>SUBIC-[Your Student ID]</strong>',
        'Take a screenshot of the transfer confirmation and upload it below.',
      ],
    },
  },

  /* ---- Contact & social ----------------------------------------------- */
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
