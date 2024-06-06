// import { getServerSession } from 'next-auth/next';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  avatar: f({ image: { maxFileSize: '2MB' } })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log('file', data)),

  generalMedia: f({
    'application/msword': { maxFileSize: '2MB', maxFileCount: 1 }, // 'doc', 'docx'
    'application/pdf': { maxFileSize: '4MB', maxFileCount: 1 },
    'application/vnd.ms-excel': { maxFileSize: '2MB', maxFileCount: 1 }, // 'xls', 'xlsx'
    'application/vnd.ms-powerpoint': { maxFileSize: '8MB', maxFileCount: 1 }, // 'ppt', 'pptx'
    'application/zip': { maxFileSize: '16MB', maxFileCount: 1 },
    'text/html': { maxFileSize: '2MB', maxFileCount: 1 },
    'text/plain': { maxFileSize: '2MB', maxFileCount: 1 },
    'text/csv': { maxFileSize: '2MB', maxFileCount: 1 },
    'text/markdown': { maxFileSize: '2MB', maxFileCount: 1 },
    'text/xml': { maxFileSize: '2MB', maxFileCount: 1 },
    'application/json': { maxFileSize: '2MB', maxFileCount: 1 },
    'application/xml': { maxFileSize: '2MB', maxFileCount: 1 },
    'application/javascript': { maxFileSize: '2MB', maxFileCount: 1 },
    audio: { maxFileSize: '8MB', maxFileCount: 1 },
    image: { maxFileSize: '2MB', maxFileCount: 5 },
    video: { maxFileSize: '64MB', maxFileCount: 1 },
  })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log('file', data)),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
