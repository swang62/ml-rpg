import type { Component } from "solid-js";

const LessonLlmEvaluationBenchmarkingTradeOffsHelpfulnessVsHarmlessness: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Trade-offs: Helpfulness vs Harmlessness
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Fundamental Tension:</strong>
            Every safety intervention you add to an LLM creates a trade off
            between harmlessness (refusing harmful requests) and helpfulness
            (answering legitimate queries). This is not a technical detail, it
            is the central design challenge in production LLM systems.
            Understanding the specific numbers and decision frameworks is
            critical for interviews because it shows you grasp the real
            constraints, not just theory. Here is why this trade off matters and
            how teams navigate it.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Mechanics
            </p>
            <p style="margin-top: 0">
              When you train a model with RLHF focused on safety, you are
              essentially teaching it to be cautious. The reward model penalizes
              any output that could potentially violate policy, which makes the
              model more likely to refuse requests. Anthropic's research shows
              that as models scale and receive more safety training, they become
              harder to jailbreak (attack success rate drops) but also more
              evasive (refusal rate on benign prompts increases). The math looks
              like this. Suppose your baseline model has a 1.0 percent attack
              success rate on harmful prompts and a 2.0 percent over refusal
              rate on benign prompts. After aggressive safety tuning, attack
              success drops to 0.1 percent, but over refusal jumps to 8.0
              percent. For a consumer product serving 10 million daily queries,
              that is 800,000 unnecessary refusals per day versus the original
              200,000. Users perceive the model as "dumbed down" or overly
              cautious, even though it is objectively safer.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Safety Tuning Impact
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    ATTACK SUCCESS
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    1.0% → 0.1%
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">but</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    OVER REFUSAL
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    2.0% → 8.0%
                  </div>
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Framework by Use Case
            </p>
            <p style="margin-top: 0">
              The optimal point on the helpfulness versus harmlessness curve
              depends entirely on your product context and risk tolerance. For
              consumer chatbots (ChatGPT, Claude consumer), teams typically
              target attack success below 0.5 percent for critical harms like
              self harm or child safety, while keeping over refusal under 5.0
              percent. Users tolerate some false refusals, but if the model
              refuses too often, engagement drops and users switch to
              competitors. The priority is balancing safety with a smooth user
              experience. For enterprise APIs (OpenAI API, Anthropic API),
              customers often want less restrictive models because they are
              building their own safety layers on top. Here you might accept 1.0
              to 2.0 percent attack success on less critical categories, keeping
              over refusal under 3.0 percent. The assumption is that enterprise
              customers will add application specific filtering and monitoring.
              For high risk domains (medical advice, financial guidance), you
              need extremely conservative settings. Attack success for any
              harmful output might need to be below 0.01 percent, accepting 10
              to 15 percent over refusal rates. In these contexts, incorrectly
              providing harmful information has severe consequences (lawsuits,
              regulatory action, physical harm), so aggressive refusal is worth
              the usability hit.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Measuring the Trade-off
            </p>
            <p style="margin-top: 0">
              Production teams measure both sides explicitly. You maintain two
              test sets: an adversarial set with known harmful prompts
              (measuring attack success rate) and a benign set with legitimate
              queries that should never be refused (measuring over refusal
              rate). After every training run, you plot both metrics and require
              that neither regresses beyond defined thresholds. Anthropic's
              published work on Constitutional AI and Reinforcement Learning
              from AI Feedback (RLAIF) explicitly explores this Pareto frontier.
              They show that you can shift the curve with better training data
              and reward modeling, but you cannot eliminate the trade off. Some
              models are strictly better (lower attack success and lower over
              refusal), but within a given training regime, you always face the
              choice of where to sit on the curve.
            </p>
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 20px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision is not 'make it safe.' It is 'what attack success
                rate can we tolerate, and how much usability are we willing to
                sacrifice to achieve it?'"
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Adjusting Thresholds in Production
            </p>
            <p style="margin-top: 0">
              Even after deployment, teams tune this balance dynamically. You
              can adjust sampling temperature, system prompt instructions, or
              post processing filter thresholds to shift the trade off without
              retraining. For example, increasing filter sensitivity might move
              attack success from 0.3 to 0.2 percent but push over refusal from
              4.0 to 6.0 percent. Product teams often A/B test different
              operating points. Suppose variant A has 0.2 percent attack success
              and 6.0 percent over refusal, while variant B has 0.4 percent
              attack success and 3.0 percent over refusal. You measure
              downstream metrics: user engagement, session length, retention,
              and safety incident reports. The winning variant is the one that
              optimizes business metrics while staying within acceptable safety
              bounds.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When Product and Safety Teams Conflict
            </p>
            <p style="margin-top: 0">
              This is a common interview scenario. Product wants fewer refusals
              to improve user experience. Safety wants stricter controls to
              reduce risk. The resolution is not political, it is analytical.
              You need to quantify the trade off: "Reducing over refusal from
              5.0 to 3.0 percent increases attack success from 0.2 to 0.5
              percent. At 10 million daily queries, that is 200,000 fewer
              annoyed users but 30 more harmful outputs per day. What is the
              cost of each outcome?" This forces the discussion from feelings to
              numbers.
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
                  Safety tuning creates measurable trade off: reducing attack
                  success from 1.0 to 0.1 percent typically increases over
                  refusal from 2.0 to 8.0 percent, impacting user experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consumer products target attack success below 0.5 percent with
                  over refusal under 5.0 percent, while high risk domains accept
                  10 to 15 percent over refusal to keep attack success below
                  0.01 percent
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production teams maintain two test sets (adversarial and
                  benign) to measure both sides of trade off after every
                  training run, plotting Pareto frontier of possible operating
                  points
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic adjustment via temperature, system prompts, or filter
                  thresholds enables shifting trade off without retraining,
                  enabling A/B testing to optimize business metrics within
                  safety bounds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Resolving product versus safety conflicts requires quantifying
                  trade offs: at 10 million daily queries, moving from 5.0 to
                  3.0 percent over refusal saves 200,000 user frustrations but
                  adds 30 harmful outputs per day
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
                  Consumer chatbot: 0.3 percent attack success, 4.5 percent over
                  refusal. User complaint: model refuses creative writing
                  prompts about conflict
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enterprise API: 1.5 percent attack success, 2.0 percent over
                  refusal. Customers build own filters. Priority is low false
                  positives
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Medical advice system: 0.01 percent attack success, 12 percent
                  over refusal. Better to refuse ambiguous medical questions
                  than risk giving harmful advice
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A/B test: Variant A (stricter) has 15 percent lower engagement
                  but 50 percent fewer safety reports. Team chooses based on
                  risk tolerance and business model
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmEvaluationBenchmarkingTradeOffsHelpfulnessVsHarmlessness;
