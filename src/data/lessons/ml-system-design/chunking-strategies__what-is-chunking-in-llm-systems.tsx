import type { Component } from "solid-js";

const LessonChunkingStrategiesWhatIsChunkingInLlmSystems: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Chunking in LLM Systems?
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
              <strong>Chunking</strong> is the process of splitting large
              documents into smaller, retrievable units that can fit within an
              LLM's limited context window while preserving enough local context
              for the model to reason effectively.
            </div>
          </div>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            The Core Problem
          </p>
          <p style="margin-top: 0">
            Modern LLMs can only process a finite amount of text in a single
            request. Even the largest production models accept between 4,000 and
            200,000 tokens per call. Your enterprise knowledge base with
            millions of documents and billions of tokens cannot possibly fit. A
            concrete example: suppose you have a 10,000 page employee handbook
            with 5 million tokens total. When an employee asks "What's the
            parental leave policy?", the system needs to show the LLM only the
            relevant 2 to 5 pages out of those 10,000. Chunking prepares the
            handbook so the system can quickly find and retrieve just those
            relevant sections.
          </p>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            How It Works
          </p>
          <p style="margin-top: 0">
            The chunking pipeline runs offline during document ingestion. A
            2,000 token design document might be split into 4 to 6 chunks of 300
            to 600 tokens each. Each chunk becomes a searchable unit: it gets
            converted to a vector embedding and stored in a database alongside
            metadata like document ID, section title, and timestamps. At query
            time, the system embeds the user's question, searches the chunk
            database for the most relevant 10 to 40 chunks, and assembles them
            into the context window along with instructions and conversation
            history. The LLM then generates an answer based on only those
            retrieved chunks, not the entire corpus.
          </p>
          <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Why This Matters
          </p>
          <p style="margin-top: 0">
            Without chunking, you face an impossible choice: either send entire
            documents (wasting tokens and money on irrelevant content) or send
            nothing (the model has no information to work with). Chunking lets
            you balance precision, cost, and answer quality by retrieving just
            enough context for the model to succeed.
          </p>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Context windows are limited: even 128k token models cannot hold
                an entire knowledge base, requiring selective retrieval of
                relevant sections
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Chunks become the unit of retrieval: each chunk is embedded as a
                vector and stored in a searchable index for fast lookup at query
                time
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Typical chunk sizes range from 150 to 1,000 tokens depending on
                context window size and how many perspectives you want to fit
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Chunking happens offline during ingestion, while retrieval
                happens online within strict latency budgets of 50 to 100 ms p95
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
                A 100 million page internal documentation system chunks each
                page into 4 to 8 segments, creating 400 to 800 million
                searchable chunks
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                ChatGPT style systems chunk conversation history to keep recent
                messages within the context window while summarizing or dropping
                older turns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonChunkingStrategiesWhatIsChunkingInLlmSystems;
