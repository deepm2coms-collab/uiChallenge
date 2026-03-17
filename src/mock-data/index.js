// Companies
export const companies = [
  { id: '2coms', name: '2COMS Consulting', color: '#2563EB', dot: 'bg-blue-500' },
  { id: 'jobs-academy', name: 'Jobs Academy', color: '#059669', dot: 'bg-green-500' },
  { id: 'tempus', name: 'Tempus IT', color: '#7C3AED', dot: 'bg-purple-500' },
];

// Users (one per team across companies for demo)
export const users = [
  { id: 'u1', name: 'Priya Sharma', role: 'HR Manager', team: 'HR', company: '2coms', avatar: 'https://i.pravatar.cc/150?u=priya' },
  { id: 'u2', name: 'Rahul Verma', role: 'Tech Lead', team: 'Tech', company: '2coms', avatar: 'https://i.pravatar.cc/150?u=rahul' },
  { id: 'u3', name: 'Anita Desai', role: 'Delivery Head', team: 'Delivery', company: '2coms', avatar: 'https://i.pravatar.cc/150?u=anita' },
  { id: 'u4', name: 'Vikram Singh', role: 'Finance Manager', team: 'Finance', company: '2coms', avatar: 'https://i.pravatar.cc/150?u=vikram' },
  { id: 'u5', name: 'Meera Krishnan', role: 'Marketing Lead', team: 'Marketing', company: '2coms', avatar: 'https://i.pravatar.cc/150?u=meera' },
  { id: 'u6', name: 'Arjun Nair', role: 'CEO', team: 'Leadership', company: '2coms', avatar: 'https://i.pravatar.cc/150?u=arjun' },
];

// Leadership messages
export const leadershipMessages = [
  {
    id: 'lm1',
    title: 'Q1 2026 Vision: Scaling with Purpose',
    content: 'As we step into 2026, our focus remains on sustainable growth while deepening our impact in talent solutions. We are investing heavily in upskilling our delivery teams and expanding our digital footprint across Kolkata, Mumbai, and Bangalore. The leadership team has committed to monthly townhalls so every voice is heard. Together we will hit our targets while maintaining the culture that makes 2COMS special.',
    author: { name: 'Arjun Nair', role: 'CEO', company: '2coms', avatar: 'https://i.pravatar.cc/150?u=arjun' },
    category: 'Vision',
    date: '2026-03-01',
    month: 'Mar',
    videoThumb: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800',
    videoId: 'dQw4w9WgXcQ',
    reactions: { applaud: 42, like: 38, insightful: 21 },
    userReaction: null,
    responsesCount: 12,
  },
  {
    id: 'lm2',
    title: 'HR Policy Updates: Leave and Benefits',
    content: 'We have updated our leave policy to include mental health days and extended parental leave. The new handbook will be available in Knowledge Hub by March 15. Please review and reach out to HR with any questions. We are also rolling out a new wellness program in partnership with our insurance provider.',
    author: { name: 'Priya Sharma', role: 'HR Manager', company: '2coms', avatar: 'https://i.pravatar.cc/150?u=priya' },
    category: 'HR',
    date: '2026-02-28',
    month: 'Feb',
    videoThumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    videoId: 'dQw4w9WgXcQ',
    reactions: { applaud: 28, like: 45, insightful: 15 },
    userReaction: null,
    responsesCount: 8,
  },
  {
    id: 'lm3',
    title: 'Tech Roadmap: Cloud and Security',
    content: 'Our technology team is leading a phased migration to a unified cloud infrastructure. Phase 1 completes in Q2. We are also implementing SSO and MFA across all internal tools. Training sessions will be scheduled for all employees. Security is everyone\'s responsibility.',
    author: { name: 'Rahul Verma', role: 'Tech Lead', company: '2coms', avatar: 'https://i.pravatar.cc/150?u=rahul' },
    category: 'Tech',
    date: '2026-02-15',
    month: 'Feb',
    videoThumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    videoId: 'dQw4w9WgXcQ',
    reactions: { applaud: 35, like: 29, insightful: 41 },
    userReaction: null,
    responsesCount: 15,
  },
  {
    id: 'lm4',
    title: 'Strategy: Jobs Academy Expansion',
    content: 'Jobs Academy will open two new learning centers in Hyderabad and Pune this quarter. We are partnering with local colleges for placement drives. Tempus IT\'s automation projects have already reduced manual effort by 40% in our key accounts. Cross-company collaboration is our differentiator.',
    author: { name: 'Arjun Nair', role: 'CEO', company: '2coms', avatar: 'https://i.pravatar.cc/150?u=arjun' },
    category: 'Strategy',
    date: '2026-01-20',
    month: 'Jan',
    videoThumb: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
    videoId: 'dQw4w9WgXcQ',
    reactions: { applaud: 52, like: 48, insightful: 33 },
    userReaction: null,
    responsesCount: 22,
  },
];

