import type { Component } from "solid-js";

const LessonLlmEvaluationBenchmarkingRedTeamingInProductionHumanVsAutomatedApproaches: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Red Teaming in Production: Human vs Automated Approaches
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Challenge:</strong>
            Static benchmarks become obsolete quickly because models memorize
            patterns and attackers evolve strategies. You need continuous
            adversarial pressure to discover new failure modes. Red teaming
            provides this, but implementing it at scale requires balancing human
            expertise with automated coverage. The fundamental question is: how
            do you systematically find the prompts that cause your model to fail
            in the worst possible ways?
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Human Red Teaming
            </p>
            <p style="margin-top: 0">
              This involves hiring security experts, adversarial engineers, and
              domain specialists to manually craft prompts designed to bypass
              safety guardrails. Anthropic's research shows that naive
              crowdsourced red teaming produces repetitive, template based
              attacks that models quickly learn to defend against. Effective
              human red teaming requires three elements. First, skilled
              adversarial engineers who understand both the model architecture
              and the safety mitigations. These experts know that simple
              profanity filters are easy to bypass with creative spelling, that
              roleplay scenarios can smuggle harmful intent, and that multi turn
              conversations can build up to policy violations gradually. Second,
              targeted campaigns on specific high risk domains. Instead of
              generic "try to break the model," teams focus on areas like
              biosecurity ("how to synthesize dangerous compounds"), election
              misinformation ("generate fake voter information"), or financial
              fraud ("convincing phishing email templates"). Domain experts
              bring realistic attack scenarios that generic red teamers would
              miss. Third, iteration and sharing. When a red teamer finds a
              successful jailbreak, the team documents the pattern, tests
              variations, and shares findings across the organization. This
              builds institutional knowledge about model vulnerabilities. The
              cost is substantial. Expert red teamers might evaluate 30 to 60
              prompts per hour at rates of 50 to 200 dollars per hour, depending
              on expertise. For comprehensive coverage of a new model release,
              you might need 10,000 to 50,000 human generated adversarial
              prompts, costing tens to hundreds of thousands of dollars.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Automated Red Teaming
            </p>
            <p style="margin-top: 0">
              To scale coverage and reduce cost, teams build automated systems
              that generate adversarial prompts. These systems typically combine
              several techniques. Template based generation uses parameterized
              prompt structures like "Pretend you are &#123;role&#125; who needs
              to &#123;harmful_action&#125; for &#123;justification&#125;." By
              varying parameters, you can generate thousands of attack variants
              targeting each harm category. The weakness is that models trained
              with Reinforcement Learning from Human Feedback (RLHF) often learn
              to recognize these templates. Model assisted generation uses one
              LLM to attack another. You give an attacker model the target
              policy and ask it to generate prompts that violate the policy
              while appearing benign. Google and Anthropic have published work
              showing this can discover novel jailbreak strategies that humans
              miss. However, the attacker model inherits biases from its own
              training and may converge on limited attack patterns. Mutation
              based approaches take successful human red team prompts and
              systematically mutate them: paraphrasing, changing perspective
              (first to third person), adding irrelevant context, or embedding
              the harmful request within a longer benign conversation. This
              amplifies human creativity with machine scale.
            </p>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Human Red Teaming
                </div>
                <div style="font-size: 12px">
                  High quality, 30 to 60 prompts/hr, $50k+ per release
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Automated Red Teaming
                </div>
                <div style="font-size: 12px">
                  Broad coverage, 10M+ prompts, $5k compute cost
                </div>
              </div>
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Hybrid Approach
            </p>
            <p style="margin-top: 0">
              Production systems use both. Human red teamers discover novel
              attack strategies and domain specific vulnerabilities. Automated
              systems then amplify these findings, testing thousands of
              variations to measure how robust the defenses are. For example, a
              human might discover that wrapping harmful requests in JSON format
              bypasses filters. Automated systems then generate 10,000 variants
              of this attack pattern across all harm categories, measuring
              success rates and identifying which categories are most
              vulnerable.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> OpenAI runs human red team
              campaigns every few weeks targeting specific risk areas,
              generating 1,000 to 5,000 high quality adversarial prompts.
              Automated systems then produce millions of variations for
              continuous regression testing between campaigns.
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Continuous Red Teaming
            </p>
            <p style="margin-top: 0">
              The most sophisticated systems monitor production traffic and feed
              it back into red teaming. You sample 0.1 to 1 percent of real user
              prompts (with privacy controls), identify edge cases where the
              model barely stayed within policy, then mutate these into
              adversarial variants. This creates a feedback loop where user
              creativity directly informs your safety testing, ensuring your
              evaluation stays relevant as real world attack patterns evolve.
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
                  Human red teaming costs 50 to 200 dollars per hour generating
                  30 to 60 prompts hourly, requiring 50,000+ dollars per major
                  release for comprehensive coverage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated systems generate millions of prompts at compute
                  costs around 5,000 dollars but may miss novel attack
                  strategies that require human creativity and domain expertise
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Template based automation is cheap but models trained with
                  RLHF learn to recognize patterns, while model assisted
                  generation discovers novel attacks but inherits attacker model
                  biases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid approach uses human red teamers for discovery (1,000 to
                  5,000 novel prompts per campaign) and automation for
                  amplification (millions of variations for regression testing)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Continuous red teaming samples 0.1 to 1 percent of production
                  traffic, mutating edge cases into adversarial prompts that
                  keep evaluation aligned with evolving real world attacks
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
                  Human discovery: Red teamer finds JSON format bypasses
                  filters. Automated amplification: Generate 10,000 JSON wrapped
                  variations across all harm categories
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Domain expertise: Biosecurity expert creates realistic
                  synthetic biology attack prompts that generic crowd workers
                  would never think of
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production feedback loop: User prompt barely avoided policy
                  violation, system generates 100 mutations to test robustness
                  of that boundary
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmEvaluationBenchmarkingRedTeamingInProductionHumanVsAutomatedApproaches;
