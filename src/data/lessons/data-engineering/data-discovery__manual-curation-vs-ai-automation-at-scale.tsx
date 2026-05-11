import type { Component } from "solid-js";

const LessonDataDiscoveryManualCurationVsAiAutomationAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Manual Curation vs AI Automation at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Scaling Problem:
            </div>
            Manual documentation and tagging produce high quality metadata. A
            data steward writes clear descriptions, assigns accurate business
            terms, and validates PII classifications. But this approach
            collapses at scale. If you have 50,000 datasets and each takes 15
            minutes to document, that is 12,500 hours of work. At one person
            documenting full time, that is 6 years. Automatic approaches scale
            effortlessly but make mistakes. An AI classifier might tag a{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            field as PII when it is actually a non sensitive anonymized
            identifier. Schema crawling captures technical metadata but produces
            no business context. Query log analysis infers usage patterns but
            cannot explain why a dataset is deprecated.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Manual Curation
                </div>
                <div style="font-size: 12px">
                  High quality, does not scale, 15 min per dataset
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  AI Automation
                </div>
                <div style="font-size: 12px">
                  Scales to millions, noisy, 5 to 10% error rate
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Hybrid Strategy:
            </div>
            Practical systems adopt a tiered approach based on dataset
            importance. Critical datasets, perhaps the top 5 to 10 percent by
            usage, get manual stewardship. A dedicated owner reviews AI
            suggestions, writes clear documentation, and validates
            classifications monthly. These are the datasets that power executive
            dashboards, regulatory reports, and key product metrics. The long
            tail of thousands of datasets gets automatic treatment. AI infers
            descriptions from schema and query patterns, classifies columns
            using trained models, and extracts basic lineage from job metadata.
            The error rate might be 5 to 10 percent, but that is acceptable for
            datasets queried once per month.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              AI Techniques in Discovery:
            </div>
            Modern discovery platforms layer AI in several ways. Column level
            classification uses machine learning models trained on labeled
            examples to detect PII, financial data, and other sensitive types.
            The model examines column names, data types, sample values, and
            statistical distributions. Description generation analyzes schema,
            sample data, and query patterns to produce natural language
            summaries. For a table with columns{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              order_id
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              total_amount
            </code>
            , and frequent joins to a users table, the AI might generate: "Order
            transactions with user information and payment totals."
            Recommendation engines suggest related datasets based on co usage
            patterns. If 80 percent of queries against table A also query table
            B within the same session, the system recommends B when users view
            A.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Documentation Coverage at Scale
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">5%</div>
                  <div style="font-size: 10px; font-weight: 600">
                    MANUAL CURATION
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">95%</div>
                  <div style="font-size: 10px; font-weight: 600">
                    AI GENERATED
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              When Automation Fails:
            </div>
            AI automation has clear limits. It struggles with domain specific
            terminology not present in training data. It cannot understand
            business logic or explain why a dataset was created. It produces
            generic descriptions that lack the context human users need. The
            risk is creating a catalog that appears complete but is actually
            misleading. Users find tables with AI generated descriptions that
            sound plausible but miss critical details: "This table is
            deprecated, use payments_v2 instead." Only a human steward knows to
            add that note.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The goal is not 100 percent automation. It is using automation
                to make manual curation 10x more efficient: AI generates the
                first draft, humans refine the critical 5 percent."
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
                  Manual curation at 15 minutes per dataset requires 6 years of
                  work for 50,000 datasets; automation scales but produces 5 to
                  10% error rate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid approach curates the top 5 to 10% of datasets by usage
                  manually while using AI for the long tail, balancing quality
                  and scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  AI classification examines column names, types, sample values,
                  and distributions to detect PII; description generation uses
                  schema and query patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automation fails on domain specific terminology and business
                  context; risk is plausible but misleading metadata that erodes
                  trust
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
                  A payments team manually curates their 50 core tables with
                  detailed documentation and validated PII tags, while 2,000
                  experimental analytics tables get AI generated descriptions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An AI classifier tags &lt;code style="padding: 2px 6px;
                  background: #f5f5f5; border: 1px solid #ddd; border-radius:
                  3px; font-family: monospace; font-size:
                  0.9em;"&gt;user_email&lt;/code&gt; as PII correctly but also
                  flags &lt;code style="padding: 2px 6px; background: #f5f5f5;
                  border: 1px solid #ddd; border-radius: 3px; font-family:
                  monospace; font-size: 0.9em;"&gt;support_email&lt;/code&gt; (a
                  generic alias) incorrectly, requiring human review to fix
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataDiscoveryManualCurationVsAiAutomationAtScale;
