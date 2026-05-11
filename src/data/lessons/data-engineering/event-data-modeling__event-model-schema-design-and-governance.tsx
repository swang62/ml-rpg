import type { Component } from "solid-js";

const LessonEventDataModelingEventModelSchemaDesignAndGovernance: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Event Model Schema Design and Governance
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Schema Challenge:
            </div>
            At scale, hundreds of teams emit thousands of event types. Without
            strong schema design and governance, you end up with chaos: some
            teams log "signup", others "user_signup", others "user_signed_up".
            Fields have different names, types, and meanings. Metrics become
            incomparable across time. Unwinding such drift can take months and
            require expensive backfills. A robust event schema defines the
            contract between producers and consumers. It specifies required
            fields, data types, allowed values, and versioning strategy.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Core Schema Components:
            </div>
            Every event schema should mandate certain fields. First, a globally
            unique event ID, typically a Universally Unique Identifier (UUID) or
            snowflake ID, for deduplication. Second, an event timestamp in a
            precise format like ISO 8601 with timezone, representing when the
            action actually occurred. Third, actor identifiers such as user ID,
            device ID, or session ID. Fourth, the event type in a namespaced
            format like "auth.user_signed_in" or "billing.invoice_generated".
            Fifth, context fields that apply to all events: app version,
            platform (iOS, Android, web), client IP address, user agent. Sixth,
            domain specific properties that vary by event type. For example, a
            product_viewed event includes product_id, category, and price. A
            payment_authorized event includes amount, currency, and
            payment_method. Finally, a schema version number so downstream
            consumers know how to interpret the fields.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Organizing Event Types:
            </div>
            Mature systems organize events into domains or namespaces. This
            prevents naming collisions and makes ownership clear. For instance,
            "auth.user_signed_in", "auth.password_reset_requested",
            "rides.trip_completed", "rides.driver_arrived",
            "billing.invoice_generated", "billing.payment_failed". Each
            namespace typically has a single owning team responsible for schema
            evolution.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> High cardinality dimensions can
              overload storage and indexing. If you emit a separate property for
              every possible product attribute or embed large JSON blobs for
              context, your event tables become too wide to query efficiently.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Schema Evolution Strategy:
            </div>
            Changes fall into two categories: backward compatible and breaking.
            Adding a new optional field is backward compatible. Existing
            consumers can ignore it. Removing a field, changing a field type, or
            renaming a field is breaking. Breaking changes require explicit
            versioning and migration paths. A common pattern is to include a
            schema version in each event and maintain a schema registry. The
            registry documents all versions, marks deprecated fields, and
            provides migration guides. Consumers declare which versions they
            understand. The pipeline can then route events to compatible
            consumers or transform events to match expected versions. Governance
            processes enforce standards. Teams submit new event types for review
            before production deployment. Reviewers check for naming
            consistency, required fields, and potential privacy concerns.
            Changes to existing event schemas go through a similar review. This
            discipline is what separates a valuable event data model from a long
            term source of confusion.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema drift is the most damaging failure mode. Inconsistent
                  event names and fields across teams make metrics incomparable
                  and can require months of backfills to fix.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  All events must include globally unique ID, precise ISO 8601
                  timestamp with timezone, actor identifiers (user ID, device
                  ID, session ID), namespaced event type, and schema version.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Organize events into namespaces like "auth.user_signed_in" and
                  "billing.invoice_generated" to prevent naming collisions and
                  establish clear ownership per team.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution requires explicit versioning. Adding optional
                  fields is backward compatible. Removing fields, changing
                  types, or renaming is breaking and requires migration paths.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High cardinality dimensions like embedding all product
                  attributes or large JSON context blobs can make event tables
                  too wide to query efficiently at scale.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Governance processes with pre deployment schema reviews
                  prevent chaos. Mature companies treat event schema changes
                  like API changes with explicit review and approval.
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
                  Good schema: &#123;"event_id": "evt_abc123", "event_type":
                  "rides.trip_completed", "event_time": "2024-01-15T14:30:00Z",
                  "user_id": "user_456", "driver_id": "driver_789",
                  "trip_distance_km": 5.2, "fare_usd": 12.50, "schema_version":
                  2&#125;
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bad practice: Team A logs "signup" with "user_name", Team B
                  logs "user_signup" with "username", Team C logs
                  "user_signed_up" with "name". Queries must union three
                  different tables with different schemas, breaking funnel
                  analysis.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEventDataModelingEventModelSchemaDesignAndGovernance;
