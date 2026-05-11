import type { Component } from "solid-js";

const LessonQueryUnderstandingEntityParsingAndLinkingInQueryUnderstanding: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Entity Parsing and Linking in Query Understanding
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
                <strong>Entity extraction</strong> identifies mentions of
                real-world things in queries: people, places, products, dates.{" "}
                <strong>Entity linking</strong> maps these mentions to canonical
                entries in a knowledge base, resolving ambiguity ("Jordan" →
                Michael Jordan vs Jordan the country).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Extraction Pipeline
            </p>
            <p style="margin-top: 0">
              Step 1: Detect entity spans using NER (Named Entity Recognition).
              A BERT-based NER model identifies "New York" as a location,
              "iPhone 15" as a product. Step 2: Generate candidate entities from
              a knowledge base. "NYC" matches New York City, NYC FC (soccer
              team), and NYC subway. Step 3: Rank candidates using context.
              "flights to NYC" disambiguates to the city; "NYC game tonight"
              suggests the team. Accuracy depends heavily on knowledge base
              coverage and context modeling.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Knowledge Base Design
            </p>
            <p style="margin-top: 0">
              The knowledge base stores entities with: canonical name, aliases
              ("NYC", "New York", "Big Apple"), type (city, person, product),
              attributes (population, coordinates, price), and relationships
              (NYC is-in USA). Coverage is critical; queries mentioning entities
              not in your KB fail silently. Typical sizes: e-commerce might have
              10M products; web search needs billions of entities. Update
              frequency matters: new products, people, events need fast
              ingestion.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Linking Challenges
            </p>
            <p style="margin-top: 0">
              <strong>Ambiguity:</strong> "Apple" has 10+ meanings. Use query
              context and user history. <strong>Partial matches:</strong>{" "}
              "iPhone" should match "iPhone 15 Pro Max." Use hierarchical
              entities. <strong>Novel entities:</strong> New products or people
              not yet in KB. Fall back to embedding similarity or treat as
              unlinked. Entity linking accuracy typically ranges 75-90%
              depending on domain specificity.
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
                  Entity extraction identifies mentions; entity linking maps to
                  canonical KB entries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pipeline: NER detects spans → generate candidates from KB →
                  rank by context
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Knowledge base stores: canonical name, aliases, type,
                  attributes, relationships
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  KB coverage is critical; missing entities fail silently; sizes
                  range 10M (e-commerce) to billions (web)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Entity linking accuracy: 75-90% depending on domain; ambiguity
                  is the main challenge
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
                  Describe the three-step pipeline (NER → candidates → ranking)
                  for systematic explanation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain knowledge base structure (name, aliases, type,
                  attributes) for practical depth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use NYC disambiguation example (city vs soccer team) to
                  illustrate context-based linking
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonQueryUnderstandingEntityParsingAndLinkingInQueryUnderstanding;
