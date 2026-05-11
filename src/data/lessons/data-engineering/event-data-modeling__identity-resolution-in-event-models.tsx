import type { Component } from "solid-js";

const LessonEventDataModelingIdentityResolutionInEventModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Identity Resolution in Event Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Identity Problem:
            </div>
            Users appear under different identifiers throughout their lifecycle.
            Before signup, they're tracked by device ID or anonymous ID. After
            signup, they have a user ID. They might use multiple devices. They
            might clear cookies. A few percent error in identity stitching
            causes large swings in critical metrics like daily active users,
            retention rates, and conversion funnels. Identity resolution is the
            process of linking these disparate identifiers to understand that
            they represent the same person.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Why This Matters at Scale:
            </div>
            Consider a user journey. They visit your website on Monday from a
            laptop. Your tracking assigns them anonymous_id_A. They browse
            products, adding events to your system. On Tuesday, they return on
            mobile and get anonymous_id_B. On Wednesday, they sign up on mobile,
            receiving user_id_123. On Thursday, they log in on the laptop.
            Without identity resolution, your analytics sees four different
            users. Your daily active user count is inflated by 300%. Your
            conversion funnel is broken because the product views and the signup
            appear to be different people. Companies like Segment and Amplitude
            invest heavily in identity resolution because this problem
            compounds. With millions of users across multiple devices and
            platforms, even a 2% error rate in stitching means tens of thousands
            of miscounted users and unreliable metrics.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Stitching Strategies:
            </div>
            The most common approach is to emit explicit identity linkage
            events. When a user signs up or logs in, your application emits an
            "identity.alias" or "user.identified" event that declares
            "anonymous_id_B is now linked to user_id_123". Your event pipeline
            builds an identity graph, a data structure that tracks all known
            aliases for each user. A simple identity graph is a mapping:
            anonymous_id_A and anonymous_id_B both map to canonical user_id_123.
            When processing events, you normalize all identifiers to the
            canonical ID before aggregation. This ensures that all activity from
            both anonymous IDs and the user ID gets attributed to the same
            person.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Identity resolution is not
              retroactive by default. If you emit the linkage event on
              Wednesday, events from Monday and Tuesday are still tagged with
              anonymous IDs. You need a backfill process to rewrite historical
              events with the canonical ID, which can be expensive at billions
              of events.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Cross Device Tracking:
            </div>
            Cross device tracking is harder. You might use probabilistic
            matching based on behavioral patterns, IP addresses, or user agent
            strings. For example, if two device IDs show the same browsing
            pattern, come from the same IP address at the same times, and have
            similar user agents, they might be the same person. However,
            probabilistic matching introduces false positives. Shared devices
            like family tablets or public computers can incorrectly merge
            multiple people into one identity. Deterministic matching is more
            reliable but requires explicit signals. The user logs in on both
            devices, creating explicit linkage events. Or they click an email
            link that carries a user token, linking the email recipient to the
            device.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Handling Conflicts and Edge Cases:
            </div>
            What happens if the same anonymous ID gets linked to two different
            user IDs? This can occur with shared devices or account sharing.
            Some systems prioritize the first linkage and treat subsequent ones
            as conflicts, flagging them for manual review. Others maintain a
            many to many graph and accept that some identifiers are ambiguous.
            Another edge case is identity decay. Users clear cookies, switch
            devices, or stop using old accounts. Your identity graph grows
            indefinitely unless you have a policy for pruning stale linkages. A
            common approach is to set a time to live (TTL) on anonymous IDs,
            expiring linkages after 90 or 180 days of inactivity.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Privacy and Compliance:
            </div>
            Identity resolution intersects with privacy regulations. If a user
            requests deletion under General Data Protection Regulation (GDPR) or
            California Consumer Privacy Act (CCPA), you must remove all linked
            identifiers from your event stream. If your identity graph is
            incomplete, you might miss some linkages and fail to fully delete
            the user's data. This is why robust identity modeling is not just an
            analytics problem but a compliance requirement.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  User Journey with Identity Stitching
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Monday: Laptop Browse</strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    anonymous_id_A
                    <br />
                    product_viewed x5
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Tuesday: Mobile Browse
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    anonymous_id_B
                    <br />
                    product_viewed x3
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Wednesday: Signup on Mobile
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    identity.alias:
                    <br />
                    anonymous_id_B → user_123
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Thursday: Login on Laptop
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px; font-family: monospace">
                    identity.alias:
                    <br />
                    anonymous_id_A → user_123
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Identity Graph</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    anon_A, anon_B → user_123
                    <br />
                    Total views: 8 (not 3 users)
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
                  Users appear under different identifiers: device ID before
                  signup, user ID after signup, multiple devices. Without
                  stitching, daily active user counts can be inflated by 200% to
                  400%.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Identity linkage events like "anonymous_id_B is now
                  user_id_123" build an identity graph that normalizes all
                  identifiers to a canonical user ID before aggregation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A 2% error rate in identity stitching for a system with
                  millions of users means tens of thousands of miscounted users
                  and unreliable conversion funnels.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Identity resolution is not retroactive by default. Historical
                  events still carry old identifiers unless you run a backfill
                  process, which is expensive at billions of events.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross device tracking requires either probabilistic matching
                  (behavioral patterns, IP addresses) with false positive risk,
                  or deterministic matching (login events) which is reliable but
                  requires explicit user actions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Privacy compliance requires complete identity graphs. If a
                  user requests deletion under GDPR or CCPA, you must remove all
                  linked identifiers, making incomplete graphs a compliance
                  risk.
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
                  Real scenario: User visits site on laptop (gets
                  anonymous_id_A), browses 5 products. Returns on mobile (gets
                  anonymous_id_B), views 3 products. Signs up on mobile,
                  emitting identity.alias linking anonymous_id_B to user_123.
                  Logs in on laptop later, linking anonymous_id_A to user_123.
                  Identity graph now shows all 8 product views belong to
                  user_123, not three separate users.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Conflict case: Family tablet (device_id_X) used by parent
                  (user_100) and child (user_200) on different days. If both log
                  in from the same device, identity graph must handle
                  device_id_X mapping to multiple user IDs. Some systems flag
                  this as ambiguous and exclude from personalization.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEventDataModelingIdentityResolutionInEventModels;
