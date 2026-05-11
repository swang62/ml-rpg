import type { Component } from "solid-js";

const LessonNamedEntityRecognitionCriticalNerFailureModesAndProductionMitigations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Critical NER Failure Modes and Production Mitigations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Boundary Detection Failures
            </p>
            <p style="margin-top: 0">
              The most common NER failure is getting entity boundaries wrong.
              Consider "New York Times" - a model might extract just "New York"
              (missing "Times") or classify the whole phrase as a location
              instead of an organization. These boundary errors are subtle
              because the extracted text is partially correct, but downstream
              systems receive malformed entities.
            </p>
            <p>
              Boundary errors happen because compound entities like "New York
              Times" or "Bank of America" span multiple words with ambiguous
              internal structure. Training data might have inconsistent
              annotations for these cases. To detect boundary problems, track
              exact match metrics separately from partial match. A big gap
              between them signals systematic boundary issues.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Entity Type Confusion
            </p>
            <p style="margin-top: 0">
              Some entities belong to multiple categories depending on context.
              "Washington" could be a person (George Washington), a location
              (Washington state), or an organization (Washington Post). Models
              struggle when training data does not adequately represent all
              interpretations. The fix requires more diverse training examples
              or domain-specific models that know their context.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Common Failure:</strong> Entity type confusion often
              appears as high overall accuracy masking specific category
              failures. Your model might achieve 90% aggregate F1 while failing
              on organization names (60% F1). Always break down metrics by
              entity type.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Low Confidence Extractions
            </p>
            <p style="margin-top: 0">
              NER models output confidence scores, but many systems ignore them,
              treating all extractions equally. A high-confidence "Microsoft"
              and a low-confidence "XYZ Corp" both enter downstream processing,
              but the second might be wrong. Set confidence thresholds based on
              error tolerance. For high-stakes applications, only accept
              extractions above 0.9 confidence and flag lower ones for human
              review.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Addressing Failures
            </p>
            <p style="margin-top: 0">
              Fix boundary errors with more training examples for compound
              entities and post-processing rules for known patterns. Fix type
              confusion with domain-specific training data. Use confidence
              thresholds to reject uncertain extractions.
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
                  Boundary errors are the most common NER failure: extracting
                  'New York' instead of 'New York Times' or misclassifying
                  compound entities
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Track exact match vs partial match metrics separately - a
                  large gap between them indicates systematic boundary detection
                  problems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High aggregate accuracy can mask category-specific failures;
                  always break down F1 by entity type to find weak spots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Set confidence thresholds (0.9+ for high-stakes) rather than
                  treating all extractions equally; flag low-confidence for
                  human review
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
                  Lead with boundary errors as the most common failure mode.
                  Give a concrete example like 'New York Times' being extracted
                  as just 'New York'.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Suggest per-category metric breakdowns proactively. This shows
                  you know aggregate metrics can hide failures.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention confidence thresholds as a production safeguard. Ask
                  about error tolerance to determine the right threshold.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonNamedEntityRecognitionCriticalNerFailureModesAndProductionMitigations;
