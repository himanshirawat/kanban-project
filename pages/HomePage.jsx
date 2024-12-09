export default function Home() {
    return (
      <div className='min-h-screen bg-gray-100'>
        <section className='bg-blue-50 py-20'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-4xl font-bold text-blue-600 mb-4'>
              Welcome to Kanban Project
            </h2>
            <p className='text-lg text-gray-700 max-w-2xl mx-auto'>
              Organize your tasks efficiently with our Kanban-based project
              management tool. Designed with modern technologies to provide a
              seamless experience for developers and teams.
            </p>
          </div>
        </section>
  
        <section className='py-12 bg-white px-12'>
          <div className='container mx-auto px-4'>
            <h3 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
              About the Project
            </h3>
            <div className='grid md:grid-cols-2 gap-8'>
              <div>
                <h4 className='text-2xl font-semibold text-blue-600 mb-4'>
                  Built with Modern Frameworks
                </h4>
                <ul className='list-disc list-inside text-gray-700'>
                  <li>Frontend: React with Next.js for server-side rendering.</li>
                  <li>
                    Backend: Node.js with Express and MongoDB for robust API
                    handling and database management.
                  </li>
                  <li>
                    Styling: Tailwind CSS for fast and responsive UI development.
                  </li>
                  <li>
                    State Management: React Hooks for seamless state handling.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='text-2xl font-semibold text-blue-600 mb-4'>
                  Features Implemented
                </h4>
                <ul className='list-disc list-inside text-gray-700'>
                  <li>
                    User Authentication: Register and Login with secure JWTs.
                  </li>
                  <li>Drag and Drop for task organization.</li>
                  <li>
                    CRUD operations for tasks (Create, Read, Update, Delete).
                  </li>
                  <li>Prioritization and due date management for tasks.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
  
        <section className='bg-gray-200 p-6 rounded-lg shadow-md text-center'>
          <h3 className='text-xl font-bold mb-2'>About Me</h3>
          <p className='text-gray-700'>
            Hi, I&apos;m <strong>Himanshika Rawat</strong>, a passionate Full-Stack
            Developer with a knack for creating scalable and efficient web
            applications.
          </p>
          <div className='mt-4'>
            <a
              href='https://github.com/himanshirawat'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:underline'
            >
              GitHub Profile
            </a>
            <span className='mx-2'>|</span>
            <a
              href='https://github.com/himanshirawat/kanban-project'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:underline'
            >
              Project Repository
            </a>
          </div>
        </section>
  
        <footer className='sticky bottom-0 bg-gray-800 text-white py-4 text-center'>
          <p>
            &copy; {new Date().getFullYear()} Himanshika Rawat. All rights
            reserved.
          </p>
        </footer>
      </div>
    );
  }
  