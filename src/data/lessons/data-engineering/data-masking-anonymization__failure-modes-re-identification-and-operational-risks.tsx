import type { Component } from "solid-js";

const LessonDataMaskingAnonymizationFailureModesReIdentificationAndOperationalRisks: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Re-identification and Operational Risks
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Re-identification Problem:</strong>
            Even with aggressive column level masking, combinations of
            quasi-identifiers can uniquely identify individuals. Age, gender,
            and 5 digit ZIP code uniquely identify 87% of the US population. Add
            one more attribute like occupation or ethnicity, and you're over
            95%. If your masking strategy treats columns independently without
            considering joins, analysts can accidentally de-anonymize users by
            combining multiple datasets. This isn't theoretical. In 2006, AOL
            released "anonymized" search logs with{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            replaced by random numbers. Journalists identified specific users by
            correlating searches for local businesses, names in queries, and
            public records. The combinations were unique fingerprints.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Masking individual columns isn't
              enough. You must consider attribute combinations and enforce
              minimum group sizes (k-anonymity where k &gt;= 100 for external
              data) to prevent re-identification through joins.
            </div>
            <strong>Inconsistent Masking Across Systems:</strong>
            System A tokenizes{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            with function f(user_id, "salt_A"). System B uses f(user_id,
            "salt_B"). Same user, different tokens. Joins break. Analysts can't
            correlate behavior across products. They ask for raw access to "fix
            it," undermining your entire privacy model. This happens when teams
            implement masking independently without central coordination. The
            fix requires retroactive reprocessing: pick one canonical
            transformation, regenerate tokens for all historical data. At 5 TB
            per day over a year, that's 1.8 petabytes to reprocess. Even at 500
            MB/sec throughput, that's 42 days of continuous processing.
            <strong>Tokenization Service Failures:</strong>
            If your tokenization vault sits on the critical path for 100k events
            per second and it goes down for 3 minutes, you've lost or delayed 18
            million events. Downstream systems see gaps in data. Metrics
            dashboards show artificial drops. ML models trained on this data
            learn that "users disappear on Tuesdays at 2pm" because that's when
            the outage happened.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Failure Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">100k/sec</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    VAULT DOWN
                  </div>
                  <div style="font-size: 16px; font-weight: 800">0/sec</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">3 MINUTES</div>
                  <div style="font-size: 16px; font-weight: 800">18M lost</div>
                </div>
              </div>
            </div>
            Mitigation requires circuit breakers and fallback: if vault is
            unavailable, queue events for delayed processing or apply stateless
            hashing as a degraded mode. But now you have mixed data: some
            records with vault tokens, others with hashes. More complexity.
            <strong>Schema Drift and Unclassified PII:</strong>A product team
            adds a{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              notes
            </code>{" "}
            field for customer support to record call details. Engineers start
            dumping free form text: "Called from 555-1234, verified email
            john@example.com, address 123 Main St." Your classification system
            only checks at schema creation time. This field bypasses all
            masking. Six months later, a compliance audit discovers 50 million
            records with raw PII in{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              notes
            </code>
            . Now you need continuous scanning: sample 0.1% of records weekly,
            run PII detection regexes and ML classifiers, alert when new
            patterns appear. Even at 0.1% sampling of 50 million records, that's
            scanning 50k records per week per table.
            <strong>Key Rotation and Data Unavailability:</strong>
            Your tokenization vault uses encryption keys rotated every 90 days
            for compliance. Old data encrypted with key_v1 can't be read by
            services that only have key_v2. Either you maintain multiple key
            versions (operational complexity, more attack surface) or you
            reprocess historical data with new keys (expensive, time consuming).
            At scale, key rotation can take days. During this window, queries
            that span old and new data return partial results. Analysts see
            metrics jump or drop artificially, not because user behavior changed
            but because half the data is temporarily inaccessible.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Side channel leaks through
              metadata. Even with perfect masking, record counts, timestamps,
              and rare category values can leak information. A department with
              one person earning $500k stands out in aggregated salary data.
              Enforce minimum group sizes and consider adding calibrated noise
              to counts.
            </div>
            <strong>The Interview Insight:</strong>
            When discussing failure modes in interviews, emphasize that masking
            is never "done." It requires continuous monitoring for
            re-identification risks, schema evolution detection, policy
            consistency validation, and operational resilience planning. The
            real challenge isn't the initial implementation but maintaining
            these guarantees as systems and teams scale.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Re-identification Through Joins
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Dataset A</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Token: u_8f3a
                      <br />
                      Age: 34
                      <br />
                      ZIP: 94103
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Dataset B</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Token: u_8f3a
                      <br />
                      Gender: M<br />
                      Job: SWE
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  JOIN ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Combined Attributes</strong>
                  <div style="font-size: 10px; margin-top: 6px; line-height: 1.4">
                    34 year old male
                    <br />
                    Software engineer
                    <br />
                    ZIP 94103
                    <br />
                    <strong>87% unique identification</strong>
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
                  Age, gender, and ZIP code uniquely identify 87% of US
                  population; adding occupation pushes this over 95%, making
                  column level masking insufficient without enforcing minimum
                  group sizes of 100+
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Inconsistent tokenization across systems (different salts or
                  functions) breaks joins and forces teams to request raw data
                  access, undermining privacy; fixing this requires reprocessing
                  petabytes of historical data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tokenization vault outage for 3 minutes at 100k events per
                  second means 18 million lost or delayed events, creating gaps
                  that corrupt downstream metrics and ML training data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema drift with unclassified PII (free form notes fields
                  containing emails and phone numbers) bypasses masking
                  policies; requires continuous sampling and scanning of 0.1% of
                  records weekly per table
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
                  AOL search log failure: replaced user_id with random numbers
                  but journalists re-identified users by correlating searches
                  for local businesses with public records and name queries
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  E-commerce company: support team notes field accumulated 50
                  million records with raw phone numbers and addresses over 6
                  months, discovered during compliance audit requiring full
                  table reprocessing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Tokenization vault using 90 day key rotation: queries spanning
                  old and new data return partial results during rotation
                  window, causing artificial metric fluctuations that confuse
                  analysts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Side channel leak: department level salary aggregation where
                  one executive at $500k stands out despite masking individual
                  salaries, solved by enforcing minimum group size of 50
                  employees per report
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataMaskingAnonymizationFailureModesReIdentificationAndOperationalRisks;
