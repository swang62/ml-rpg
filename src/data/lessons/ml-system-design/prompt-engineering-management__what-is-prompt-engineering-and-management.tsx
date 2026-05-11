import type { Component } from "solid-js";

const LessonPromptEngineeringManagementWhatIsPromptEngineeringAndManagement: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Prompt Engineering and Management?
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
                <strong>Prompt Engineering</strong> is designing text
                instructions that guide large language models to produce desired
                outputs. <strong>Prompt Management</strong> adds version
                control, testing, and deployment infrastructure to treat prompts
                as production artifacts.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Prompts Matter
            </p>
            <p style="margin-top: 0">
              LLMs are sensitive to subtle wording changes. Moving a sentence,
              changing "must" to "should," or reordering examples can shift
              output quality by 15-30%. A prompt that works in testing might
              fail in production when users provide unexpected inputs. Without
              systematic engineering, prompts become fragile black boxes.
            </p>
            <p>
              A customer service bot with poorly tuned prompts produces
              responses that sound robotic, dropping satisfaction by 10-15
              points. An email drafting tool with inconsistent prompts produces
              wildly varying tone, making the product unreliable.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Engineering vs Management
            </p>
            <p style="margin-top: 0">
              Prompt engineering focuses on content: crafting instructions,
              selecting examples, structuring context. Prompt management focuses
              on lifecycle: version control, A/B testing, deployment, rollback.
              Both are essential. Good engineering without management means you
              cannot reproduce results. Good management without engineering
              means carefully versioning mediocre prompts.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Prompts drift over time as models
              update, user patterns change, and edge cases accumulate. A prompt
              at 92% accuracy in March might drop to 85% by June without
              monitoring.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Good Looks Like
            </p>
            <p style="margin-top: 0">
              A mature system includes: version control with author and
              rationale, test suites before deployment, A/B testing for
              variants, monitoring showing accuracy/latency/cost, and instant
              rollback.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Business Intent</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Task outcomes + Safety rules
                  </div>
                </div>
                <div style="text-align: center; font-size: 22px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Prompt Registry</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Versioned templates + Modular snippets
                  </div>
                </div>
                <div style="text-align: center; font-size: 22px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Runtime Assembly</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Token budget + Context ranking
                  </div>
                </div>
                <div style="text-align: center; font-size: 22px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Model + Guardrails</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Evaluation + Monitoring
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
                  Prompts are highly sensitive: rewording can shift output
                  quality 15-30%, making systematic engineering essential
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prompt engineering (content design) and prompt management
                  (lifecycle infrastructure) are both required for production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prompts drift over time as models update and user patterns
                  change - monitoring catches degradation before users notice
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mature systems include version control, test suites, A/B
                  testing, monitoring dashboards, and rollback capability
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
                  Explain prompt sensitivity with a concrete example: changing
                  'must' to 'should' or reordering examples causes measurable
                  quality shifts.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distinguish engineering (what the prompt says) from management
                  (how you version, test, and deploy it). Both are needed.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the drift problem: prompts degrade over time without
                  monitoring. Quote specific numbers like 92% to 85% accuracy
                  drop.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPromptEngineeringManagementWhatIsPromptEngineeringAndManagement;
