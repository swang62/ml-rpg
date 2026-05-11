import type { Component } from "solid-js";

const LessonTextClassificationScaleWhatIsTextClassificationAndWhyDoesScaleMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Text Classification and Why Does Scale Matter?
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
                <strong>Text Classification</strong> assigns predefined
                categories to text documents. At scale, this means classifying
                millions to billions of documents with consistent accuracy, low
                latency, and manageable cost.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Scale Changes Everything
            </p>
            <p style="margin-top: 0">
              A classifier that works on 1000 documents might fail at 1 million.
              At small scale, you can use expensive models, tolerate slow
              inference, and manually review edge cases. At large scale, a model
              taking 500ms per document means 5.7 days to process 1 million
              documents. A model costing 0.01 dollars per call costs 10,000
              dollars for 1 million documents. Manual review becomes impossible
              when 5% need human attention: 50,000 reviews.
            </p>
            <p>
              Scale forces trade-offs. You might use a faster, cheaper model
              that is 3% less accurate. You might skip classification for low
              value documents. You might build tiered systems where cheap models
              handle easy cases and expensive models handle hard ones.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Common Use Cases
            </p>
            <p style="margin-top: 0">
              Content moderation classifies user content as safe, unsafe, or
              needing review. Sentiment analysis categorizes feedback as
              positive, negative, or neutral. Intent classification routes
              support tickets. Spam detection filters unwanted messages. Topic
              tagging organizes documents for search.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Classification accuracy
              requirements vary by use case. Spam filtering at 99% still lets 1
              in 100 spam through: annoying but tolerable. Medical triage at 99%
              means 1 in 100 urgent cases misclassified: potentially dangerous.
              Know your error tolerance before choosing a model.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Scale Spectrum
            </p>
            <p style="margin-top: 0">
              Small scale (thousands): Any approach works. Medium scale
              (millions): Need efficient models and batching. Large scale
              (billions): Need distributed systems and aggressive optimization.
              Match architecture to scale.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Raw Text Input</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Email, ticket, review
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Embedding Model</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    768D vector in 20ms
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Classifier Head</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Linear model &lt;1ms
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Labels + Scores</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Spam: 0.94, Ham: 0.06
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
                  At scale, 500ms per document means 5.7 days for 1M documents.
                  Latency that works at 1K fails at 1M.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost scales linearly: 0.01 dollars per call = 10,000 dollars
                  for 1M classifications.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Manual review breaks at scale: 5% needing review = 50,000
                  human reviews at 1M scale.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale forces trade-offs: faster/cheaper models, tiered
                  systems, skipping low value documents.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Error tolerance varies by use case: 99% is fine for spam but
                  dangerous for medical triage.
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
                  Quantify the scale problem: 500ms/doc × 1M docs = 5.7 days.
                  Show you understand latency at scale.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention tiered architectures early: cheap models for easy
                  cases, expensive for hard ones.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ask about error tolerance first: spam at 99% is fine, medical
                  triage at 99% is not.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTextClassificationScaleWhatIsTextClassificationAndWhyDoesScaleMatter;