// Announcements
export const announcements = [
  {
    id: 'a1',
    title: 'Annual Health Check-up Camp — March 20–22',
    excerpt: 'We have arranged a comprehensive health check-up camp at our Kolkata office. All employees and their dependents are welcome. Registration link will be shared by HR by March 15.',
    body: 'We have arranged a comprehensive health check-up camp at our Kolkata office from March 20 to 22. All employees and their dependents are welcome. The camp will include basic vitals, blood sugar, BP, and optional eye check-up. Registration link will be shared by HR by March 15. Please block your calendar.',
    department: 'HR',
    author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' },
    date: '2026-03-10',
    pinned: true,
    tags: ['Benefits', 'HR', 'Events'],
    likeCount: 24,
    commentCount: 5,
    liked: false,
    company: '2coms',
  },
  {
    id: 'a2',
    title: 'New Leave Policy Effective April 1',
    excerpt: 'The updated leave policy including mental health days and extended parental leave is now published in Knowledge Hub. All employees must acknowledge by March 25.',
    body: 'The updated leave policy including mental health days and extended parental leave is now published in Knowledge Hub. All employees must acknowledge the policy by March 25 through the link in your email. For questions, contact HR.',
    department: 'HR',
    author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' },
    date: '2026-03-09',
    pinned: false,
    tags: ['Policy', 'HR', 'Benefits'],
    likeCount: 18,
    commentCount: 3,
    liked: false,
    company: '2coms',
  },
  {
    id: 'a3',
    title: 'Python & React Training — Batch 14 Results',
    excerpt: 'Batch 14 placement rate: 94%. Congratulations to the training team and all participants. Next batch starts April 1.',
    body: 'We are thrilled to share that Batch 14 of our Python and React training program achieved a 94% placement rate within 60 days. Congratulations to the training team and all participants. Next batch starts April 1. Registrations open on the Learning Portal.',
    department: 'Tech',
    author: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul' },
    date: '2026-03-08',
    pinned: true,
    tags: ['Wins', 'Learning', 'Tech'],
    likeCount: 56,
    commentCount: 12,
    liked: false,
    company: '2coms',
  },
  {
    id: 'a4',
    title: 'Townhall — March 15, 4 PM',
    excerpt: 'Quarterly townhall with leadership. Agenda: Q1 results, Q2 goals, open Q&A. Join via Zoom link (calendar invite).',
    body: 'Quarterly townhall with leadership on March 15 at 4 PM. Agenda: Q1 results, Q2 goals, and open Q&A. Join via Zoom link in your calendar invite. Please submit questions in advance through the form in the announcement comment.',
    department: 'Leadership',
    author: { name: 'Arjun Nair', avatar: 'https://i.pravatar.cc/150?u=arjun' },
    date: '2026-03-07',
    pinned: false,
    tags: ['Events', 'Culture'],
    likeCount: 32,
    commentCount: 8,
    liked: false,
    company: '2coms',
  },
  {
    id: 'a5',
    title: 'CSR: Blood Donation Drive — March 18',
    excerpt: 'We are organizing a blood donation drive in partnership with local hospitals. Sign up at the link below. Refreshments will be provided.',
    body: 'We are organizing a blood donation drive on March 18 in partnership with local hospitals. Sign up at the link below. Refreshments will be provided. All donors will receive a certificate and a half-day leave.',
    department: 'HR',
    author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' },
    date: '2026-03-06',
    pinned: false,
    tags: ['CSR', 'Events', 'Culture'],
    likeCount: 41,
    commentCount: 6,
    liked: false,
    company: '2coms',
  },
  {
    id: 'a6',
    title: 'Jobs Academy: New Digital Marketing Course',
    excerpt: 'Jobs Academy is launching a Digital Marketing certification course from April. Early bird discount for 2COMS employees.',
    body: 'Jobs Academy is launching a Digital Marketing certification course from April. Early bird discount for 2COMS employees. Contact Learning team for enrollment.',
    department: 'Marketing',
    author: { name: 'Meera Krishnan', avatar: 'https://i.pravatar.cc/150?u=meera' },
    date: '2026-03-05',
    pinned: false,
    tags: ['Learning', 'Wins'],
    likeCount: 22,
    commentCount: 4,
    liked: false,
    company: 'jobs-academy',
  },
  {
    id: 'a7',
    title: 'Tempus IT: Client Win — Automation Project',
    excerpt: 'We have signed a new automation project with a leading FMCG client. Delivery kicks off in April.',
    body: 'We have signed a new automation project with a leading FMCG client. Delivery kicks off in April. Tempus IT team will lead with support from 2COMS Consulting delivery.',
    department: 'Delivery',
    author: { name: 'Anita Desai', avatar: 'https://i.pravatar.cc/150?u=anita' },
    date: '2026-03-04',
    pinned: false,
    tags: ['Wins', 'Compliance'],
    likeCount: 38,
    commentCount: 7,
    liked: false,
    company: 'tempus',
  },
  {
    id: 'a8',
    title: 'IT Security: Phishing Awareness',
    excerpt: 'Please complete the mandatory phishing awareness module in the Learning Portal by March 20. Takes 15 minutes.',
    body: 'Please complete the mandatory phishing awareness module in the Learning Portal by March 20. It takes 15 minutes. This is required for compliance.',
    department: 'Tech',
    author: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul' },
    date: '2026-03-03',
    pinned: false,
    tags: ['Compliance', 'Policy', 'Learning'],
    likeCount: 15,
    commentCount: 2,
    liked: false,
    company: '2coms',
  },
];

// Events
export const events = [
  { id: 'e1', title: 'Townhall Q1', date: '2026-03-15', time: '4:00 PM', category: 'Townhall', location: 'Zoom', online: true, link: '#', company: '2coms', duration: 60 },
  { id: 'e2', title: 'Python Training Batch 15', date: '2026-03-18', time: '10:00 AM', category: 'Training', location: 'Kolkata Office', online: false, company: '2coms', duration: 120 },
  { id: 'e3', title: 'Blood Donation Drive', date: '2026-03-18', time: '9:00 AM', category: 'CSR', location: 'Kolkata Office', online: false, company: '2coms', duration: 240 },
  { id: 'e4', title: 'Health Check-up Camp', date: '2026-03-20', time: '8:00 AM', category: 'Celebration', location: 'Kolkata Office', online: false, company: '2coms', duration: 480 },
  { id: 'e5', title: 'Monthly Review — Delivery', date: '2026-03-22', time: '2:00 PM', category: 'Review', location: 'Zoom', online: true, link: '#', company: '2coms', duration: 90 },
  { id: 'e6', title: 'Jobs Academy Open House', date: '2026-03-25', time: '11:00 AM', category: 'Celebration', location: 'Hyderabad Center', online: false, company: 'jobs-academy', duration: 180 },
];

