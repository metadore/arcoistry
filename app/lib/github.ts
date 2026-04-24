import { Project } from '@/data/projects';

const DORAEMON_GADGETS = [
  "Anywhere Door", "Take-copter", "Time Machine", "4D Pocket", "Translation Konjac",
  "Memory Bread", "Small Light", "Big Light", "Bamboo Copter", "Pass-Through Hoop",
  "Computer Goggles", "Super Gloves", "Air Pistol", "Invisible Cape", "What-If Phone Booth",
  "Gulliver Tunnel", "Copying Toast", "Time Kerchief", "Homing Dart", "Mood Orchestra"
];

const DORAEMON_QUOTES = [
  "Everything is possible if you believe!",
  "I'll help you Nobita, but you have to try your best too!",
  "Technology is magic, but it takes heart to make it work.",
  "Look at this gadget! It's from the 22nd century!",
  "Don't worry about the past, let's build the future!",
  "A true inventor never gives up!",
  "My pocket has everything you need, but you must use it wisely.",
  "Even if you fail, the experience remains in your 4D pocket!",
  "A gadget is only as good as the one who uses it.",
  "With the right tool, any problem becomes a door to a new world!"
];

export async function fetchGithubRepos(username: string): Promise<Project[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

    if (!response.ok) {
      throw new Error('Failed to fetch repos');
    }

    const repos = await response.json();

    return repos.map((repo: any) => {
      // Use repo ID as the project ID
      const id = repo.id.toString();
      
      // Determine category based on language or topics
      let category: Project['category'] = 'Coding';
      const topics = repo.topics || [];
      const language = repo.language || '';

      if (topics.includes('research') || topics.includes('science')) category = 'Research';
      else if (topics.includes('art') || topics.includes('design') || topics.includes('ui')) category = 'Art / Design';
      else if (topics.includes('chemistry')) category = 'Chemistry';
      else if (topics.includes('biology')) category = 'Biology';
      else if (topics.includes('nuclear')) category = 'Nuclear Science';

      // Pick a semi-stable gadget name and quote based on the repo ID
      const gadgetIndex = parseInt(id.slice(-2)) % DORAEMON_GADGETS.length;
      const quoteIndex = parseInt(id.slice(-3)) % DORAEMON_QUOTES.length;

      return {
        id,
        title: repo.name.split(/[-_]/).map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: repo.description || 'A mysterious relic from the Metadore archives.',
        category,
        timeline: 'PAST',
        tags: [language, ...topics.slice(0, 2)].filter(Boolean),
        githubUrl: repo.html_url,
        demoUrl: repo.homepage || '',
        gadgetName: `${DORAEMON_GADGETS[gadgetIndex]} v${(parseInt(id.slice(-1)) % 5) + 1}.0`,
        doraemonQuote: DORAEMON_QUOTES[quoteIndex]
      };
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}
