import { createStreamableUI, createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamObject } from 'ai';
import { PartialRelated, relatedSchema } from '../schema/related';
import { Section } from '@/modules/ai-search/components/section';
import SearchRelated from '@/modules/ai-search/components/search-related';
import { OpenAI } from '@ai-sdk/openai';

export async function querySuggestor(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[]
) {
  const openai = new OpenAI({
    baseUrl: process.env.OPENAI_API_BASE, // optional base URL for proxies etc.
    apiKey: process.env.OPENAI_API_KEY, // optional API key, default to env property OPENAI_API_KEY
    organization: '', // optional organization
  });
  const objectStream = createStreamableValue<PartialRelated>();
  uiStream.append(
    <Section title="Related" separator={true}>
      <SearchRelated relatedQueries={objectStream.value} />
    </Section>
  );

  let finalRelatedQueries: PartialRelated = {};
  await streamObject({
    model: openai.chat(process.env.OPENAI_API_MODEL || 'gpt-4o'),
    system: `As a professional web researcher, your task is to generate a set of three queries that explore the subject matter more deeply, building upon the initial query and the information uncovered in its search results.

    For instance, if the original query was "Starship's third test flight key milestones", your output should follow this format:

    "{
      "related": [
        "What were the primary objectives achieved during Starship's third test flight?",
        "What factors contributed to the ultimate outcome of Starship's third test flight?",
        "How will the results of the third test flight influence SpaceX's future development plans for Starship?"
      ]
    }"

    Aim to create queries that progressively delve into more specific aspects, implications, or adjacent topics related to the initial query. The goal is to anticipate the user's potential information needs and guide them towards a more comprehensive understanding of the subject matter.
    Please match the language of the response to the user's language.`,
    messages,
    schema: relatedSchema,
  })
    .then(async (result) => {
      for await (const obj of result.partialObjectStream) {
        if (obj.items) {
          objectStream.update(obj);
          finalRelatedQueries = obj;
        }
      }
    })
    .finally(() => {
      objectStream.done();
    });

  return finalRelatedQueries;
}
