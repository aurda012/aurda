import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const exampleMessages = [
  {
    heading: 'What is GPT-4o?',
    message: 'What is GPT-4o?',
  },
  {
    heading: 'Why is Nvidia growing so rapidly?',
    message: 'Why is Nvidia growing so rapidly?',
  },
  {
    heading: 'How does the Vercel AI SDK work?',
    message: 'How does the Vercel AI SDK work?',
  },
  {
    heading: 'Next.js vs React',
    message: 'Next.js vs React',
  },
];
export function EmptyScreen({
  submitMessage,
  className,
}: {
  submitMessage: (message: string) => void;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-transparent p-2">
        <div className="mb-4 mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-black dark:text-white"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message);
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
