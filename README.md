# Movie Mood Website

A web application that recommends movies based on user moods and preferences.

## Features

- Browse movies by category and mood
- Like/dislike movies to provide feedback
- Admin dashboard for managing movie database
- Persistent storage with Vercel Blob
- Responsive design for all devices

## Setup Instructions

### Prerequisites

- Node.js 18 or later
- Vercel account

### Local Development

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Setting Up Vercel Blob

1. Create a new project in Vercel
2. Go to the Storage tab in your Vercel dashboard
3. Click "Create" and select "Blob"
4. Follow the prompts to create a new Blob store
5. Vercel will automatically add the required environment variables to your project

### Environment Variables

The following environment variables are required for Vercel Blob:

- `BLOB_READ_WRITE_TOKEN`: The token for read/write access to your Blob store

This will be automatically added to your project when you create a Blob store in Vercel.

### Deployment

1. Push your code to a Git repository
2. Import the repository in Vercel
3. Vercel will automatically deploy your application
4. Ensure the Blob store is connected in the Storage tab

## Login Credentials

For development and testing:
- Username: admin
- Password: moviemood123

## License

MIT
