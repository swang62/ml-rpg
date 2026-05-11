import type { Component } from "solid-js";

const LessonEventDataModelingWhatIsEventDataModeling: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Event Data Modeling?
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Core Idea:
          </div>
          Event data modeling represents what happens in your system as a stream
          of immutable records, rather than only storing the current state.
          Think of it like a bank ledger that shows every transaction versus
          just your current balance. Each event is a record of something that
          occurred at a specific time: user_signed_up, product_viewed,
          payment_authorized, driver_accepted_trip. Every event captures a
          moment in time and never changes. You never overwrite an event.
          Instead, you add new ones. If an order is cancelled, you don't delete
          the order_placed event. You append an order_cancelled event. This
          gives you a complete behavioral history that can be replayed to
          reconstruct state, power analytics, and debug production issues.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            The Universal Structure:
          </div>
          A well modeled event has several critical components. First, a
          globally unique event ID for deduplication and traceability. Second,
          an event time that represents when the action actually occurred.
          Third, an actor like user ID or device ID. Fourth, an object or target
          such as product ID or page URL. Fifth, context like experiment
          assignment, app version, location, or marketing campaign. Finally, a
          schema version so consumers know how to interpret the fields.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> A consumer app with 10 million
            monthly active users generating 100 events per user per day produces
            roughly 1 billion events daily, or about 12,000 events per second on
            average, with peaks 5 to 10 times higher during busy hours.
          </div>
          This approach contrasts sharply with entity based modeling where you
          only store the latest state. In entity models, you might have a users
          table with a subscription_status column that gets updated. In event
          models, you have subscription_started, plan_changed, payment_failed,
          and subscription_cancelled events. The entity view becomes a derived
          state computed from events.
          <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
            Why It Matters:
          </div>
          Event models shift complexity from writes to reads. Writes are simple
          and append only, requiring no coordination. Reads must piece together
          many events to answer questions. This tradeoff makes sense when you
          need detailed behavioral analytics, growth experimentation, fraud
          detection, or auditability. It's less useful when you only need
          current account balances or inventory counts.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">Event: order_placed</strong>
                <div style="font-size: 12px; margin-top: 6px; font-family: monospace">
                  id: evt_123
                  <br />
                  time: 2024-01-15T10:30:00Z
                  <br />
                  user_id: user_456
                  <br />
                  product_id: prod_789
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓ 2 hours later
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                <strong style="font-size: 14px">Event: order_cancelled</strong>
                <div style="font-size: 12px; margin-top: 6px; font-family: monospace">
                  id: evt_124
                  <br />
                  time: 2024-01-15T12:30:00Z
                  <br />
                  user_id: user_456
                  <br />
                  order_id: ord_999
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓ Both events preserved
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">
                  Complete History Maintained
                </strong>
                <div style="font-size: 12px; margin-top: 6px">
                  Can replay to understand behavior
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Events are immutable and append only. You never overwrite or
                delete events, you only add new ones to represent state changes.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                At scale, a 10 million user app generates roughly 1 billion
                events per day (12,000 per second average, 60,000 to 120,000 per
                second at peak).
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Each event requires a unique ID, precise timestamp, actor
                identifier, target object, context fields, and schema version to
                be useful downstream.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Event models shift complexity from writes (simple appends) to
                reads (must aggregate many events to answer questions about
                current state).
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                This approach excels for behavioral analytics, experimentation,
                and forensics but generates far more data than entity models
                that only track current state.
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
                A ride sharing app emits driver_accepted_trip, trip_started,
                location_updated (every 5 seconds), trip_completed, and
                payment_processed events rather than just updating a trips
                table.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                An ecommerce system tracks product_viewed, added_to_cart,
                cart_updated, checkout_initiated, payment_authorized,
                order_placed, and shipment_dispatched to understand the complete
                customer journey.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonEventDataModelingWhatIsEventDataModeling;
