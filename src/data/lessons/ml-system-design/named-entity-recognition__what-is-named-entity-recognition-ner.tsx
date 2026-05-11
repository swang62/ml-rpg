import type { Component } from "solid-js";

const LessonNamedEntityRecognitionWhatIsNamedEntityRecognitionNer: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Named Entity Recognition (NER)?
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
                <strong>Named Entity Recognition (NER)</strong> identifies and
                classifies specific entities in text, like people,
                organizations, locations, dates, and product names, into
                predefined categories.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Problem NER Solves
            </p>
            <p style="margin-top: 0">
              Raw text is unstructured. A search query like "flights from New
              York to London next Friday" contains actionable information buried
              in natural language. Without NER, your system sees 8 words with no
              semantic meaning. With NER, you extract: LOCATION(New York),
              LOCATION(London), DATE(next Friday). Now you can query a flight
              database with structured parameters instead of fuzzy text
              matching.
            </p>
            <p>
              The same principle applies across domains. Customer support
              tickets mention product names, account numbers, and dates that
              need routing. Legal documents reference company names and case
              citations that need indexing. Medical records contain drug names
              and conditions that need structured storage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Pattern Matching Fails
            </p>
            <p style="margin-top: 0">
              You might think regex could solve this. It cannot. Consider
              "Apple" - is it the company, the fruit, or Apple Records? The
              answer depends on context. NER models learn these contextual
              signals from training data, distinguishing entity types based on
              surrounding words and sentence structure.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> NER accuracy varies dramatically
              by domain. A model trained on news achieves 90%+ F1 on standard
              benchmarks but might drop to 60-70% on legal or medical text
              because entity types and language patterns differ.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Evaluation Metrics
            </p>
            <p style="margin-top: 0">
              NER evaluation distinguishes exact match (span boundaries AND
              entity type correct) from partial match (overlapping spans with
              correct type). Extracting "New York" instead of "New York Times"
              scores well on partial match but poorly on exact match. Both
              matter, but exact match is the harder, more meaningful target.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="margin-bottom: 12px; font-weight: 700; font-size: 14px; text-align: center">
                BIO Tagging Example
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="display: flex; gap: 6px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 80px; text-align: center; font-size: 13px">
                    <strong>Apple</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 80px; text-align: center; font-size: 13px">
                    <strong>B-ORG</strong>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 80px; text-align: center; font-size: 13px">
                    <strong>CEO</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 80px; text-align: center; font-size: 13px">
                    <strong>O</strong>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 80px; text-align: center; font-size: 13px">
                    <strong>Tim</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 80px; text-align: center; font-size: 13px">
                    <strong>B-PER</strong>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 80px; text-align: center; font-size: 13px">
                    <strong>Cook</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 80px; text-align: center; font-size: 13px">
                    <strong>I-PER</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  NER transforms unstructured text into structured data by
                  identifying entities like people, organizations, locations,
                  and dates with their categories
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Simple pattern matching fails because the same word (Apple,
                  Washington) can be different entity types depending on context
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Domain transfer is a major challenge: models trained on news
                  may drop from 90% F1 to 60-70% on legal or medical text
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exact match evaluation (correct span AND type) is harder but
                  more meaningful than partial match metrics
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
                  When discussing NER, give a concrete example: 'flights from
                  New York to London next Friday' becomes LOCATION, LOCATION,
                  DATE - showing the transformation from text to queryable
                  structure.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the ambiguity problem early. Ask the interviewer what
                  domain they're working in, because entity types and accuracy
                  expectations vary dramatically.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distinguish exact vs partial match metrics. A system with high
                  partial but low exact match has boundary detection problems.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNamedEntityRecognitionWhatIsNamedEntityRecognitionNer;
