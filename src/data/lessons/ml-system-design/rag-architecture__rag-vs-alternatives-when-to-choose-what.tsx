import type { Component } from "solid-js";

const LessonRagArchitectureRagVsAlternativesWhenToChooseWhat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            RAG vs Alternatives: When to Choose What
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Core Trade Off:</strong>
            RAG trades model complexity for system complexity. You avoid
            expensive and slow model retraining, but you now operate a complete
            information retrieval pipeline with its own scaling, quality, and
            security challenges. The decision comes down to your primary
            problem: missing knowledge versus behavior.<p></p>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  RAG
                </div>
                <div style="font-size: 12px">
                  Fresh data, no retraining, 1-2 sec latency, complex ops
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Fine Tuning
                </div>
                <div style="font-size: 12px">
                  Custom behavior, static knowledge, days to retrain
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RAG vs Fine Tuning
            </p>
            <p style="margin-top: 0">
              Choose RAG when your primary problem is missing or rapidly
              changing knowledge: product manuals updated weekly, legal
              documents added daily, internal wikis with thousands of edits per
              day, or customer support tickets from the last hour. RAG can
              incorporate new documents in minutes through incremental indexing,
              whereas fine tuning requires collecting new training data,
              retraining (taking 2 to 7 days for large models), and redeploying.
              Choose fine tuning when you need to change reasoning patterns,
              style, tone, or tool usage behavior, and your knowledge base is
              relatively static. For example, teaching a model to respond in a
              specific brand voice, follow particular formatting rules, or use
              domain specific jargon consistently. Fine tuning modifies the
              model's weights to internalize these patterns. In practice, large
              companies combine both. They start with a fine tuned or
              instruction tuned base model for style and reasoning, then layer
              RAG on top for fresh, private data access. Google's Vertex AI and
              OpenAI's custom models follow this pattern.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RAG vs Long Context Windows
            </p>
            <p style="margin-top: 0">
              Modern LLMs support 128,000 to 1 million token context windows.
              Why not just stuff all your documents into the prompt? The math
              shows the problem. A 100,000 token context at $0.01 per 1,000
              input tokens costs $1.00 per query. At 10,000 queries per day,
              that is $10,000 daily or $3.6 million annually just for input
              tokens. RAG with targeted retrieval might use 5,000 tokens of
              context at $0.05 per query, dropping to $500 daily or $180,000
              annually: a 20x cost reduction.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Cost Comparison at 10K Daily Queries
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">$3.6M</div>
                  <div style="font-size: 10px; font-weight: 600">
                    LONG CONTEXT
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">$180K</div>
                  <div style="font-size: 10px; font-weight: 600">
                    RAG RETRIEVAL
                  </div>
                </div>
              </div>
            </div>
            Latency also suffers. Processing 100,000 tokens of context adds 2 to
            5 seconds of prefill time before generation even starts. RAG
            retrieval (30 to 50ms) plus generation (600ms) is significantly
            faster. Choose long context only for smaller, well defined corpora
            under 50,000 tokens where simplicity trumps cost, or when the entire
            context genuinely needs to be considered (like analyzing a single
            long document). For billions of tokens across millions of documents,
            RAG is the only practical approach.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RAG vs Traditional Search
            </p>
            <p style="margin-top: 0">
              Classic search returns ranked documents and expects humans to read
              and synthesize. RAG generates direct answers with citations. This
              improves user experience dramatically: instead of "here are 10
              documents that might help," users get "the answer is X, based on
              sources A and B." The risk is hallucination and incorrect
              synthesis. For high stakes domains like legal advice, medical
              diagnosis, or financial compliance, some teams prefer conservative
              search plus human review. For lower stakes like internal Q&amp;A
              or customer support suggestions, RAG with strong citation
              requirements strikes a good balance.
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
                  RAG optimizes for fresh, changing knowledge without retraining
                  (minutes to index) versus fine tuning for behavior and style
                  changes (days to retrain)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Long context windows cost 20x more at scale: $3.6M annually
                  for 100K token contexts versus $180K for RAG at 10,000 daily
                  queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Long context also adds 2 to 5 seconds prefill latency versus
                  RAG retrieval completing in 30 to 50 milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Many production systems combine fine tuned base models for
                  reasoning and style with RAG for domain knowledge and recency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For high stakes domains like legal or medical, traditional
                  search plus human review may be safer than RAG automated
                  synthesis despite worse UX
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
                  E commerce company: RAG for product catalog (50,000 new
                  products monthly) plus fine tuned model for brand voice and
                  customer service patterns, achieving both fresh inventory data
                  and consistent tone
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Healthcare system: Traditional search for diagnosis (requires
                  physician review) but RAG for administrative questions like
                  insurance coverage and appointment scheduling where errors
                  have lower stakes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Financial services: RAG with strict citation requirements and
                  human approval loop for client facing advice, pure retrieval
                  without generation for compliance and audit queries requiring
                  exact regulatory text
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRagArchitectureRagVsAlternativesWhenToChooseWhat;
