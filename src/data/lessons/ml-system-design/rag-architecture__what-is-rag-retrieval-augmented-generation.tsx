import type { Component } from "solid-js";

const LessonRagArchitectureWhatIsRagRetrievalAugmentedGeneration: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is RAG (Retrieval Augmented Generation)?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Retrieval Augmented Generation (RAG)</strong> is a
                technique that combines external knowledge retrieval with large
                language model generation to produce factually grounded answers
                based on specific documents rather than just the model's
                training data.
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Problem
            </p>
            <p style="margin-top: 0">
              Large Language Models (LLMs) are trained on static snapshots of
              public data. They cannot access your company's internal
              documentation, last week's product specifications, or yesterday's
              incident reports. Even worse, when LLMs lack knowledge, they
              hallucinate, meaning they confidently invent plausible sounding
              but completely false information. Fine tuning the model helps with
              style and behavior, but it does not reliably inject large,
              constantly changing knowledge bases. Retraining is expensive, slow
              (taking days or weeks), and still does not guarantee the model
              will correctly recall specific facts from millions of documents.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How RAG Solves This
            </p>
            <p style="margin-top: 0">
              RAG separates knowledge storage from language generation. Instead
              of cramming facts into the model's weights, you store your
              documents in an external search system, typically a vector
              database. When a user asks a question, the system retrieves the
              most relevant documents first, then explicitly provides those as
              context to the LLM in the prompt with instructions like "Answer
              based only on these sources." Think of it like an open book exam
              versus a closed book exam. Without RAG, the LLM must rely purely
              on memorized training data (closed book). With RAG, it can look up
              specific information in provided documents (open book) before
              answering.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Three Core Components
            </p>
            <p style="margin-top: 0">
              First, an embedding model converts text into high dimensional
              vectors (typically 768 to 1536 dimensions) so semantically similar
              content is mathematically close in vector space. Second, a
              retrieval system searches millions or billions of these vectors
              with low latency, usually under 30 milliseconds at the 95th
              percentile. Third, the generative LLM uses retrieved passages plus
              the user query to craft an answer, often with citation
              requirements. This architecture lets you update knowledge without
              retraining the LLM and gives you precise control over what
              information the model can access.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LLMs trained on static data cannot access private, recent, or
                  domain specific information and hallucinate when knowledge is
                  missing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RAG externalizes knowledge to a searchable index, retrieving
                  relevant documents at query time to provide as explicit
                  context to the LLM
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Three subsystems work together: embedding model for semantic
                  search, retrieval system for fast lookup, and generative LLM
                  for answer synthesis
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enables knowledge updates without expensive model retraining,
                  typically taking minutes for new documents versus days or
                  weeks for fine tuning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Provides control over information access through retrieval
                  filtering, critical for security and compliance in enterprise
                  applications
                </span>
              </div>
            </div>
          </div>
          <div class="Learn_examplesSection p-4 mb-4">
            <div class="Learn_examplesHeader mb-3 pb-3">📌 Interview Tips</div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">1</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enterprise assistant answering "How do I deploy a new
                  microservice?" by retrieving relevant pages from internal
                  wikis and runbooks, then generating step by step instructions
                  with citations to specific documentation sections
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Customer support chatbot accessing product manuals and recent
                  ticket history to answer technical questions with up to date
                  troubleshooting steps rather than outdated training data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Legal research tool that retrieves relevant case law and
                  statutes, then generates analysis grounded in specific legal
                  precedents with exact citations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRagArchitectureWhatIsRagRetrievalAugmentedGeneration;
