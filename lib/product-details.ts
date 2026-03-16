// Alle Produkte mit vollständigen Details für Produktseiten
// (所有产品的完整详情，用于产品页面)

export const productDetails = [
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud',
    type: 'account',
    category: 'design',
    price: 648.00,
    originalPrice: 780.00,
    discount: 17,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Complete Adobe Creative Suite with 20+ professional apps for design, video, web, and photography.',
    longDescription: `
      <h3>What's Included</h3>
      <p>Get access to the entire Adobe Creative Cloud suite with over 20 industry-leading apps:</p>
      <ul>
        <li><strong>Photoshop</strong> - Professional image editing and compositing</li>
        <li><strong>Illustrator</strong> - Vector graphics and illustration</li>
        <li><strong>Premiere Pro</strong> - Professional video editing</li>
        <li><strong>After Effects</strong> - Motion graphics and visual effects</li>
        <li><strong>InDesign</strong> - Page layout and publishing</li>
        <li><strong>Lightroom</strong> - Photo editing and organization</li>
        <li><strong>XD</strong> - UI/UX design and prototyping</li>
        <li>And 13+ more creative apps</li>
      </ul>
      <h3>Key Features</h3>
      <ul>
        <li>100GB cloud storage for your projects</li>
        <li>Adobe Fonts library with thousands of fonts</li>
        <li>Adobe Portfolio for showcasing your work</li>
        <li>Regular updates with new features</li>
      </ul>
    `,
    features: ['20+ Creative Apps', '100GB Cloud Storage', 'Adobe Fonts', 'Regular Updates'],
    image: '/logos/adobe.png',
    badge: 'POPULAR',
  },
  {
    id: 'jetbrains-all-products',
    name: 'JetBrains All Products',
    type: 'account',
    category: 'development',
    price: 99.90,
    originalPrice: 685.00,
    discount: 85,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Complete JetBrains toolbox with all IDEs for every programming language.',
    longDescription: `
      <h3>All JetBrains IDEs Included</h3>
      <ul>
        <li><strong>IntelliJ IDEA Ultimate</strong> - Java, Kotlin, Scala</li>
        <li><strong>PyCharm Professional</strong> - Python, Django, Flask</li>
        <li><strong>WebStorm</strong> - JavaScript, TypeScript, React, Vue</li>
        <li><strong>PhpStorm</strong> - PHP, Laravel, Symfony</li>
        <li><strong>Rider</strong> - .NET, C#, Unity</li>
        <li><strong>CLion</strong> - C, C++, Rust</li>
        <li><strong>GoLand</strong> - Go development</li>
        <li><strong>DataGrip</strong> - Database management</li>
      </ul>
      <h3>Key Features</h3>
      <ul>
        <li>Intelligent code completion and refactoring</li>
        <li>Built-in debugger and profiler</li>
        <li>Version control integration</li>
        <li>Database tools and SQL support</li>
      </ul>
    `,
    features: ['All IDEs', 'Code Analysis', 'Refactoring Tools', 'Database Tools'],
    image: '/logos/jetbrains.png',
    badge: 'SAVE 85%',
  },
  {
    id: 'axure-rp-10',
    name: 'Axure RP 10 Team',
    type: 'key',
    category: 'design',
    price: 99.90,
    originalPrice: 440.00,
    discount: 77,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Professional prototyping and wireframing tool for UX designers.',
    longDescription: `
      <h3>Professional Prototyping Made Easy</h3>
      <ul>
        <li><strong>Interactive Prototypes</strong> - Create fully functional prototypes</li>
        <li><strong>Wireframing</strong> - Rapid wireframe creation</li>
        <li><strong>Team Collaboration</strong> - Real-time collaboration</li>
        <li><strong>Design Systems</strong> - Reusable component libraries</li>
      </ul>
    `,
    features: ['Team Collaboration', 'Interactive Prototypes', 'Design Systems', 'Auto Documentation'],
    image: '/logos/axure.png',
    badge: 'BEST DEAL',
  },
  {
    id: 'navicat-premium',
    name: 'Navicat Premium',
    type: 'key',
    category: 'development',
    price: 99.90,
    originalPrice: 350.00,
    discount: 71,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Universal database management tool supporting MySQL, PostgreSQL, MongoDB, and more.',
    longDescription: `
      <h3>Supported Databases</h3>
      <ul>
        <li>MySQL / MariaDB</li>
        <li>PostgreSQL</li>
        <li>MongoDB</li>
        <li>SQL Server</li>
        <li>Oracle</li>
        <li>SQLite</li>
      </ul>
      <h3>Key Features</h3>
      <ul>
        <li>Visual Query Builder</li>
        <li>Data Modeling</li>
        <li>Data Transfer between databases</li>
        <li>SSH Tunnel support</li>
      </ul>
    `,
    features: ['Multi-Database Support', 'Data Modeling', 'Query Builder', 'SSH Tunnel'],
    image: '/logos/navicat.png',
    badge: 'LIMITED TIME',
  },
  {
    id: 'securecrt',
    name: 'SecureCRT',
    type: 'key',
    category: 'security',
    price: 72.00,
    originalPrice: 87.00,
    discount: 17,
    currency: 'CHF',
    billingCycle: 'one-time',
    description: 'Professional SSH client for secure remote access with advanced terminal emulation.',
    longDescription: `
      <h3>Key Features</h3>
      <ul>
        <li>SSH1 & SSH2 support</li>
        <li>Session Management</li>
        <li>Tabbed Interface</li>
        <li>Script Automation (Python, VBScript)</li>
        <li>Integrated SFTP file transfer</li>
        <li>Port Forwarding</li>
      </ul>
    `,
    features: ['SSH/Telnet Client', 'Session Management', 'Script Automation', 'Port Forwarding'],
    image: '/logos/securecrt.png',
  },
  {
    id: 'sketch',
    name: 'Sketch',
    type: 'key',
    category: 'design',
    price: 79.00,
    originalPrice: 120.00,
    discount: 34,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Digital design toolkit for Mac. Create, prototype, and collaborate.',
    longDescription: `
      <h3>Key Features</h3>
      <ul>
        <li>Vector editing tools</li>
        <li>Symbols and shared styles</li>
        <li>Prototyping and preview</li>
        <li>Real-time collaboration</li>
        <li>Developer handoff</li>
      </ul>
    `,
    features: ['Vector Editing', 'Symbols', 'Prototyping', 'Collaboration'],
    image: '/logos/sketch.png',
    badge: 'NEW',
  },
  {
    id: 'figma-professional',
    name: 'Figma Professional',
    type: 'account',
    category: 'design',
    price: 144.00,
    originalPrice: 180.00,
    discount: 20,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Collaborative interface design tool for teams.',
    longDescription: `
      <h3>Key Features</h3>
      <ul>
        <li>Real-time collaboration</li>
        <li>Auto Layout</li>
        <li>Components and variants</li>
        <li>Prototyping</li>
        <li>Design systems</li>
        <li>Developer handoff</li>
      </ul>
    `,
    features: ['Collaboration', 'Auto Layout', 'Components', 'Prototyping'],
    image: '/logos/figma.png',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    type: 'account',
    category: 'development',
    price: 99.00,
    originalPrice: 120.00,
    discount: 18,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'AI pair programmer that helps you write code faster.',
    longDescription: `
      <h3>Key Features</h3>
      <ul>
        <li>AI-powered code suggestions</li>
        <li>Multi-language support</li>
        <li>IDE integration (VS Code, JetBrains, Neovim)</li>
        <li>Context-aware completions</li>
        <li>Code explanation and documentation</li>
      </ul>
    `,
    features: ['AI Code Suggestions', 'Multi-Language', 'IDE Integration', 'Context-Aware'],
    image: '/logos/github.png',
    badge: 'AI POWERED',
  },
  {
    id: '1password-teams',
    name: '1Password Teams',
    type: 'account',
    category: 'security',
    price: 47.88,
    originalPrice: 60.00,
    discount: 20,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Secure password manager for teams.',
    longDescription: `
      <h3>Key Features</h3>
      <ul>
        <li>Secure password storage</li>
        <li>Team sharing</li>
        <li>Two-factor authentication</li>
        <li>Browser extensions</li>
        <li>Mobile apps</li>
      </ul>
    `,
    features: ['Password Storage', 'Team Sharing', '2FA', 'Cross-Platform'],
    image: '/logos/1password.png',
  },
  {
    id: 'notion-team',
    name: 'Notion Team',
    type: 'account',
    category: 'productivity',
    price: 96.00,
    originalPrice: 120.00,
    discount: 20,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'All-in-one workspace for notes, docs, wikis, and project management.',
    longDescription: `
      <h3>Key Features</h3>
      <ul>
        <li>Notes and documents</li>
        <li>Wikis and knowledge base</li>
        <li>Project management</li>
        <li>Databases</li>
        <li>Team collaboration</li>
        <li>Templates</li>
      </ul>
    `,
    features: ['Notes', 'Wikis', 'Projects', 'Databases'],
    image: '/logos/notion.png',
  },
];

export type ProductDetail = typeof productDetails[0];
