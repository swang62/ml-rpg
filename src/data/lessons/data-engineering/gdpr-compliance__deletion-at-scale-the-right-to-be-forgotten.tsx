import type { Component } from "solid-js";

const LessonGdprComplianceDeletionAtScaleTheRightToBeForgotten: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Deletion at Scale: The Right to be Forgotten
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Why Deletion is the Hardest Problem:</strong>
            The right to be forgotten sounds simple: delete a user's data. In
            reality, personal data spreads like a virus through modern systems.
            One user's email address can exist in production databases, read
            replicas, analytics warehouses, log archives, cache layers, search
            indexes, machine learning models, backup tapes, test environments,
            and analyst export files. Deletion becomes a distributed systems
            coordination problem at massive scale.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Technical Architecture:
            </div>
            <strong>First, build a data subject index</strong> that links each
            user identity to all known storage locations and dataset keys. This
            is built incrementally from ingestion metadata and job lineage
            tracking, not manual documentation. For a user with{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id=12345
            </code>
            , the index might list 47 different datasets, including 12 database
            tables, 8 data lake partitions, 15 derived feature tables, 6 cache
            keys, 4 search indexes, and 2 model artifact stores.
            <strong>Second, orchestrate deletion as workflow</strong> with
            unique deletion job identifier. When request arrives, publish
            deletion event to pub sub system. Consumers include Online
            Transaction Processing (OLTP) databases, data warehouses, cache
            clusters, search systems, and feature stores. Each consumer marks
            data deleted, executes hard deletion or anonymization based on
            policy, and reports status back to orchestrator. Orchestrator tracks
            completion, retries failures, and monitors Service Level Agreement
            (SLA) breaches.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Deletion Storm Scenario
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">10k/day</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    BREACH EVENT
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    1M/weekend
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    BOTTLENECK
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    Pipeline overload
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Edge Cases and Failure Modes:
            </div>
            <strong>Cross region replication lag:</strong> User in EU has data
            replicated to United States regions for availability. With 10 minute
            replication lag, deletion might not propagate immediately. If you do
            not coordinate deletions carefully, you violate internal SLA when
            user queries and still sees their "deleted" data from lagged
            replica.
            <strong>Backup and archive problem:</strong> Immutable backups are
            critical for reliability but problematic for right to be forgotten.
            Many companies adopt policy that deleted data disappears as backups
            age out (30 to 90 days) and ensure backup restore procedures
            immediately reapply deletion ledgers. The emergency full restore
            scenario can briefly resurrect data that should be permanently gone.
            <strong>Derived data and models:</strong> When you delete a user,
            what about machine learning model trained on their data? GDPR
            guidance is ambiguous here. Some companies treat models as non
            personal if they cannot be inverted to recover training data. Others
            retrain periodically or use differential privacy techniques. Edge
            case is small tenant or VIP user whose data has disproportionate
            impact on model weights.
            <strong>Join based reidentification:</strong> Two individually
            pseudonymized datasets might become reidentifiable when joined.
            Coarse location plus rare device type plus timestamp can effectively
            identify a person even after individual field tokenization. Privacy
            reviews must consider combination attacks across datasets, not just
            field by field risk assessment.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Deletion pipelines designed for
              steady state (10k deletions per day) fail catastrophically during
              breach driven storms (1 million deletions in weekend). Design with
              backpressure, prioritization, and capacity buffers from day one.
            </div>
            <strong>Proving Compliance:</strong>
            In an audit or investigation, you must prove with logs and system
            design that user data was handled correctly end to end. This
            requires comprehensive audit trails: which systems accessed the
            data, under what purpose, when deletion was requested, which systems
            acknowledged and completed deletion, and verification that derived
            copies were also removed. The deletion orchestrator's status
            tracking and retry logs become your compliance evidence.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Deletion Request</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    user_id: 12345
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Data Subject Index</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Finds 47 locations
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Orchestrator</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Pub/Sub + Status tracking
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 11px">
                    <strong>OLTP DBs</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 11px">
                    <strong>Data Lake</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 11px">
                    <strong>Caches</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 11px">
                    <strong>Search</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-size: 11px">
                    <strong>Models</strong>
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
                  Data subject index links each user identity to all storage
                  locations, built from ingestion metadata and lineage tracking,
                  not manual documentation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deletion orchestrator coordinates across 40+ systems using pub
                  sub pattern, tracking completion status and retrying failures
                  to meet 7 to 30 day SLA
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross region replication with 10 minute lag creates windows
                  where deleted data remains visible from lagged replicas,
                  requiring coordinated deletion timing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Immutable backups retain deleted data for 30 to 90 days until
                  age out, with restore procedures that immediately reapply
                  deletion ledgers to avoid resurrection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deletion storms (from 10k per day to 1 million per weekend
                  during breaches) expose bottlenecks in tokenization services,
                  catalog lookups, and storage systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Machine learning models trained on deleted user data create
                  ambiguity: some companies treat models as non personal if not
                  invertible, others retrain periodically
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
                  User deletion request for user_id 12345 queries data subject
                  index, finds data in 47 locations including 12 database
                  tables, 8 data lake partitions, 15 feature tables, publishes
                  to Kafka topic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  During privacy breach, deletion rate spikes from steady 10,000
                  per day to 1 million over weekend, overloading tokenization
                  service running at 100k requests per second capacity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two pseudonymized datasets (location coarse to city + rare
                  device type + timestamp) become reidentifiable when joined,
                  requiring deletion across both even though individually
                  anonymized
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGdprComplianceDeletionAtScaleTheRightToBeForgotten;
