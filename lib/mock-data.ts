export const products = [
  {
    id: '1',
    name: 'Adobe Creative Cloud',
    type: 'account',
    category: 'design',
    price: 648.00,
    originalPrice: 780.00,
    discount: 17,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Complete Adobe Creative Suite with 20+ professional apps for design, video, web, and photography. Perfect for creative professionals and teams.',
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
        <li>Cross-device sync and collaboration tools</li>
      </ul>
      
      <h3>Perfect For</h3>
      <ul>
        <li>Graphic designers and illustrators</li>
        <li>Video editors and motion graphics artists</li>
        <li>Photographers and retouchers</li>
        <li>Web and UI/UX designers</li>
        <li>Marketing teams and agencies</li>
      </ul>
      
      <h3>System Requirements</h3>
      <p>Compatible with Windows 10/11 and macOS 10.15 or later. Internet connection required for activation and updates.</p>
    `,
    features: ['20+ Creative Apps', '100GB Cloud Storage', 'Adobe Fonts', 'Regular Updates'],
    image: '/logos/adobe.png',
    badge: 'POPULAR',
  },
  {
    id: '2',
    name: 'JetBrains All Products',
    type: 'account',
    category: 'program',
    price: 99.90,
    originalPrice: 685.00,
    discount: 85,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Complete JetBrains toolbox with all IDEs for every programming language. Boost your productivity with intelligent code assistance.',
    longDescription: `
      <h3>All JetBrains IDEs Included</h3>
      <p>Get unlimited access to all JetBrains professional development tools:</p>
      <ul>
        <li><strong>IntelliJ IDEA Ultimate</strong> - Java, Kotlin, Scala, Groovy</li>
        <li><strong>PyCharm Professional</strong> - Python, Django, Flask</li>
        <li><strong>WebStorm</strong> - JavaScript, TypeScript, React, Vue, Angular</li>
        <li><strong>PhpStorm</strong> - PHP, Laravel, Symfony</li>
        <li><strong>Rider</strong> - .NET, C#, Unity</li>
        <li><strong>CLion</strong> - C, C++, Rust</li>
        <li><strong>GoLand</strong> - Go development</li>
        <li><strong>RubyMine</strong> - Ruby, Rails</li>
        <li><strong>DataGrip</strong> - Database management</li>
        <li>And more specialized tools</li>
      </ul>
      
      <h3>Key Features</h3>
      <ul>
        <li>Intelligent code completion and refactoring</li>
        <li>Built-in debugger and profiler</li>
        <li>Version control integration (Git, SVN, Mercurial)</li>
        <li>Database tools and SQL support</li>
        <li>Framework-specific assistance</li>
        <li>Remote development capabilities</li>
      </ul>
      
      <h3>Perfect For</h3>
      <ul>
        <li>Full-stack developers</li>
        <li>Backend and frontend engineers</li>
        <li>Mobile app developers</li>
        <li>Data scientists and analysts</li>
        <li>DevOps engineers</li>
      </ul>
      
      <h3>System Requirements</h3>
      <p>Windows 10/11, macOS 10.14+, or Linux. 8GB RAM minimum (16GB recommended). SSD drive recommended for best performance.</p>
    `,
    features: ['All IDEs', 'Code Analysis', 'Refactoring Tools', 'Database Tools'],
    image: '/logos/jetbrains.png',
    badge: 'SAVE 85%',
  },
  {
    id: '3',
    name: 'Axure RP 10 Team',
    type: 'key',
    category: 'design',
    price: 99.90,
    originalPrice: 440.00,
    discount: 77,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Professional prototyping and wireframing tool for UX designers. Create interactive prototypes without coding.',
    longDescription: `
      <h3>Professional Prototyping Made Easy</h3>
      <p>Axure RP 10 is the industry-standard tool for creating interactive prototypes and specifications:</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Interactive Prototypes</strong> - Create fully functional prototypes with conditional logic</li>
        <li><strong>Wireframing</strong> - Rapid wireframe creation with built-in widgets</li>
        <li><strong>Team Collaboration</strong> - Real-time collaboration with team members</li>
        <li><strong>Design Systems</strong> - Create and maintain reusable component libraries</li>
        <li><strong>Documentation</strong> - Auto-generate specifications and documentation</li>
        <li><strong>Responsive Design</strong> - Design for multiple screen sizes</li>
      </ul>
      
      <h3>What You Can Build</h3>
      <ul>
        <li>Mobile app prototypes (iOS, Android)</li>
        <li>Web application mockups</li>
        <li>Desktop software interfaces</li>
        <li>Interactive user flows</li>
        <li>Clickable wireframes</li>
      </ul>
      
      <h3>Perfect For</h3>
      <ul>
        <li>UX/UI designers</li>
        <li>Product managers</li>
        <li>Business analysts</li>
        <li>Design teams and agencies</li>
      </ul>
      
      <h3>Team Edition Benefits</h3>
      <p>Includes team project sharing, version control, and unlimited cloud storage for your prototypes.</p>
      
      <h3>System Requirements</h3>
      <p>Windows 10/11 or macOS 10.14+. 4GB RAM minimum. Internet connection for cloud features.</p>
    `,
    features: ['Team Collaboration', 'Interactive Prototypes', 'Design Systems', 'Auto Documentation'],
    image: '/logos/axure.png',
    badge: 'BEST DEAL',
  },
  {
    id: '4',
    name: 'Navicat Premium',
    type: 'key',
    category: 'program',
    price: 99.90,
    originalPrice: 350.00,
    discount: 71,
    currency: 'CHF',
    billingCycle: 'yearly',
    description: 'Universal database management tool supporting MySQL, PostgreSQL, MongoDB, SQL Server, Oracle, and more.',
    longDescription: `
      <h3>All-in-One Database Management</h3>
      <p>Navicat Premium is a powerful database development tool that lets you connect to multiple databases simultaneously:</p>
      
      <h3>Supported Databases</h3>
      <ul>
        <li><strong>MySQL / MariaDB</strong> - Full support for all versions</li>
        <li><strong>PostgreSQL</strong> - Advanced PostgreSQL features</li>
        <li><strong>MongoDB</strong> - NoSQL database management</li>
        <li><strong>SQL Server</strong> - Microsoft SQL Server support</li>
        <li><strong>Oracle</strong> - Oracle database connectivity</li>
        <li><strong>SQLite</strong> - Lightweight database support</li>
      </ul>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Visual Query Builder</strong> - Build complex queries without writing SQL</li>
        <li><strong>Data Modeling</strong> - Design and visualize database structures</li>
        <li><strong>Data Transfer</strong> - Migrate data between different databases</li>
        <li><strong>Backup & Restore</strong> - Automated backup scheduling</li>
        <li><strong>SSH Tunnel</strong> - Secure remote connections</li>
        <li><strong>Import/Export</strong> - Support for CSV, Excel, JSON, XML</li>
      </ul>
      
      <h3>Perfect For</h3>
      <ul>
        <li>Database administrators</li>
        <li>Backend developers</li>
        <li>Data analysts</li>
        <li>DevOps engineers</li>
        <li>Full-stack developers</li>
      </ul>
      
      <h3>System Requirements</h3>
      <p>Windows 10/11, macOS 10.14+, or Linux. 2GB RAM minimum. Compatible with all major database versions.</p>
    `,
    features: ['Multi-Database Support', 'Data Modeling', 'Query Builder', 'SSH Tunnel'],
    image: '/logos/navicat.png',
    badge: 'LIMITED TIME',
  },
  {
    id: '5',
    name: 'SecureCRT',
    type: 'key',
    category: 'security',
    price: 72.00,
    originalPrice: 87.00,
    discount: 17,
    currency: 'CHF',
    billingCycle: 'one-time',
    description: 'Professional SSH client for secure remote access. Advanced terminal emulation with powerful scripting capabilities.',
    longDescription: `
      <h3>Professional SSH Terminal</h3>
      <p>SecureCRT is a rock-solid terminal emulator with advanced SSH capabilities for secure remote access:</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>SSH1 & SSH2</strong> - Industry-standard secure shell protocols</li>
        <li><strong>Telnet & Serial</strong> - Legacy protocol support</li>
        <li><strong>Session Management</strong> - Organize and save connection profiles</li>
        <li><strong>Tabbed Interface</strong> - Multiple sessions in one window</li>
        <li><strong>Script Automation</strong> - Python, VBScript, JScript support</li>
        <li><strong>File Transfer</strong> - Integrated SFTP, Xmodem, Zmodem</li>
        <li><strong>Port Forwarding</strong> - Local, remote, and dynamic forwarding</li>
      </ul>
      
      <h3>Security Features</h3>
      <ul>
        <li>Strong encryption algorithms (AES, 3DES, RC4)</li>
        <li>Public key authentication</li>
        <li>X.509 certificate support</li>
        <li>FIPS 140-2 validated cryptography</li>
        <li>Kerberos authentication</li>
      </ul>
      
      <h3>Perfect For</h3>
      <ul>
        <li>System administrators</li>
        <li>Network engineers</li>
        <li>DevOps professionals</li>
        <li>Security specialists</li>
        <li>IT support teams</li>
      </ul>
      
      <h3>System Requirements</h3>
      <p>Windows 10/11, macOS 10.12+, or Linux. Lifetime license with free updates for the current major version.</p>
    `,
    features: ['SSH/Telnet Client', 'Session Management', 'Script Automation', 'Port Forwarding'],
    image: '/logos/securecrt.png',
  },
  {
    id: '6',
    name: 'Adobe Creative Cloud (Monthly)',
    type: 'account',
    category: 'design',
    price: 9.90,
    originalPrice: 12.90,
    discount: 23,
    currency: 'CHF',
    billingCycle: 'monthly',
    description: 'Complete Adobe Creative Suite with 20+ professional apps. Monthly subscription with flexible cancellation.',
    longDescription: `<p>Same as yearly plan - all 20+ Adobe apps, 100GB storage, Adobe Fonts. Cancel anytime.</p>`,
    features: ['20+ Creative Apps', '100GB Cloud Storage', 'Adobe Fonts', 'Cancel Anytime'],
    image: '/logos/adobe.png',
    badge: 'FLEXIBLE',
  },
];

export type Product = typeof products[0];
