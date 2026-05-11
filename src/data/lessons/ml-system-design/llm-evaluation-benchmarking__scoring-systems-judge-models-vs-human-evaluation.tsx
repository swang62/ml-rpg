import type { Component } from "solid-js";

const LessonLlmEvaluationBenchmarkingScoringSystemsJudgeModelsVsHumanEvaluation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Scoring Systems: Judge Models vs Human Evaluation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Core Challenge:</strong>
            After running thousands or millions of evaluation prompts through
            your model, you need to score each output for safety violations.
            This scoring layer is critical because it determines whether you
            detect failures and gate releases. The fundamental trade off is
            between human evaluators who provide high fidelity judgments but
            cannot scale, and automated judge models that scale infinitely but
            introduce their own biases and errors. Understanding when to use
            each approach and how to combine them is essential for production
            systems.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Human Evaluation
            </p>
            <p style="margin-top: 0">
              Human safety raters provide ground truth. They can understand
              context, detect subtle harms like manipulation or power seeking
              behavior, and make nuanced judgments about intent versus literal
              content. For example, a prompt asking "How do I get rid of
              someone?" could mean firing an employee, ending a relationship, or
              planning violence. Humans easily distinguish these from context,
              while automated systems struggle. The cost is substantial. A
              trained safety rater might evaluate 30 to 60 prompts per hour at
              rates of 15 to 50 dollars per hour depending on expertise and
              geography. For 100,000 evaluation prompts, that is 1,667 to 3,333
              hours of work costing 25,000 to 166,000 dollars. For a major model
              release requiring millions of prompt evaluations, pure human
              review is economically infeasible. Human evaluation also suffers
              from inter annotator disagreement. On ambiguous cases, two raters
              might disagree 20 to 40 percent of the time about whether content
              violates policy. This noise makes it hard to use human scores as
              absolute truth, especially for borderline cases. Teams address
              this by having multiple raters score the same content and using
              majority vote or consensus protocols, which further increases
              cost.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Automated Judge Models
            </p>
            <p style="margin-top: 0">
              Judge models are typically smaller LLMs (7B to 70B parameters)
              fine tuned to answer safety questions like "Does this output
              violate the self harm policy? Answer Yes or No with confidence
              score." They can score thousands of prompts per second, enabling
              continuous evaluation at massive scale with compute costs around
              0.001 to 0.01 dollars per prompt, roughly 1000x cheaper than
              humans. The architecture usually involves prompting the judge with
              the target model output plus a policy description, then parsing
              its response for a binary decision and confidence score. Some
              systems use multiple judge models and ensemble their decisions to
              reduce individual model biases.
            </p>
            <div style="margin: 20px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Evaluation Cost Comparison
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">$150k</div>
                  <div style="font-size: 10px; font-weight: 600">
                    HUMAN (100K PROMPTS)
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">$150</div>
                  <div style="font-size: 10px; font-weight: 600">
                    AUTOMATED (100K PROMPTS)
                  </div>
                </div>
              </div>
            </div>
            The weakness is that judge models are less capable than the target
            model and inherit biases from their training data. They may
            systematically under report certain harms (for example subtle
            manipulation tactics) or over report others (for example flagging
            medical education as self harm content). They also struggle with
            context, especially in multi turn conversations where harm emerges
            gradually across exchanges. Calibration is critical. You take a
            sample of prompts scored by both humans and judge models, then
            measure agreement. If the judge has 85 percent precision (when it
            flags a violation, humans agree 85 percent of the time) and 75
            percent recall (it catches 75 percent of actual violations humans
            identify), you can estimate error rates and adjust decision
            thresholds accordingly.
            <p></p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Hybrid Strategy
            </p>
            <p style="margin-top: 0">
              Production systems use a tiered approach that combines both
              methods strategically. First, run all evaluation prompts through
              automated judge models to get initial scores and flag potential
              violations. This provides broad coverage at low cost. Second,
              sample outputs for human review based on several criteria. Always
              send high severity flags (judge indicates critical harm with high
              confidence) to humans. Sample randomly from medium severity flags
              to calibrate judge accuracy. Sample from outputs that changed
              classification between model versions (for example previously
              safe, now flagged) to catch regressions. Sample from low
              confidence scores where the judge is uncertain. Third, use human
              ratings to continuously retrain and calibrate judge models. As you
              collect more human labels, you fine tune judges to better align
              with human judgment, gradually improving their precision and
              recall.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Anthropic runs automated judges on
              100 percent of evaluation prompts, samples 5 to 10 percent for
              human review (prioritizing high severity), uses human labels to
              retrain judges quarterly, achieving 90+ percent agreement on most
              categories.
            </div>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Category Specific Strategies
            </p>
            <p style="margin-top: 0">
              Some harm categories are easier to automate than others.
              Profanity, slurs, and explicit sexual content have clear lexical
              signals that judge models catch reliably (over 95 percent
              precision and recall). Subtle harms like power seeking,
              manipulation, or coordination of illegal activity require more
              human oversight because context matters enormously. This leads to
              differentiated sampling rates. For profanity, you might sample
              only 1 percent of judge model flags for human review because you
              trust the automation. For manipulation, you might sample 50
              percent because judge models are less reliable and the
              consequences of missing these harms are severe.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cost Optimization
            </p>
            <p style="margin-top: 0">
              For a model release requiring evaluation on 10 million prompts
              across 20 harm categories, a pure human approach would cost over
              10 million dollars and take months. A pure automated approach
              costs 10,000 dollars but has significant error rates. The hybrid
              approach might look like: First, automated scoring for all 10
              million prompts at 10,000 dollars. Second, human review of 200,000
              sampled prompts (2 percent) at 200,000 dollars. Total cost 210,000
              dollars, achieving high confidence in safety metrics while staying
              within budget. The human sample provides ground truth for
              calibration and catches edge cases that automation misses.
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
                  Human evaluation costs 25,000 to 166,000 dollars for 100,000
                  prompts at 30 to 60 prompts per hour, providing high fidelity
                  judgments but suffering 20 to 40 percent inter annotator
                  disagreement on ambiguous cases
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Automated judge models score at 0.001 to 0.01 dollars per
                  prompt (1000x cheaper than humans), enabling continuous
                  evaluation but introducing systematic biases and struggling
                  with context
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid strategy runs automated judges on 100 percent of
                  prompts, samples 5 to 10 percent for human review
                  (prioritizing high severity and low confidence), achieving 90+
                  percent agreement after calibration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Category specific sampling adjusts human review rate: 1
                  percent for lexically clear harms like profanity (95+ percent
                  judge accuracy), 50 percent for subtle harms like manipulation
                  (lower judge reliability)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost optimization for 10 million prompt evaluation: pure human
                  costs over 10 million dollars, pure automation costs 10,000
                  dollars with high error, hybrid costs 210,000 dollars with
                  strong confidence
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
                  Judge model precision: If judge flags 1,000 outputs as
                  violations, humans agree on 850, giving 85 percent precision
                  (15 percent false positives)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sampling strategy: Critical self harm flags go to humans 100
                  percent. Medium severity hate speech sampled at 10 percent.
                  Benign outputs sampled at 0.1 percent for false positive
                  checks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Calibration loop: Collect 50,000 human labels quarterly, fine
                  tune judge model on this data, improve precision from 80 to 90
                  percent over six months
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmEvaluationBenchmarkingScoringSystemsJudgeModelsVsHumanEvaluation;
