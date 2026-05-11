import type { Component } from "solid-js";

const LessonChangeDataCaptureCdcEventStructureAndDeliveryGuarantees: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            CDC Event Structure and Delivery Guarantees
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            A CDC change event envelope is more than just the new row data. It
            typically includes the operation type (insert, update, or delete),
            before and after images of the row, transaction and commit
            identifiers, commit timestamp, and the source position such as Log
            Sequence Number (LSN) or Global Transaction Identifier (GTID). This
            rich metadata enables downstream systems to replay changes in order,
            detect duplicates, and maintain consistency. Most CDC systems
            deliver at least once semantics, meaning the same change event might
            be delivered multiple times during failures or restarts. This is a
            deliberate trade off: achieving exactly once delivery end to end is
            expensive and complex, requiring distributed transactions across the
            source, broker, and sink. Instead, production systems accept at
            least once delivery and make consumers idempotent. For example,
            upserts keyed by primary key plus a version number will ignore
            duplicate older events automatically. Ordering guarantees are
            typically per partition or per key, not global. If you partition
            your CDC stream by user ID, all changes for user 12345 arrive in
            commit order, but changes for different users may interleave. This
            matters when a single logical transaction updates multiple entities.
            At 50,000 events per second with 500 byte events, you need at least
            50 Kinesis shards (each provides 1,000 records per second and 1 MB
            per second), and each shard maintains its own ordering. The
            bootstrap phase is critical to avoid gaps or duplicates. You take a
            consistent snapshot of existing data tied to a precise log position,
            then start streaming CDC from the next position after the snapshot.
            If you snapshot at time T but start CDC from an earlier position,
            you'll see duplicates. If you start from a later position, you'll
            miss changes that occurred during the snapshot. Airbnb's Debezium
            style MySQL CDC pipelines implement this two phase handoff to ensure
            completeness.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="border: 2px solid; padding: 12px; border-radius: 6px; margin-bottom: 12px">
                <div style="font-weight: bold; font-size: 13px; margin-bottom: 8px; border-bottom: 2px solid; padding-bottom: 6px">
                  CDC Event Envelope
                </div>
                <div style="font-size: 12px; line-height: 1.6">
                  <div style="display: flex; justify-content: space-between; padding: 4px 0">
                    <span style="font-weight: bold">operation:</span>
                    <span style="padding: 2px 6px; border-radius: 4px; border: 1px solid">
                      UPDATE
                    </span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 4px 0">
                    <span style="font-weight: bold">before:</span>
                    <span>&#123;id:123, status:"pending"&#125;</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 4px 0">
                    <span style="font-weight: bold">after:</span>
                    <span>&#123;id:123, status:"active"&#125;</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 4px 0">
                    <span style="font-weight: bold">txn_id:</span>
                    <span>98765</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 4px 0">
                    <span style="font-weight: bold">timestamp:</span>
                    <span>1703001234567</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; padding: 4px 0">
                    <span style="font-weight: bold">position:</span>
                    <span style="padding: 2px 6px; border-radius: 4px; border: 1px solid">
                      LSN: 0/3A2B4C
                    </span>
                  </div>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px; font-weight: bold">
                  At Least Once
                </div>
                <div style="font-size: 20px; font-weight: bold">→</div>
                <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; text-align: center; font-size: 12px; font-weight: bold">
                  Idempotent Consumer
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
                  Change events include before and after images, enabling audit
                  trails and replay, but increase payload size by 2x. Column
                  level masks can reduce bandwidth but complicate replays
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At least once delivery means duplicates are possible during
                  failures. Use deterministic upserts with stable keys and
                  version checks to achieve effect through idempotency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ordering is per partition, not global. With 50,000 events per
                  second and 500 byte events on Kinesis, you need at least 50
                  shards (1,000 records per second and 1 MB per second per
                  shard)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bootstrap requires a consistent snapshot tied to a precise log
                  position (such as LSN), then streaming from the next position
                  to avoid gaps or duplicates during the handoff
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Transaction identifiers enable grouping multi row
                  transactions, critical when a single business operation
                  updates multiple tables or entities atomically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Commit timestamps enable last writer wins conflict resolution
                  in multi region setups, but clock skew can cause older updates
                  to overwrite newer ones incorrectly
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
                  Idempotent upsert in SQL: UPDATE inventory SET quantity = 42,
                  version = 5 WHERE id = 'SKU123' AND version &lt; 5 prevents
                  applying older duplicate events
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb CDC: Uses Debezium style MySQL CDC with consistent
                  snapshot at LSN X, then starts streaming from LSN X+1 to
                  ensure no gaps in the data pipeline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  DynamoDB Global Tables: Uses streams with last writer wins
                  based on timestamps; requires accurate clock synchronization
                  and idempotent updates for multi region writes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonChangeDataCaptureCdcEventStructureAndDeliveryGuarantees;
