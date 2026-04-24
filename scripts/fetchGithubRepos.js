const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const GITHUB_USERNAME = 'metadore'; // Change this to your GitHub username
const OUTPUT_FILE = path.join(__dirname, '../app/data/projects.ts');

const options = {
  hostname: 'api.github.com',
  path: `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js',
    // 'Authorization': `token YOUR_GITHUB_TOKEN` // Uncomment and add your token if hitting rate limits
  }
};

https.get(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error('Error fetching repositories:', data);
      return;
    }

    try {
      const repos = JSON.parse(data);
      const generatedProjects = repos.map((repo, index) => {
        return `
  {
    id: '${repo.id}',
    title: '${repo.name.replace(/'/g, "\\'").replace(/-/g, ' ')}',
    description: '${(repo.description || 'A fascinating project from Arcoistry.').replace(/'/g, "\\'")}',
    category: 'Coding', // Auto-assigned, please adjust manually
    timeline: 'PAST',
    tags: ['${repo.language || 'Code'}'],
    githubUrl: '${repo.html_url}',
    demoUrl: '${repo.homepage || ''}',
    gadgetName: 'Gadget #${index + 1}',
    doraemonQuote: 'Another great invention for the pocket!',
  }`;
      });

      const fileContent = `export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Coding' | 'Research' | 'Chemistry' | 'Art / Design' | 'Biology' | 'Nuclear Science';
  timeline: 'PAST' | 'PRESENT' | 'FUTURE';
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  gadgetName: string;
  doraemonQuote: string;
}

export const projectsData: Project[] = [${generatedProjects.join(',')}
];
`;

      fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
      console.log(`Successfully fetched ${repos.length} repositories and updated projects.ts!`);
    } catch (e) {
      console.error('Error parsing response:', e);
    }
  });
}).on('error', (e) => {
  console.error('Network Error:', e);
});
