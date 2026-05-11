import type { Component } from "solid-js";

const LessonModelGovernanceGovernanceForLargeLanguageModelsAndGenerativeAi: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Governance for Large Language Models and Generative AI
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
                <strong>LLM governance</strong> extends traditional ML
                governance with unique challenges: prompt injection, RAG
                provenance, generated text attribution, and logging prompts with
                PII—requiring new audit patterns.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PROMPT AND OUTPUT LOGGING
            </p>
            <p style="margin-top: 0">
              Raw prompts may contain sensitive data. <strong>Option 1:</strong>{" "}
              Log templates and parameter hashes, rehydrate from vault on
              demand. <strong>Option 2:</strong> PII detection and redaction
              before logging. At 5K QPS with 2KB prompts, expect 864GB/day—use
              tiered storage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SAFETY CLASSIFIERS
            </p>
            <p style="margin-top: 0">
              <strong>Input classifiers:</strong> Check prompts for policy
              violations. <strong>Output classifiers:</strong> Scan completions
              before returning. For high-risk domains, require human review. Log
              classifier decisions (version, score, threshold) for audit.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> Before deployment, run red team
              suites: prompt injection, jailbreaks, toxic outputs, factual
              consistency. Store results in model card as release gate.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RAG PROVENANCE
            </p>
            <p style="margin-top: 0">
              Log retrieved chunk provenance: document ID, offset, score.
              Enables content takedown—if source is later inappropriate, lineage
              identifies all outputs that referenced it.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ONLINE LEARNING CONTROLS
            </p>
            <p style="margin-top: 0">
              Fine-tuning on feedback risks poisoning. Use rate limits (max 1%
              change/day), canary buffers for review, staging before production.
              Maintain immutable update records.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Full prompt logging aids debugging
              but raises privacy risks. Selective redaction balances
              auditability and protection.
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
                  Large Language Model (LLM) governance logs prompt templates
                  with parameter hashes (not raw Personally Identifiable
                  Information or PII), retrieved context provenance (document
                  ID, chunk offset, score), safety classifier decisions (score,
                  threshold, pass or block), and final outputs to enable
                  auditability without General Data Protection Regulation (GDPR)
                  violations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At 5,000 Queries Per Second (QPS) with 2 kilobyte average
                  prompt plus completion, systems generate 864 gigabytes per
                  day, requiring same tiered storage (30 days hot, 7 years cold)
                  as traditional Machine Learning (ML) prediction journals
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Safety classifiers act as input and output guardrails, log
                  every decision (prompt_id, classifier_v2.1,
                  toxicity_score=0.12, threshold=0.15, decision=allow), A/B test
                  classifier updates to ensure false positive rates do not
                  increase more than 10 percent and degrade user experience
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Red team test suites run before deployment covering prompt
                  injection, jailbreaks, toxic generation, factual consistency,
                  store results in model card as evidence of safety evaluation,
                  Microsoft and OpenAI require this as a release gate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retrieval Augmented Generation (RAG) provenance logging
                  enables content takedown, if source document deemed
                  inappropriate after deployment, lineage query identifies all
                  outputs that referenced it for notification or retraction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online learning from user feedback requires poisoning
                  defenses: update rate limits (maximum 1 percent parameter
                  change per day), canary buffers with manual review, staging
                  environments for testing updates, immutable log of feedback
                  deltas for audit and rollback
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
                  Healthcare chatbot logs &#123;"prompt_template":
                  "symptom_query", "params_hash": "hmac:abc123",
                  "retrieved_docs": ["mayo_clinic_id:4521", "webmd_id:9912"],
                  "safety_input": "pass", "safety_output":
                  &#123;"medical_advice_score": 0.85, "threshold": 0.9,
                  "decision": "allow"&#125;, "completion_hash":
                  "sha256:def456"&#125;, redacts patient name from prompt before
                  logging
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Microsoft Responsible AI review for customer service Large
                  Language Model (LLM) includes red team testing with 5,000
                  adversarial prompts (jailbreaks, bias probes), documents
                  results showing 99.2 percent safety classifier recall on toxic
                  outputs, includes this in model card before production
                  approval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retrieval Augmented Generation (RAG) system for legal research
                  logs retrieved case citations (case_id, jurisdiction,
                  relevance_score), when a precedent is later overturned,
                  lineage identifies 1,247 outputs that cited it, system sends
                  notifications to users who received those outputs for review
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelGovernanceGovernanceForLargeLanguageModelsAndGenerativeAi;
