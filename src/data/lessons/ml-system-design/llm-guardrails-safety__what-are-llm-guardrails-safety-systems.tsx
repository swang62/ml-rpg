import type { Component } from "solid-js";

const LessonLlmGuardrailsSafetyWhatAreLlmGuardrailsSafetySystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What are LLM Guardrails &amp; Safety Systems?
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
                <strong>LLM Guardrails</strong> are runtime policy enforcement
                layers that constrain what inputs a language model accepts, how
                it generates responses, what outputs it can produce, and which
                real world actions it can trigger.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Core Problem
            </p>
            <p style="margin-top: 0">
              Large Language Models (LLMs) are probabilistic sequence
              predictors, not deterministic rule engines. They hallucinate
              facts, can be socially engineered through clever prompts, and have
              no built in notion of company policy, legal constraints, or safety
              boundaries. The moment an LLM can talk to customers, trigger
              database writes, initiate payments, or control physical devices,
              you need explicit mechanisms to keep it within safe and compliant
              behavior. Think of the difference like this: a traditional
              software system has explicit if/then logic you can audit. An LLM
              has learned statistical patterns from billions of text examples.
              You cannot open it up and find the line of code that says "never
              reveal passwords." Instead, you must wrap the model in control
              layers.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Four Types of Guardrails
            </p>
            <p style="margin-top: 0">
              <strong>Input guardrails</strong> validate and sanitize user
              prompts and any retrieved context from databases or documents.
              They catch prompt injection attacks where malicious instructions
              are hidden in data the model reads.
              <strong>Output guardrails</strong> inspect and filter model
              responses before they reach users. They detect hate speech, leaked
              Personal Identifiable Information (PII), hallucinated facts, or
              policy violations in generated text.
              <strong>Tool and action guardrails</strong> control which external
              effects the model can trigger. Can it refund orders? Change
              shipping addresses? How much? For which users? These rules prevent
              the model from executing harmful real world actions even if it
              decides to suggest them.
              <strong>Monitoring and governance guardrails</strong> observe the
              entire system, detect safety incidents and distribution drift,
              support audits, and provide human override capabilities when the
              automated systems fail.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Guardrails are runtime controls
              that can be updated in hours or days as policies change, without
              retraining the base model which might take weeks and millions of
              dollars.
            </div>
            <strong>Why Not Just Train a Safe Model?</strong>
            You can finetune models on safety data to reduce bad behavior on
            average, and companies do this. But training alone cannot enforce
            hard guarantees. New attack patterns emerge daily. Regulations
            change. A model trained six months ago does not know about
            yesterday's policy update. Guardrails give you a fast, updatable
            control plane independent of the model's weights.<p></p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LLMs are probabilistic and can hallucinate, be manipulated, or
                  violate policies without explicit runtime controls
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Guardrails are policy enforcement layers that operate at
                  runtime, separate from model training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Four main types: input validation, output filtering,
                  tool/action control, and monitoring/governance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Guardrails can be updated quickly (hours to days) as policies
                  or threats change, without expensive model retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A robust system combines rules, specialized smaller models,
                  and sometimes a separate trusted model as final arbiter
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
                  Customer support chatbot at e-commerce company: guardrails
                  prevent the LLM from issuing unlimited refunds or changing
                  orders to fraudulent addresses
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Medical advice assistant: output guardrails catch when the
                  model hallucinates drug names or dosages that could harm
                  patients
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Robot control system: action guardrails ensure LLM generated
                  commands never violate collision avoidance or distance
                  constraints
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLlmGuardrailsSafetyWhatAreLlmGuardrailsSafetySystems;