// Recognition feed
export const recognitionFeed = [
  { id: 'r1', from: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul' }, to: { name: 'Sneha Rao', avatar: 'https://i.pravatar.cc/150?u=sneha' }, badge: 'Innovator', badgeColor: 'blue', message: 'Sneha designed the new dashboard component that reduced load time by 40%. Outstanding ownership!', date: '2 hours ago', claps: 12, userClapped: false, team: 'Tech', replies: [] },
  { id: 'r2', from: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, to: { name: 'Amit Kumar', avatar: 'https://i.pravatar.cc/150?u=amit' }, badge: 'Reliable', badgeColor: 'green', message: 'Amit never misses a deadline and always supports the team during crunch. Thank you!', date: '5 hours ago', claps: 8, userClapped: false, team: 'Delivery', replies: [] },
  { id: 'r3', from: { name: 'Anita Desai', avatar: 'https://i.pravatar.cc/150?u=anita' }, to: { name: 'Kavita Nair', avatar: 'https://i.pravatar.cc/150?u=kavita' }, badge: 'Helpful', badgeColor: 'teal', message: 'Kavita onboarded three new joiners last week and made them feel at home. Grateful!', date: '1 day ago', claps: 15, userClapped: false, team: 'HR', replies: [] },
  { id: 'r4', from: { name: 'Arjun Nair', avatar: 'https://i.pravatar.cc/150?u=arjun' }, to: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul' }, badge: 'Leader', badgeColor: 'gold', message: 'Rahul led the cloud migration with zero downtime. Exemplary leadership.', date: '2 days ago', claps: 24, userClapped: false, team: 'Tech', replies: [] },
  { id: 'r5', from: { name: 'Meera Krishnan', avatar: 'https://i.pravatar.cc/150?u=meera' }, to: { name: 'Sneha Rao', avatar: 'https://i.pravatar.cc/150?u=sneha' }, badge: 'Team Player', badgeColor: 'purple', message: 'Sneha always steps in for cross-team campaigns. A true collaborator.', date: '3 days ago', claps: 6, userClapped: false, team: 'Marketing', replies: [] },
  { id: 'r6', from: { name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?u=vikram' }, to: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, badge: 'Mentor', badgeColor: 'rose', message: 'Priya mentored five new HR executives this quarter. The team is stronger because of her.', date: '4 days ago', claps: 11, userClapped: false, team: 'HR', replies: [] },
];

// Stats (role-aware: Admin = company-wide, Employee = team)
export const stats = {
  company: { activeProjects: 24, milestonesHit: 18, newJoineesMonth: 8, engagementPoints: 1250 },
  team: { activeProjects: 6, milestonesHit: 4, newJoineesMonth: 2, engagementPoints: 420 },
};

// Business updates (verticals)
export const businessUpdates = [
  { vertical: 'Consulting', value: 87, trend: 'up', company: '2coms', period: 'Q2' },
  { vertical: 'Placements', value: 92, trend: 'up', company: '2coms', period: 'Q2' },
  { vertical: 'Training', value: 78, trend: 'neutral', company: 'jobs-academy', period: 'Q2' },
  { vertical: 'Automation', value: 95, trend: 'up', company: 'tempus', period: 'Q2' },
  { vertical: 'Staffing', value: 81, trend: 'up', company: '2coms', period: 'Q2' },
  { vertical: 'Digital', value: 88, trend: 'up', company: 'tempus', period: 'Q2' },
  { vertical: 'HR Solutions', value: 76, trend: 'down', company: '2coms', period: 'Q2' },
  { vertical: 'IT Services', value: 90, trend: 'up', company: 'tempus', period: 'Q2' },
];

// Notifications
export const notificationsData = [
  { id: 'n1', type: 'new_joinee', targetTeam: 'HR', broadcastTeams: ['Tech', 'Delivery'], fullMessage: 'Swarup Banerjee has joined as HR Executive in the HR team.', summaryMessage: 'A new member has joined the HR team.', actor: { name: 'Swarup Banerjee', role: 'HR Executive', avatar: 'https://i.pravatar.cc/150?u=swarup' }, timestamp: '2 minutes ago', read: false, company: '2coms', linkedPage: 'directory' },
  { id: 'n2', type: 'leave_approved', targetTeam: 'Tech', broadcastTeams: null, fullMessage: 'Your leave request for March 20–22 has been approved by Rahul Verma.', summaryMessage: 'A leave request was approved in the Tech team.', actor: { name: 'Rahul Verma', role: 'Tech Lead', avatar: 'https://i.pravatar.cc/150?u=rahul' }, timestamp: '15 minutes ago', read: false, company: '2coms', linkedPage: 'dashboard' },
  { id: 'n3', type: 'team_transfer', targetTeam: 'Tech', broadcastTeams: ['HR'], fullMessage: 'You have been transferred to the Tech team. Welcome!', summaryMessage: 'A team transfer was completed.', actor: { name: 'Priya Sharma', role: 'HR Manager', avatar: 'https://i.pravatar.cc/150?u=priya' }, timestamp: '1 hour ago', read: false, company: '2coms', linkedPage: 'directory' },
  { id: 'n4', type: 'announcement', targetTeam: null, broadcastTeams: null, fullMessage: 'New announcement: Annual Health Check-up Camp — March 20–22. Read in Announcements.', actor: { name: 'Priya Sharma', role: 'HR Manager', avatar: 'https://i.pravatar.cc/150?u=priya' }, timestamp: '2 hours ago', read: true, company: '2coms', linkedPage: 'announcements' },
  { id: 'n5', type: 'recognition', targetTeam: null, broadcastTeams: null, fullMessage: 'Sneha Rao just received an Innovator badge 🏅', actor: { name: 'Rahul Verma', role: 'Tech Lead', avatar: 'https://i.pravatar.cc/150?u=rahul' }, timestamp: '3 hours ago', read: false, company: '2coms', linkedPage: 'recognition' },
  { id: 'n6', type: 'milestone', targetTeam: null, broadcastTeams: null, fullMessage: '2COMS Consulting hit 94% placement rate for Batch 14. Congratulations!', actor: { name: 'Arjun Nair', role: 'CEO', avatar: 'https://i.pravatar.cc/150?u=arjun' }, timestamp: '1 day ago', read: true, company: '2coms', linkedPage: 'announcements' },
  { id: 'n7', type: 'new_joinee', targetTeam: 'Delivery', broadcastTeams: ['Tech'], fullMessage: 'Rohit Mehta has joined as Delivery Consultant in the Delivery team.', summaryMessage: 'A new member has joined the Delivery team.', actor: { name: 'Rohit Mehta', role: 'Delivery Consultant', avatar: 'https://i.pravatar.cc/150?u=rohit' }, timestamp: '2 days ago', read: true, company: '2coms', linkedPage: 'directory' },
  { id: 'n8', type: 'leave_approved', targetTeam: 'HR', broadcastTeams: null, fullMessage: 'Your leave request for March 18 has been approved.', summaryMessage: 'A leave request was approved in the HR team.', actor: { name: 'Priya Sharma', role: 'HR Manager', avatar: 'https://i.pravatar.cc/150?u=priya' }, timestamp: '3 days ago', read: true, company: '2coms', linkedPage: 'dashboard' },
];

// New joinees (for carousel)
export const newJoinees = [
  { id: 'nj1', name: 'Swarup Banerjee', role: 'HR Executive', team: 'HR', joinDate: 'March 12, 2026', avatar: 'https://i.pravatar.cc/150?u=swarup', company: '2coms' },
  { id: 'nj2', name: 'Rohit Mehta', role: 'Delivery Consultant', team: 'Delivery', joinDate: 'March 10, 2026', avatar: 'https://i.pravatar.cc/150?u=rohit', company: '2coms' },
  { id: 'nj3', name: 'Divya Iyer', role: 'Junior Developer', team: 'Tech', joinDate: 'March 8, 2026', avatar: 'https://i.pravatar.cc/150?u=divya', company: '2coms' },
  { id: 'nj4', name: 'Karan Joshi', role: 'Marketing Associate', team: 'Marketing', joinDate: 'March 5, 2026', avatar: 'https://i.pravatar.cc/150?u=karan', company: 'jobs-academy' },
];

// Gallery
export const galleryItems = [
  { id: 'g1', title: 'Townhall Q4 2025', category: 'Events', type: 'image', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', likes: 45, company: '2coms' },
  { id: 'g2', title: 'Team Offsite — Darjeeling', category: 'Culture', type: 'image', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600', likes: 78, company: '2coms' },
  { id: 'g3', title: 'Tech Summit Highlights', category: 'Events', type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600', likes: 92, company: '2coms' },
  { id: 'g4', title: 'CSR — School Kit Drive', category: 'CSR', type: 'image', url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600', likes: 56, company: '2coms' },
  { id: 'g5', title: 'Batch 14 Graduation', category: 'Milestones', type: 'image', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600', likes: 112, company: 'jobs-academy' },
  { id: 'g6', title: 'Leadership Retreat', category: 'Leadership', type: 'image', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600', likes: 34, company: '2coms' },
  { id: 'g7', title: 'Diwali Celebration', category: 'Culture', type: 'image', url: 'https://images.unsplash.com/photo-1606964212864-eb045753ee3e?w=600', likes: 89, company: '2coms' },
  { id: 'g8', title: 'Hackathon Winners', category: 'Milestones', type: 'image', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600', likes: 67, company: 'tempus' },
];

// Forum topics
export const forumTopics = [
  { id: 'f1', title: 'Best practices for remote standups?', channel: 'tech-talk', tags: ['Management', 'Remote'], author: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul' }, time: '1 hour ago', upvotes: 24, replies: 8, trending: false, flagged: false, sticky: false, body: 'What tools and formats are teams using for daily standups when half the team is WFH?', company: '2coms' },
  { id: 'f2', title: 'Leave policy clarification — mental health days', channel: 'hr-corner', tags: ['HR', 'Policy'], author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, time: '3 hours ago', upvotes: 42, replies: 12, trending: true, flagged: false, sticky: true, body: 'Official HR response: Mental health days are part of our updated policy. You can avail up to 2 per quarter. No medical certificate required.', company: '2coms' },
  { id: 'f3', title: 'Python vs Java for next batch?', channel: 'tech-talk', tags: ['Python', 'Java', 'Learning'], author: { name: 'Anita Desai', avatar: 'https://i.pravatar.cc/150?u=anita' }, time: '5 hours ago', upvotes: 18, replies: 15, trending: false, flagged: false, sticky: false, body: 'Considering market demand, should we prioritize Python or Java for the next training batch?', company: '2coms' },
  { id: 'f4', title: 'Birthday celebration ideas for the team', channel: 'celebrations', tags: ['Culture'], author: { name: 'Meera Krishnan', avatar: 'https://i.pravatar.cc/150?u=meera' }, time: '1 day ago', upvotes: 31, replies: 6, trending: false, flagged: false, sticky: false, body: 'Looking for simple but fun ideas to celebrate team birthdays in the office.', company: '2coms' },
  { id: 'f5', title: 'Cloud migration — lessons learned', channel: 'tech-talk', tags: ['Cloud', 'AI'], author: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul' }, time: '2 days ago', upvotes: 55, replies: 22, trending: true, flagged: false, sticky: false, body: 'Sharing our experience from the recent AWS migration. Zero downtime achieved in 6m 58s. Key takeaways inside.', company: '2coms' },
  { id: 'f6', title: 'Announcement: New cafeteria menu feedback', channel: 'announcements-feedback', tags: ['HR'], author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, time: '2 days ago', upvotes: 12, replies: 4, trending: false, flagged: false, sticky: false, body: 'We are revamping the cafeteria menu. Please share your preferences via the form in the link.', company: '2coms' },
  { id: 'f7', title: 'Off-topic: Weekend trek recommendations', channel: 'off-topic', tags: ['Culture'], author: { name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?u=vikram' }, time: '3 days ago', upvotes: 8, replies: 11, trending: false, flagged: true, sticky: false, body: 'Looking for good trekking spots near Kolkata for a weekend trip.', company: '2coms' },
  { id: 'f8', title: 'General: Welcome Swarup to HR!', channel: 'general', tags: ['HR'], author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, time: '3 days ago', upvotes: 36, replies: 9, trending: false, flagged: false, sticky: false, body: 'Please join me in welcoming Swarup Banerjee to the HR team. Say hello when you see him around!', company: '2coms' },
];

// Knowledge docs
export const knowledgeDocs = [
  { id: 'k1', title: 'Employee Handbook 2026', category: 'Company Handbooks', type: 'pdf', uploadedBy: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, updated: '2026-03-01', downloadCount: 156, company: '2coms' },
  { id: 'k2', title: 'Leave Policy', category: 'HR Policies', type: 'pdf', uploadedBy: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, updated: '2026-03-05', downloadCount: 89, company: '2coms' },
  { id: 'k3', title: 'IT Security Guide', category: 'IT & Security', type: 'pdf', uploadedBy: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul' }, updated: '2026-02-28', downloadCount: 134, company: '2coms' },
  { id: 'k4', title: 'Benefits Overview', category: 'HR Policies', type: 'pdf', uploadedBy: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, updated: '2026-02-15', downloadCount: 72, company: '2coms' },
  { id: 'k5', title: 'Code of Conduct', category: 'HR Policies', type: 'pdf', uploadedBy: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, updated: '2026-01-10', downloadCount: 198, company: '2coms' },
  { id: 'k6', title: 'Onboarding Checklist', category: 'Company Handbooks', type: 'pdf', uploadedBy: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, updated: '2026-02-20', downloadCount: 48, company: '2coms' },
  { id: 'k7', title: 'Phishing Awareness', category: 'IT & Security', type: 'pdf', uploadedBy: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul' }, updated: '2026-03-08', downloadCount: 95, company: '2coms' },
  { id: 'k8', title: 'Python Training Syllabus', category: 'Training Resources', type: 'pdf', uploadedBy: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul' }, updated: '2026-02-01', downloadCount: 67, company: 'jobs-academy' },
  { id: 'k9', title: 'Expense Reimbursement Form', category: 'Templates & Forms', type: 'pdf', uploadedBy: { name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?u=vikram' }, updated: '2026-01-15', downloadCount: 112, company: '2coms' },
  { id: 'k10', title: 'Project Template', category: 'Templates & Forms', type: 'doc', uploadedBy: { name: 'Anita Desai', avatar: 'https://i.pravatar.cc/150?u=anita' }, updated: '2026-02-10', downloadCount: 54, company: '2coms' },
];

// Project wins
export const projectWins = [
  { id: 'pw1', name: 'E-commerce Platform Optimization', company: '2coms', team: 'Tech', impact: '40% latency reduction', description: 'Full-stack optimization and CDN rollout.', date: '2026-03-01', major: true },
  { id: 'pw2', name: 'Batch 14 Placement Drive', company: 'jobs-academy', team: 'Delivery', impact: '94% placement rate', description: 'Placement support for Python & React batch.', date: '2026-02-28', major: true },
  { id: 'pw3', name: 'Client AWS Migration', company: 'tempus', team: 'Tech', impact: 'Zero-downtime in 6m 58s', description: 'Complete cloud migration for key client.', date: '2026-02-25', major: true },
  { id: 'pw4', name: 'HR Portal Revamp', company: '2coms', team: 'Tech', impact: '60% faster leave approval', description: 'New workflow automation for leave and attendance.', date: '2026-02-20', major: false },
  { id: 'pw5', name: 'Automation Pipeline', company: 'tempus', team: 'Delivery', impact: '35% effort reduction', description: 'RPA pipeline for invoice processing.', date: '2026-02-15', major: false },
];

// Employees
export const employees = [
  { id: 'emp1', name: 'Priya Sharma', role: 'HR Manager', team: 'HR', email: 'priya.sharma@2coms.com', phone: '+91 98765 43210', avatar: 'https://i.pravatar.cc/150?u=priya', skills: ['HR', 'Recruitment', 'Policy', 'Management'], bio: 'Leading HR operations and culture initiatives at 2COMS.', joinDate: '2020-01-15', manager: 'Arjun Nair', company: '2coms', online: true, previousTeam: null, projects: ['HR Portal', 'Onboarding'] },
  { id: 'emp2', name: 'Rahul Verma', role: 'Tech Lead', team: 'Tech', email: 'rahul.verma@2coms.com', phone: '+91 98765 43211', avatar: 'https://i.pravatar.cc/150?u=rahul', skills: ['React', 'Java', 'Cloud', 'Management'], bio: 'Driving technology strategy and engineering excellence.', joinDate: '2019-06-01', manager: 'Arjun Nair', company: '2coms', online: true, previousTeam: null, projects: ['Cloud Migration', 'HR Portal'] },
  { id: 'emp3', name: 'Sneha Rao', role: 'Senior Developer', team: 'Tech', email: 'sneha.rao@2coms.com', phone: '+91 98765 43212', avatar: 'https://i.pravatar.cc/150?u=sneha', skills: ['React', 'JavaScript', 'Python'], bio: 'Full-stack developer with focus on performance.', joinDate: '2021-03-10', manager: 'Rahul Verma', company: '2coms', online: true, previousTeam: null, projects: ['Dashboard', 'E-commerce Optimization'] },
  { id: 'emp4', name: 'Anita Desai', role: 'Delivery Head', team: 'Delivery', email: 'anita.desai@2coms.com', phone: '+91 98765 43213', avatar: 'https://i.pravatar.cc/150?u=anita', skills: ['Delivery', 'Client Management', 'Project Management'], bio: 'Leading delivery across consulting and staffing.', joinDate: '2018-09-01', manager: 'Arjun Nair', company: '2coms', online: false, previousTeam: null, projects: ['Batch 14', 'Client AWS'] },
  { id: 'emp5', name: 'Amit Kumar', role: 'Delivery Consultant', team: 'Delivery', email: 'amit.kumar@2coms.com', phone: '+91 98765 43214', avatar: 'https://i.pravatar.cc/150?u=amit', skills: ['Placements', 'Client Relations', 'Management'], bio: 'Consulting and placement delivery.', joinDate: '2020-11-01', manager: 'Anita Desai', company: '2coms', online: true, previousTeam: null, projects: ['Batch 14'] },
  { id: 'emp6', name: 'Kavita Nair', role: 'HR Executive', team: 'HR', email: 'kavita.nair@2coms.com', phone: '+91 98765 43215', avatar: 'https://i.pravatar.cc/150?u=kavita', skills: ['HR', 'Onboarding', 'Recruitment'], bio: 'HR operations and new joinee onboarding.', joinDate: '2022-02-01', manager: 'Priya Sharma', company: '2coms', online: true, previousTeam: null, projects: ['Onboarding'] },
  { id: 'emp7', name: 'Vikram Singh', role: 'Finance Manager', team: 'Finance', email: 'vikram.singh@2coms.com', phone: '+91 98765 43216', avatar: 'https://i.pravatar.cc/150?u=vikram', skills: ['Finance', 'Excel', 'Management'], bio: 'Finance and compliance.', joinDate: '2019-04-01', manager: 'Arjun Nair', company: '2coms', online: false, previousTeam: null, projects: ['Expense System'] },
  { id: 'emp8', name: 'Meera Krishnan', role: 'Marketing Lead', team: 'Marketing', email: 'meera.k@2coms.com', phone: '+91 98765 43217', avatar: 'https://i.pravatar.cc/150?u=meera', skills: ['Marketing', 'Digital', 'Branding'], bio: 'Brand and marketing for 2COMS ecosystem.', joinDate: '2020-07-01', manager: 'Arjun Nair', company: '2coms', online: true, previousTeam: null, projects: ['Jobs Academy Campaign'] },
  { id: 'emp9', name: 'Arjun Nair', role: 'CEO', team: 'Leadership', email: 'arjun.nair@2coms.com', phone: '+91 98765 43218', avatar: 'https://i.pravatar.cc/150?u=arjun', skills: ['Leadership', 'Strategy', 'Management'], bio: 'Leading the 2COMS Group of companies.', joinDate: '2015-01-01', manager: null, company: '2coms', online: true, previousTeam: null, projects: [] },
  { id: 'emp10', name: 'Swarup Banerjee', role: 'HR Executive', team: 'HR', email: 'swarup.b@2coms.com', phone: '+91 98765 43219', avatar: 'https://i.pravatar.cc/150?u=swarup', skills: ['HR', 'Recruitment'], bio: 'New to the HR team. Excited to contribute!', joinDate: '2026-03-12', manager: 'Priya Sharma', company: '2coms', online: true, previousTeam: null, projects: [] },
  { id: 'emp11', name: 'Divya Iyer', role: 'Junior Developer', team: 'Tech', email: 'divya.iyer@2coms.com', phone: '+91 98765 43220', avatar: 'https://i.pravatar.cc/150?u=divya', skills: ['React', 'JavaScript'], bio: 'Recently joined Tech. Learning the ropes.', joinDate: '2026-03-08', manager: 'Rahul Verma', company: '2coms', online: true, previousTeam: 'HR', projects: [] },
];

// Team members (team name -> member names for sidebar)
export const teamMembers = {
  HR: ['Priya Sharma', 'Kavita Nair', 'Swarup Banerjee'],
  Tech: ['Rahul Verma', 'Sneha Rao', 'Divya Iyer'],
  Delivery: ['Anita Desai', 'Amit Kumar'],
  Finance: ['Vikram Singh'],
  Marketing: ['Meera Krishnan'],
  Leadership: ['Arjun Nair'],
};

// Leaderboard data
export const leaderboardThisMonth = [
  { name: 'Sneha Rao', avatar: 'https://i.pravatar.cc/150?u=sneha', points: 1240, badge: 'Innovator' },
  { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul', points: 1180, badge: 'Leader' },
  { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya', points: 1120, badge: 'Mentor' },
  { name: 'Amit Kumar', avatar: 'https://i.pravatar.cc/150?u=amit', points: 980, badge: 'Reliable' },
  { name: 'Kavita Nair', avatar: 'https://i.pravatar.cc/150?u=kavita', points: 920, badge: 'Helpful' },
];

export const leaderboardAllTime = [
  { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul', points: 3450, badge: 'Leader' },
  { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya', points: 3280, badge: 'Mentor' },
  { name: 'Sneha Rao', avatar: 'https://i.pravatar.cc/150?u=sneha', points: 2890, badge: 'Innovator' },
  { name: 'Anita Desai', avatar: 'https://i.pravatar.cc/150?u=anita', points: 2650, badge: 'Leader' },
  { name: 'Amit Kumar', avatar: 'https://i.pravatar.cc/150?u=amit', points: 2420, badge: 'Reliable' },
];

// Badges for recognition
export const badges = [
  { id: 'b1', name: 'Innovator', color: 'blue', icon: '💡', description: 'For creative solutions and new ideas.', howToEarn: 'Suggest or implement an improvement that gets adopted.', earnedBy: ['Sneha Rao', 'Rahul Verma'], count: 12 },
  { id: 'b2', name: 'Reliable', color: 'green', icon: '🛡️', description: 'Consistent delivery and dependability.', howToEarn: 'Deliver on commitments consistently over a quarter.', earnedBy: ['Amit Kumar', 'Kavita Nair'], count: 18 },
  { id: 'b3', name: 'Helpful', color: 'teal', icon: '🤝', description: 'Going out of the way to support others.', howToEarn: 'Receive appreciation for helping colleagues or new joiners.', earnedBy: ['Kavita Nair', 'Priya Sharma'], count: 22 },
  { id: 'b4', name: 'Leader', color: 'gold', icon: '👑', description: 'Leading initiatives and inspiring teams.', howToEarn: 'Lead a project or initiative to success.', earnedBy: ['Rahul Verma', 'Arjun Nair'], count: 8 },
  { id: 'b5', name: 'Team Player', color: 'purple', icon: '🎯', description: 'Collaboration and cross-team support.', howToEarn: 'Be recognized for teamwork in cross-functional projects.', earnedBy: ['Sneha Rao', 'Meera Krishnan'], count: 15 },
  { id: 'b6', name: 'Mentor', color: 'rose', icon: '📚', description: 'Guiding and developing others.', howToEarn: 'Mentor at least one colleague formally or informally.', earnedBy: ['Priya Sharma', 'Rahul Verma'], count: 10 },
];

// Monthly meet outcomes (for Leadership page)
export const monthlyMeetOutcomes = [
  { month: 'Mar', year: '2026', outcomes: ['Q1 targets reviewed; Q2 goals set.', 'New wellness program approved.', 'Hyderabad and Pune centers confirmed for Jobs Academy.', 'Cloud Phase 1 completion date: April 30.'] },
  { month: 'Feb', year: '2026', outcomes: ['Leave policy refresh approved.', 'Tech roadmap for SSO/MFA finalized.', 'Tempus automation project signed.'] },
  { month: 'Jan', year: '2026', outcomes: ['Annual strategy alignment completed.', 'Batch 14 placement target: 90%+.', 'Leadership townhall frequency: monthly.'] },
];

// Activity ticker items
export const activityTickerItems = [
  { id: 'at1', text: 'Priya Sharma posted a new announcement', time: '5m ago', actor: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, company: '2coms' },
  { id: 'at2', text: 'Sneha Rao received an Innovator badge', time: '1h ago', actor: { name: 'Sneha Rao', avatar: 'https://i.pravatar.cc/150?u=sneha' }, company: '2coms' },
  { id: 'at3', text: 'Townhall added to Calendar', time: '2h ago', actor: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, company: '2coms' },
  { id: 'at4', text: 'Rahul Verma posted in #tech-talk', time: '3h ago', actor: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul' }, company: '2coms' },
  { id: 'at5', text: 'New document: Leave Policy in Knowledge Hub', time: '4h ago', actor: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, company: '2coms' },
  { id: 'at6', text: 'Swarup Banerjee joined the HR team', time: '5h ago', actor: { name: 'Swarup Banerjee', avatar: 'https://i.pravatar.cc/150?u=swarup' }, company: '2coms' },
  { id: 'at7', text: 'Blood Donation Drive event created', time: '1d ago', actor: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' }, company: '2coms' },
  { id: 'at8', text: 'Batch 14 placement results published', time: '1d ago', actor: { name: 'Anita Desai', avatar: 'https://i.pravatar.cc/150?u=anita' }, company: 'jobs-academy' },
];

// Forum channels
export const forumChannels = [
  { id: 'general', name: 'general', unread: false },
  { id: 'announcements-feedback', name: 'announcements-feedback', unread: true },
  { id: 'tech-talk', name: 'tech-talk', unread: true },
  { id: 'hr-corner', name: 'hr-corner', unread: false },
  { id: 'off-topic', name: 'off-topic', unread: true },
  { id: 'celebrations', name: 'celebrations', unread: false },
];

// Knowledge categories with counts
export const knowledgeCategories = [
  { id: 'hr-policies', name: 'HR Policies', count: 3, icon: '📋' },
  { id: 'handbooks', name: 'Company Handbooks', count: 2, icon: '📘' },
  { id: 'it-security', name: 'IT & Security', count: 2, icon: '🔒' },
  { id: 'training', name: 'Training Resources', count: 3, icon: '🎓' },
  { id: 'templates', name: 'Templates & Forms', count: 2, icon: '📝' },
];

// All tags for forum
export const forumAllTags = ['Cloud', 'AI', 'Python', 'Java', 'HR', 'Policy', 'Management', 'Remote', 'Learning', 'Culture', 'Tech', 'Marketing'];

// Surveys & Polls (Feature 1)
export const surveys = [
  {
    id: 'sv1', type: 'poll', title: 'What should our next team outing be?',
    author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' },
    company: '2coms', status: 'active', anonymous: false,
    createdAt: '2026-03-12', expiresAt: '2026-03-19',
    targetTeam: null,
    options: [
      { id: 'o1', text: 'Adventure Park', votes: 18 },
      { id: 'o2', text: 'Beach Getaway', votes: 24 },
      { id: 'o3', text: 'Mountain Trek', votes: 12 },
      { id: 'o4', text: 'Heritage Walk', votes: 9 },
    ],
    totalResponses: 63, totalEligible: 85,
  },
  {
    id: 'sv2', type: 'survey', title: 'Q1 Employee Pulse Survey',
    author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' },
    company: '2coms', status: 'active', anonymous: true,
    createdAt: '2026-03-01', expiresAt: '2026-03-31',
    targetTeam: null,
    questions: [
      { id: 'q1', text: 'How would you rate your overall job satisfaction?', type: 'rating', scale: 5 },
      { id: 'q2', text: 'Do you feel recognized for your contributions?', type: 'rating', scale: 5 },
      { id: 'q3', text: 'How effective is internal communication?', type: 'rating', scale: 5 },
      { id: 'q4', text: 'What one thing would you improve?', type: 'text' },
    ],
    totalResponses: 42, totalEligible: 85,
    aggregatedResults: { q1: 4.2, q2: 3.8, q3: 3.5 },
  },
  {
    id: 'sv3', type: 'poll', title: 'Preferred Friday Fun Activity',
    author: { name: 'Meera Krishnan', avatar: 'https://i.pravatar.cc/150?u=meera' },
    company: '2coms', status: 'closed', anonymous: false,
    createdAt: '2026-02-20', expiresAt: '2026-02-27',
    targetTeam: 'Marketing',
    options: [
      { id: 'o1', text: 'Quiz', votes: 8 },
      { id: 'o2', text: 'Movie Screening', votes: 14 },
      { id: 'o3', text: 'Board Games', votes: 6 },
    ],
    totalResponses: 28, totalEligible: 30,
  },
  {
    id: 'sv4', type: 'survey', title: 'Onboarding Experience Feedback',
    author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' },
    company: '2coms', status: 'closed', anonymous: true,
    createdAt: '2026-01-15', expiresAt: '2026-02-15',
    targetTeam: null,
    questions: [
      { id: 'q1', text: 'How smooth was your onboarding process?', type: 'rating', scale: 5 },
      { id: 'q2', text: 'Did you receive adequate training?', type: 'rating', scale: 5 },
      { id: 'q3', text: 'Suggestions for improvement?', type: 'text' },
    ],
    totalResponses: 15, totalEligible: 20,
    aggregatedResults: { q1: 4.0, q2: 3.6 },
  },
];

// Analytics (Feature 2)
export const analyticsData = {
  overview: { totalEmployees: 85, activeThisWeek: 72, postsThisMonth: 34, reactionsThisMonth: 287, commentsThisMonth: 89, eventsThisMonth: 6 },
  contentReach: [
    { label: 'Announcements', reach: 78, views: 245, likes: 67, comments: 23 },
    { label: 'Leadership', reach: 65, views: 180, likes: 89, comments: 34 },
    { label: 'Recognition', reach: 88, views: 310, likes: 156, comments: 45 },
    { label: 'Forum', reach: 45, views: 120, likes: 34, comments: 67 },
    { label: 'Knowledge Hub', reach: 52, views: 150, likes: 12, comments: 5 },
  ],
  teamEngagement: [
    { team: 'HR', score: 92, members: 15 },
    { team: 'Tech', score: 87, members: 22 },
    { team: 'Delivery', score: 78, members: 28 },
    { team: 'Finance', score: 71, members: 10 },
    { team: 'Marketing', score: 85, members: 8 },
    { team: 'Leadership', score: 95, members: 2 },
  ],
  weeklyTrend: [
    { week: 'W1 Feb', posts: 8, reactions: 56, comments: 18 },
    { week: 'W2 Feb', posts: 12, reactions: 78, comments: 24 },
    { week: 'W3 Feb', posts: 6, reactions: 42, comments: 15 },
    { week: 'W4 Feb', posts: 15, reactions: 98, comments: 32 },
    { week: 'W1 Mar', posts: 10, reactions: 72, comments: 28 },
    { week: 'W2 Mar', posts: 14, reactions: 95, comments: 35 },
  ],
  topContent: [
    { title: 'Q1 2026 Vision: Scaling with Purpose', type: 'Leadership', views: 78, reactions: 101, readRate: 92 },
    { title: 'Annual Health Check-up Camp', type: 'Announcement', views: 65, reactions: 24, readRate: 76 },
    { title: 'Sneha Rao received Innovator badge', type: 'Recognition', views: 82, reactions: 56, readRate: 96 },
    { title: 'Cloud Migration Phase 1 update', type: 'Forum', views: 45, reactions: 34, readRate: 53 },
    { title: 'New Leave Policy', type: 'Announcement', views: 71, reactions: 45, readRate: 84 },
  ],
  readReceipts: [
    { contentTitle: 'Annual Health Check-up Camp', totalSent: 85, opened: 65, readFully: 48, acknowledged: 32 },
    { contentTitle: 'New Leave Policy Effective April 1', totalSent: 85, opened: 71, readFully: 58, acknowledged: 55 },
    { contentTitle: 'Tech Roadmap: Cloud and Security', totalSent: 22, opened: 20, readFully: 18, acknowledged: 15 },
  ],
};

// Campaigns (Feature 11)
export const campaigns = [
  {
    id: 'camp1', name: 'New Joinee Onboarding — March 2026', status: 'active',
    company: '2coms', createdBy: 'Priya Sharma',
    steps: [
      { id: 's1', day: 1, type: 'announcement', title: 'Welcome to 2COMS!', status: 'sent', sentTo: 3, opened: 3 },
      { id: 's2', day: 3, type: 'survey', title: 'Day 3 Check-in Survey', status: 'sent', sentTo: 3, opened: 2 },
      { id: 's3', day: 5, type: 'recognition', title: 'Prompt: Appreciate your buddy', status: 'pending', sentTo: 0, opened: 0 },
      { id: 's4', day: 7, type: 'survey', title: 'Week 1 Feedback', status: 'pending', sentTo: 0, opened: 0 },
    ],
    targetAudience: 'New joinees (March)', totalRecipients: 3,
  },
  {
    id: 'camp2', name: 'Q1 Engagement Push', status: 'draft',
    company: '2coms', createdBy: 'Meera Krishnan',
    steps: [
      { id: 's1', day: 1, type: 'announcement', title: 'Q1 Goals Overview', status: 'draft', sentTo: 0, opened: 0 },
      { id: 's2', day: 7, type: 'poll', title: 'Team Outing Vote', status: 'draft', sentTo: 0, opened: 0 },
      { id: 's3', day: 14, type: 'recognition', title: 'Mid-quarter shout-outs', status: 'draft', sentTo: 0, opened: 0 },
    ],
    targetAudience: 'All Employees', totalRecipients: 85,
  },
];

// Live events (Feature 3)
export const liveEvents = [
  {
    id: 'le1', title: 'CEO Townhall — Q1 Review', status: 'live',
    host: { name: 'Arjun Nair', avatar: 'https://i.pravatar.cc/150?u=arjun', role: 'CEO' },
    viewers: 47, startedAt: '2026-03-16T10:00:00', thumbnailUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800',
    company: '2coms', category: 'Townhall',
  },
  {
    id: 'le2', title: 'Tech Talk: Introduction to Kubernetes', status: 'upcoming',
    host: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul', role: 'Tech Lead' },
    viewers: 0, scheduledAt: '2026-03-18T14:00:00', thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    company: '2coms', category: 'Training',
  },
  {
    id: 'le3', title: 'HR Policy Walkthrough', status: 'ended',
    host: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya', role: 'HR Manager' },
    viewers: 38, recordingAvailable: true, thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    company: '2coms', category: 'HR',
  },
];

// Podcasts (Feature 8)
export const podcasts = [
  { id: 'pod1', title: 'Monthly CEO Brief — March 2026', host: 'Arjun Nair', duration: '12:45', date: '2026-03-05', coverUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400', audioUrl: '#', plays: 34, company: '2coms' },
  { id: 'pod2', title: 'HR Insights: Building Culture Remotely', host: 'Priya Sharma', duration: '8:30', date: '2026-02-20', coverUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400', audioUrl: '#', plays: 22, company: '2coms' },
  { id: 'pod3', title: 'Tech Corner: Cloud Migration Lessons', host: 'Rahul Verma', duration: '15:20', date: '2026-02-10', coverUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', audioUrl: '#', plays: 18, company: '2coms' },
];

// Org chart (Feature 4)
export const orgChart = {
  id: 'u6', name: 'Arjun Nair', role: 'CEO', avatar: 'https://i.pravatar.cc/150?u=arjun', team: 'Leadership',
  reports: [
    {
      id: 'u1', name: 'Priya Sharma', role: 'HR Manager', avatar: 'https://i.pravatar.cc/150?u=priya', team: 'HR',
      reports: [
        { id: 'nj1', name: 'Swarup Banerjee', role: 'HR Executive', avatar: 'https://i.pravatar.cc/150?u=swarup', team: 'HR', reports: [] },
        { id: 'u10', name: 'Kavita Nair', role: 'HR Coordinator', avatar: 'https://i.pravatar.cc/150?u=kavita', team: 'HR', reports: [] },
      ],
    },
    {
      id: 'u2', name: 'Rahul Verma', role: 'Tech Lead', avatar: 'https://i.pravatar.cc/150?u=rahul', team: 'Tech',
      reports: [
        { id: 'u7', name: 'Sneha Rao', role: 'Senior Developer', avatar: 'https://i.pravatar.cc/150?u=sneha', team: 'Tech', reports: [
          { id: 'nj3', name: 'Divya Iyer', role: 'Junior Developer', avatar: 'https://i.pravatar.cc/150?u=divya', team: 'Tech', reports: [] },
        ]},
      ],
    },
    {
      id: 'u3', name: 'Anita Desai', role: 'Delivery Head', avatar: 'https://i.pravatar.cc/150?u=anita', team: 'Delivery',
      reports: [
        { id: 'u8', name: 'Amit Kumar', role: 'Delivery Consultant', avatar: 'https://i.pravatar.cc/150?u=amit', team: 'Delivery', reports: [] },
        { id: 'nj2', name: 'Rohit Mehta', role: 'Delivery Consultant', avatar: 'https://i.pravatar.cc/150?u=rohit', team: 'Delivery', reports: [] },
      ],
    },
    {
      id: 'u4', name: 'Vikram Singh', role: 'Finance Manager', avatar: 'https://i.pravatar.cc/150?u=vikram', team: 'Finance',
      reports: [],
    },
    {
      id: 'u5', name: 'Meera Krishnan', role: 'Marketing Lead', avatar: 'https://i.pravatar.cc/150?u=meera', team: 'Marketing',
      reports: [
        { id: 'nj4', name: 'Karan Joshi', role: 'Marketing Associate', avatar: 'https://i.pravatar.cc/150?u=karan', team: 'Marketing', reports: [] },
      ],
    },
  ],
};
