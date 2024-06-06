import { createStreamableUI, createStreamableValue } from 'ai/rsc';
import {
  CoreMessage,
  ToolCallPart,
  ToolResultPart,
  streamText as nonexperimental_streamText,
} from 'ai';
import { Section } from '@/modules/ai-search/components/section';
import { OpenAI } from '@ai-sdk/openai';
import { BotMessage } from '@/modules/ai-search/components/message';
import { getTools } from './tools';

export async function researcher(
  uiStream: ReturnType<typeof createStreamableUI>,
  streamText: ReturnType<typeof createStreamableValue<string>>,
  messages: CoreMessage[],
  useSpecificModel?: boolean
) {
  const openai = new OpenAI({
    baseUrl: process.env.OPENAI_API_BASE, // optional base URL for proxies etc.
    apiKey: process.env.OPENAI_API_KEY, // optional API key, default to env property OPENAI_API_KEY
    organization: '', // optional organization
  });

  let fullResponse = '';
  let hasError = false;
  const answerSection = (
    <Section title="Answer">
      <BotMessage content={streamText.value} />
    </Section>
  );

  let isFirstToolResponse = true;
  const currentDate = new Date().toLocaleString();
  const result = await nonexperimental_streamText({
    model: openai.chat(process.env.OPENAI_API_MODEL || 'gpt-4o'),
    maxTokens: 2500,
    system: `As a professional search expert, you possess the ability to search for any information on the web.
    or any information on the web.
    For each user query, utilize the search results to their fullest potential to provide additional information and assistance in your response.
    If there are any images relevant to your answer, be sure to include them as well.
    Aim to directly address the user's question, augmenting your response with insights gleaned from the search results.
    Whenever quoting or referencing information from a specific URL, always cite the source URL explicitly.
    Please match the language of the response to the user's language. Current date and time: ${currentDate}`,
    messages,
    tools: getTools({
      uiStream,
      fullResponse,
      hasError,
      isFirstToolResponse,
    }),
  });

  // Process the response
  const toolCalls: ToolCallPart[] = [];
  const toolResponses: ToolResultPart[] = [];
  for await (const delta of result.fullStream) {
    switch (delta.type) {
      case 'text-delta':
        if (delta.textDelta) {
          // If the first text delta is available, add a UI section
          if (fullResponse.length === 0 && delta.textDelta.length > 0) {
            // Update the UI
            uiStream.update(answerSection);
          }

          fullResponse += delta.textDelta;
          streamText.update(fullResponse);
        }
        break;
      case 'tool-call':
        toolCalls.push(delta);
        break;
      case 'tool-result':
        // Append the answer section if the specific model is not used
        if (!useSpecificModel && toolResponses.length === 0) {
          uiStream.append(answerSection);
        }
        toolResponses.push(delta);
        break;
      case 'error':
        hasError = true;
        fullResponse += `\nError occurred while executing the tool`;
        break;
    }
  }
  messages.push({
    role: 'assistant',
    content: [{ type: 'text', text: fullResponse }, ...toolCalls],
  });

  if (toolResponses.length > 0) {
    // Add tool responses to the messages
    messages.push({ role: 'tool', content: toolResponses });
  }

  return { result, fullResponse, hasError, toolResponses };
}
